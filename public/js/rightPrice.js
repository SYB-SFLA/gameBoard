/* Objectif ce challenge: identifier un nombre aléatoire comme au juste prix */

/* 1. Définition de la fourchette maximale */
var max = 500;

/* 2. Génération d'un nombre aléatoire entre 0 et la fourchette maximale précédemment définie
Étapes décomposées :
- tout d'abord génération d'un nombre décimal de 0 à 1 grâce à la méthode Math.random() => var randomBase = Math.random();
- ensuite, multiplication de ce résultat par la fourchette maximale pour transposer notre nombre de 0 à max => var randomNumber = randomBase * max;
- pour finir, arrondi de ce résultat pour conserver un entier => var roundedRandomNumber = Math.round(randomNumber);
*/
var searchedNumber = Math.round(Math.random() * max);

/* 3. Demande à l'utilisateur d'essayer de trouver un nombre via un prompt. Attention veiller à bien récupérer un nombre grâce à la méthode parseInt. Celle-ci analyse jusau'à la première donnée qui ne correspond pas à un chiffre et renvoie la valeur chiffrée uniquement. Différent de Number cf.doc */
var enteredNumber = parseInt(prompt('Quel est le nombre à trouver, entre 0 et 500 ?'));

// 4. Initialisation d'un compteur pour calculer le nombre d'essais effectués
var attempt = 1;

// 5. CONDITION - TANT QUE l'utilisateur n'a pas saisi le nombre exact, le jeu continue
while (enteredNumber !== searchedNumber) {
    /* LOGIQUE : 
    si le joueur ne rentre rien ou clique sur "Annuler", la méthode 'parseInt' va renvoyer NaN (not a number). Fin de la boucle (abandon du jeu)
     */
    if (isNaN(enteredNumber)) {
        break;
    }

    /* CONDITION - PLUS OU MOINS */
    /* SI il a saisi un nombre plus petit que celui à trouver, un message d'information lui indique que c'est plus */
    if (enteredNumber < searchedNumber) {
        enteredNumber = parseInt(prompt('C\'est plus'));
    }
    /* SI il a saisi un nombre plus petit que celui à trouver, un message  d'information lui indique que c'est moins */
    else {
        enteredNumber = parseInt(prompt('C\'est moins'));
    }
    /* Incrémentation du nombre d'essais à chaque nouvelle tentative */
    attempt += 1;
    
}

/* 6. CONDITION - LE NOMBRE MYSTERE EST TROUVE ou CAS D'ABANDON */
if (enteredNumber == searchedNumber) {
    /* Message en cas de succès */
    alert('Bravo ! C\'était bien ' + searchedNumber + ' - Nombre d\'essais : ' + attempt);
} else {
    /* Message en cas d'abandon */
    alert('Abandon après ' + attempt + ' essais. Dommage !');
}
