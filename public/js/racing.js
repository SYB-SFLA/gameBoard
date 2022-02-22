const app = {
    /* PROPRIÉTÉ DU JEU */

    /* Poitage d'un élément du DOM, à savoir la div 'board' */
    boardElement: document.getElementById('board'),
    /* gameOver est à false par défaut car la partie n'est pas commencé */
    gameOver: false,
    /* Initialisation du compteur à 0 */
    moveCount: 0,
    /* Coordonnées du joueur et direction affectée */
    player: {
        x: 0,
        y: 0,
        direction: 'right'
    },
    /* Case à atteindre avec les positions de celle-ci */
    targetCell: {
        x: 5,
        y: 3,
    },

    /* ------------------------------------- */
    /* 1. Méthode qui permet de vérifier si une partie est terminée ou pas */
    checkIfGameIsOver: () => {
        /* CONDITION - SI le joueur est sur la case d'arrivée - les positions du joueur correspondent aux positions de la case d'arrivée */
        if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
            /* Message de succès affiché via un promp avec le nombre de coups comptabilisé avec la méthode moveCount codée plus bas */
            alert(`🎉 Victoire en ${app.moveCount} coups 🎉`);
            /* Changement de la valeur de gameOver en cas de victoire */
            app.gameOver = true;
        }
    },
    /* 2. Méthode qui permet de tourner à gauche */
    turnLeft: () => {
        /* CONDITION - SI la partie est terminée, on sort de cette méthode - Plus de raison de continuer */
        if (app.gameOver) {
            return;
        }
        /* Incrémentation de compteur à chaque déplacement */
        app.moveCount++;
        /* CAS DE FIGURE */
        switch (app.player.direction) {
            /* CAS où la direction du joueur est à droite */
            case 'right':
                /* Changement de direction vers le haut */
                app.player.direction = 'up';
                break;
            /* CAS où la direction du joueur est en haut */
            case 'up':
                /* Changement de direction ver la gauche */
                app.player.direction = 'left';
                break;
            /* CAS où la direction du joueur est à gauche */
            case 'left':
                /* Changement de direction ver le bas */
                app.player.direction = 'down';
                break;
            /* CAS où la direction du joueur est en bas */
            case 'down':
                /* Changement de direction vers la droite */
                app.player.direction = 'right';
                break;
        }

        // on vient de tourner ? ok on redessine tout
        app.redrawBoard();
    },
    /* 2. Méthode qui permet de tourner à droite */
    turnRight: () => {
        /* CONDITION - SI la partie est terminée, on sort de cette méthode - Plus de raison de continuer */
        if (app.gameOver) {
            return;
        }
        /* Incrémentation de compteur à chaque déplacement */
        app.moveCount++;
        
        switch (app.player.direction) {
            /* CAS où la direction du joueur est à droite */
            case 'right':
                /* Changement de direction vers le bas */
                app.player.direction = 'down';
                break;
            /* CAS où la direction du joueur est à gauche */
            case 'left':
                /* Changement de direction vers le haut */
                app.player.direction = 'up';
                break;
            /* CAS où la direction du joueur est en haut */
            case 'up':
                /* Changement de direction vers la droite */
                app.player.direction = 'right';
                break;
            /* CAS où la direction du joueur est en bas */
            case 'down':
                /* Changement de direction vers la gauche */
                app.player.direction = 'left';
                break;
        }

        // on vient de tourner ? ok on redessine tout
        app.redrawBoard();
    },
    /* 3. Méthode qui permet d'avancer sur le plateau de jeu */
    moveForward: () => {
        /* CONDITION - SI la partie est terminée, on sort de cette méthode - Plus de raison de continuer */
        if (app.gameOver) {
            return;
        }

        /* Déplacement du joueur dans la direction vers laquelle il est tourné - Faire attention à ne pas sortir de la grille */
        /* Incrémentation du compteur de mouvement */
        app.moveCount++;

        /* CAS DE FIGURE */
        switch (app.player.direction) {
            /* CAS où la direction du joueur est à droite */
            case 'right':
                /* Faire attention à ne pas dépasser par la droite */
                /* CONDITION - SI la position 'x' du joueur est inférieur à 5, soit la position de la case d'arrivée, alors on incrémente - le joueur n'a pas atteint la limite de la grille */
                if (app.player.x < 5) {
                    app.player.x++;
                }
                break;
            /* CAS où la direction du joueur est en haut */
            case 'up':
                // Faire attention à ne pas dépasser par le haut ?
                /* CONDITION - SI la position 'y' du joueur est supérieur à 0, alors on décrémente - le joueur doit poursuivre le chemin par en bas, sinon il sort de la grille */
                if (app.player.y > 0) {
                    app.player.y--;
                }
                break;
            /* CAS où la direction du joueur est à gauche */
            case 'left':
                // Faire attention à ne pas dépasser par la gauche ?
                /* CONDITION - SI la position 'y' du joueur est supérieur à 0, alors on décrémente - le joueur doit poursuivre par la droite au risque de quitter le plateau */
                if (app.player.x > 0) {
                    app.player.x--;
                }
                break;
            /* CAS où la direction du joueur est en bas */
            case 'down':
                // Faire attention à ne pas dépasser par en bas ?
                /* CONDITION - SI la position 'y' du joueur est inférieur à 3, soit la position de la case d'arrivée, alors on incrémente */
                if (app.player.y < 3) {
                    app.player.y++;
                }
                break;
        }

        // on vient d'avancer ? ok on redessine tout
        app.redrawBoard();
    },
    /* 4. Méthode qui permet de nettoyer le plateau de jeu */
    clearBoard: () => {
        /* La propriete innerHTMl permet de designer le contenu qui se trouve entre une balsie ouverte et fermante - Dans notre cas, on réaffecte 'RIEN' à l'élément 'boardElement' - Façon de cleaner l'élément ciblé  */ 
        app.boardElement.innerHTML = '';
    },
    /* 5. Méthode qui peremt de dessiner le plateau de jeu */
    drawBoard: () => {
        /* Création de 4 divs avec la classe "row" */
        /* Puis dans chacune des divs, création de 6 autres divs ayant la classe 'cell' */
        for (let i = 0; i < 4; i++) {
            /* Création des lignes */
            const rowElement = document.createElement('div');

            /* Ajout d'une class CSS */
            rowElement.classList.add('row');

            /* Insertion des lignes dans le board - relation parent/enfant */
            app.boardElement.appendChild(rowElement);
            for (let j = 0; j < 6; j++) {
                /* Création des colonnes */
                const cellElement = document.createElement('div');

                /* Ajout d'une classe CSS */
                cellElement.classList.add('cell');

                /* CONDITION - SI les coordonnées de la case dessinée correspondent aux coordonnées de la case du joueur */
                if (i === app.player.y && j === app.player.x) {
                    /* Création d'une div pour le joueur */
                    const playerElement = document.createElement('div');

                    /* Ajout de la classe */
                    playerElement.classList.add('player');

                    /* Application de la rotation du joueur en fonction de sa direction */
                    /* template string avec es6 */
                    playerElement.classList.add(`player--${app.player.direction}`);

                    /* Ajout du joueur dans la cellule */
                    cellElement.appendChild(playerElement);
                }
                
                /* CONDITION - SI la case dessinée correspond à la case d'arrivée */
                /*  Ajout d'une class */
                if (i === app.targetCell.y && j === app.targetCell.x) {
                    cellElement.classList.add('targetCell');
                }

                /* Insertion dans la ligne */
                rowElement.appendChild(cellElement);
            }
        }

        /* Vérification si le joueur a gagné ou pas */
        app.checkIfGameIsOver();
    },
    /* 6. Méthode qui permet de redessiner le plateau de jeu */
    redrawBoard: () => {
        /* Nettoyage du plateau de jeu */
        app.clearBoard();
        /* Redessinage du plateau de jeu */
        app.drawBoard();
    },

    /* 7. Méthode qui permet de brancher notre écouteur d'événement clavier */
    listenKeyboardEvents: () => {
        /* L'écoute d'événement clavier peut se faire sur tout le site. Cependant, il n'est pas lié à un élément spécifique du DOM. Dans ce cas, on écoute sur tout le site. Rappel: 'keyup' est l'écoute d'événement au relâchement d'une touche du clavier */
        document.addEventListener('keyup', (event) => {
            /* En paramètre de la fonction callback anonyne, on a un 'event'. On peut récupéré la propriété 'event.key' qui contient une string décrivant sur quelle touche l'utilisateur a appuyé */
            switch (event.key) {
                /* CAS où le joueur a appuyé sur la touche du haut */
                case 'ArrowUp':
                    /* Dans ce cas-là, le joueur souhaite avancer sur le plateau de jeu */
                    app.moveForward();
                    break;
                /* CAS où le joueur a appuyé sur la touche de gauche */
                case 'ArrowLeft':
                    /* Dans ce cas-là, le joueur souhaite tourner à gauche sur le plateau de jeu */
                    app.turnLeft();
                    break;
                /* CAS où le joueur a appuyé sur la touche de droite */
                case 'ArrowRight':
                    /* Dans ce cas-là, le joueur souhaite tourner à droite sur le plateau de jeu */
                    app.turnRight();
            };
        });
    },
    /* 8. Méthode pour initialiser le jeu */
    init: () => {
        /* Exécution de la méthode des écouteurs d'événements */
        app.listenKeyboardEvents();
        /* Exécution de la méthode de dessin du plateau de jeu */
        app.drawBoard();
    }
};

/* Excution de la méthode 'app.init' lorsque la page HTML a fini de se charger */
document.addEventListener('DOMContentLoaded', app.init);