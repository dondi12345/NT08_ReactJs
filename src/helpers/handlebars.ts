module.exports ={
    equal: (a,b) =>{
        if(a==b){
            return true;
        }else{
            return false;
        }
    },

    more : (a,b) =>{
        let f = parseInt(a);
        let s = parseInt(b);
        if(f>s){
            return true;
        }else{
            return false;
        }
    },

    mod: (a,b)=>{
        let f = parseInt(a);
        let s = parseInt(b);
        if(f%s==0){
            return true;
        }else{
            return false;
        }

    },

    diff: (a) =>{
        if(a){
            return false
        }else{
            return true
        }
    },
    
    sum: (a,b) => {
        let sum = parseInt(a) + parseInt(b);
        return sum;
    },

    multi: (a,b) => a*b,
}