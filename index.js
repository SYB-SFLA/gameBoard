/* Require du module Express */
const express = require("express");
const app = express();

/* Require de mes modules (error et log) */
const errorModule = require("./modules/error"); // module qui permet de gérer les eventuelles erreurs
const logModule = require("./modules/log");  // module qui permet de logger l'utilisateur au format ISO

/* Require du fichier JSON contenant la liste des jeux */
const gamesList = require("./games.json");
/* Insertion de la liste des jeux dans les locals */
app.locals.games = gamesList;
console.log(gamesList);

/* Information apportée à notre application que le moteur de rendu est EJS */
app.set("view engine", "ejs");
/* Indication de l'emplacement des vues (le dossier 'views') */
app.set("views", "views");

/* Mise en place d'un middleware qui indique que le dossier 'public' correspond à mon local host */
app.use(express.static("public"));

/* Enregistrement des logs (à chaque page demandée) */
app.use(logModule.save);

/* Page d'accueil */ 
app.get("/", (req, res) => {
    res.render("index", {
        cssFile: null,
    });
});

/* ----- ROUTES EN DUR - NON DYNAMIQUES -----
/*app.get("/game/fourchette",(req,res)=>{
    res.render("fourchette");
});

app.get("/game/diceRoller",(req,res)=>{

    // Exemple d'utilisation des locals
    app.locals.diceRollerCSS = true;
    app.locals.css_de_diceRoller = true;

    res.render("diceRoller",{
        css_de_diceRoller : true
    });
});
*/

/* Route paramétrée pour les jeux */
app.get("/game/:gameName", (req, res, next) => {
    console.log("Je suis dans la route dynamiques des jeux ! ");

    /* La propriété 'req.params' est un objet contenant des propriétés associées à la route nommée "paramètres" - Ici /game/:gameName */
    const nameOfGame = req.params.gameName;

    /* Méthode qui permet de recherche le jeu qui se trouve en paramètre de l'url */
    const myGame = gamesList.find(searchGame);

    function searchGame(element) {
        return element.name == nameOfGame;
    }

    /* CONDITION - SI le jeu est retrouvé, il faut renvoyer la vue correspondante */
    if (myGame) {
        /* Création d'un objet qui sera envoyé pour transférer les données */
        const dataToSend = {
            cssFile: myGame.cssFile
        };
        const nameOfView = myGame.name;
        /* Renvoi le nom de la vue et les données correspondantes */
        res.render(nameOfView, dataToSend);
    }
    /* SINON, renvoyer une page "404" */
    else {
        /* res.status(404).render("404", {
            cssFile:null
        });
        /* Le next (middleware) nous permet de passer à l'étape suivante */
        next();
    }
});

/* Gestion des erreurs 404 grâce à notre module errorModule */
app.use(errorModule.notFound);

/* Ecoute du port */
const port = 3000;
app.listen(3000, () => {
    console.log(`Listening on ${port}`);
});


