//nodemon --exec ts-node src/index.ts
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { engine } from 'express-handlebars';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';

import { app_config, google_config } from './enviroment';

const session = require('express-session');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express()

// Extend Express.User interface if needed (optional)
declare global {
    namespace Express {
        interface User {
            id?: string;
            displayName?: string;
            emails?: { value: string }[];
            photos?: { value: string }[];
        }
    }
}

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Google Strategy
passport.use(new GoogleStrategy({
    clientID: google_config.clientID,
    clientSecret: google_config.clientSecret,
    callbackURL: google_config.callbackURL
},
    (accessToken, refreshToken, profile, done) => {
        // Here you would find or create a user in your database.
        // For simplicity, we just return the profile.
        return done(null, profile);
    }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj as Express.User);
});

// Middleware to check authentication
const ensureAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

app.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', { user: req.user });
});

app.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});


//HTTP logger
// app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, "../public")));

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../resources/views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/welcome', (req, res) => {
    res.render('welcome', {
        user: req.user,
        BASE_URL: app_config.base_url
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/test', (req, res) => {
    console.log("Test");
    res.send("Hello");
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/games', (req, res) => {
    res.render('list-games');
});
app.get('/game', (req, res) => {
    res.render('game');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/test', (req, res) => {
    res.render('partials/test')
})

const server = http.createServer(app);
server.listen(app_config.port, () => {
    console.log(`Example app listening on port ${app_config.port}`)
})

const options = {
    key: fs.existsSync("server.key") ? fs.readFileSync("server.key") : null,
    cert: fs.existsSync("server.crt") ? fs.readFileSync("server.crt") : null,
};
if (options.key && options.cert) {
    const server_ssl = https.createServer(options, app);
    server_ssl.listen(app_config.port_ssl, "0.0.0.0", () => {
        console.log(`Worker ${process.pid} API listening on port: ${app_config.port_ssl}`);
    });
}