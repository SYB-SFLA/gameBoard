const error = {
    notFound:(req,res,next)=>{
        /* En cas d'erreur, je renvoie une 404 grâce au render.status + un fichier si nécessaire - ici, pas de fichier a envoyé */
        res.status(404).render("404",{cssFile:null});
    }
};

module.exports = error;