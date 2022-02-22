const log = {
    save:(req,res,next)=>{
        /* CAS LONG:
        console.log("###################");
        console.log("Date : ",new Date().toUTCString());
        console.log("IP : ",req.ip);
        console.log("Path : ",req.path);
        console.log("URL : ",req.url);
        */

        console.log(`[${new Date().toISOString()} ${req.ip}] ${req.path}`); /* CAS COURT:
        la méthode toISOString renvoie une chaîne de caractères au format ISO qui peut être décrite de cette façon : YYYY-MM-DDTHH:mm:ss.sssZ */
        next();
    }
}

module.exports = log;