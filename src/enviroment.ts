import dotenv from 'dotenv';
dotenv.config();

export const app_config = {
    port: process.env.PORT || 3000,
    port_ssl: process.env.PORT_SSL || 3001,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
}

export const google_config = {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
}