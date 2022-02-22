var game = {
    /* Information non obligatoire */
    nbDices: null,
  
    /* Définition des propriétés */
    victory: 0,
    defeat: 0,
  
    /* Propriété est à false et qui permet d'éviter de lancer plusieurs parties simulatannées */
    ingame: false,
  
    /* ------------------------------------- */
    /* 1. Méthode pour inialiser le jeu */
    init: function() {
      var playBtn = document.getElementById('play');
  
      /* Fonction game.start n'est pas executée */
      playBtn.addEventListener('click', game.start);
  
      /* Ecoute d'un événement au clavier */
      /* Le paramètre récuperé 'keyup' représente l'événement déclenché et contient des infos utiles. les événements 'keydown' surviennent lorqu'une touche est appuyée et  ensuite intervient 'keyup' lorsqu'elle est relâchée.
      */
      document.addEventListener('keyup', function(event) {
        /* CONDITION  - SI la touche 'relachée' est la touche 'espace', alors la partie est exécutée avec game.start() */
        if (event.code === 'Space') {
          game.start();
        }
      });
  
      /* Pointage et stockage de la classe 'board' dans une propriété non déclaré auparavant pour une utilisation ultérieure */
      game.boards = document.querySelectorAll('.board');
  
      /* Opération identique à celle du dessus */
      game.diceNumberInput = document.getElementById('dice-number-input');
  
      /* Mise sur écoute de l'événement 'input' qui permet de choisir au curseur le nombre de dés et attribution de la méthode 'changeNumber' au relâchement du curseur */
      game.diceNumberInput.addEventListener('input', game.changeNumber);
  
      /* Pointage d'un élément  du DOM */
      var gameForm = document.getElementById('game-form');
      /* Soumission du formulaire et lancement de la partie à l'écoute de cet événement */ 
      gameForm.addEventListener('submit', game.play);
      
      /* Première exécution de la fonction pour récupérer la valeur initiale */
      game.changeNumber();
    },
  
    /* 2. Méthode pour afficher le jeu - Changement de div */
    start: function() {
      /* Page d'intro masquée au lancement du jeu avec l'ajout d'une class 'hidden' avec le style display none */
      document.getElementById('welcome').classList.add('hidden');
      /* Page de jeu dévoilée avec la suppression de la class 'hidden' qui masquait cette partie du site avant le lancement du jeu */
      document.getElementById('app').classList.remove('hidden');
    },
  
    /* 3. Méthode pour choisir le nombre de dés */
    changeNumber: function() {
      /* Pointage de l'élément du DOM, à savoir l'id 'dice-number' */
      var diceNumberElement = document.getElementById('dice-number');
      /* Récupération de la valeur nominale des dés grâce aux propriétés de l'objet */
      game.nbDices = game.diceNumberInput.value;
      diceNumberElement.textContent = game.nbDices;
    },
  
    /* 4. Methode pour lancer le jeu */
    play: function(event) {
      /* Empêchement par defaut de la soumission du formulaire */
      event.preventDefault();
  
      /* CONDITION - SI on est pas déjà en cours de partie */
      if(!game.ingame) {
        /* Dorénavant, on est dans une partie */
        game.ingame = true;
  
        /* Vidange de l'interface - Méthode codée plus bas */
        game.reset();
  
        /* Création des dés du joueur et récupération du score grâce à la méthode 'createAllDices' */
        /* Stockage des dés créés + score dans la méthode 'playerScore' de l'objet game - utilisation ultérieure */
        game.playerScore = game.createAllDices('player');
  
        /* Déclenchement du lancer du dealer après 3 secondes grâce à la méthode minuteur 'setTimeout' appliqué sur la méthode dealerPlay codée plus bas */
        setTimeout(game.dealerPlay, 3000);
  
        /* Création d'un compteur - Méthode codée plus bas */
        game.createCounter();
      }
    },
  
    /* 5. Méthode pour supprimer les dés et réinitialiser les scores */
    reset: function() {
      /* Parcours de chaque board */
      for (var boardIndex = 0; boardIndex < game.boards.length; boardIndex++) {
        /* Ciblage d'un élément du DOM, à savoir le board et vidage de celui-ci */
        game.boards[boardIndex].innerHTML = '';
      }
    },
  
    /* 6. Méthode retournant un nombre aléatoire dans une plage donnée */
    getRandom: function(min, max) {
      /* Math.floor() permet de renvoyer le plus grand entier inférieur ou égal à la valeur passée en argument. 
      La fonction Math.random() renvoie un nombre flottant pseudo-aléatoire compris dans l'intervalle [0, 1[ (ce qui signifie que 0 est compris dans l'intervalle mais que 1 en est exclu) */
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  
    /* 7. Méthode pour lancer le bon nombre de dé et retourner le score total */
    createAllDices: function(player) {
      /* Initialisalisation du score */
      var score = 0;
      /* Création du nombre de dés demandés */
      for (var nbDice = 0; nbDice < Number(game.nbDices); nbDice++) {
        /*  Création d'un dé pour un joueur et récupération de sa valeur */
        var diceScore = game.createDice(player);
        /* Ajout de la valeur au score */
        score += diceScore;
      }
      /* Score retourné */
      return score;
    },
  
     /* 8. Méthode de création d'un dé pour un joueur grâce à son l'index passé en paramètre de la fonction et incrémentation du score */
    createDice: function(player) {
      /* Création d'un élément du DOM, à savoir une div stockée dans une variable 'dice' */
      var dice = document.createElement('div');
      /* Création et stockage dans une variable d'un nombre aléatoire entre 1 et 6 grâce à la methode getrandom codée plus bas */
      var diceValue = game.getRandom(1, 6);
      /* Définit du décalage à appliquer sur l'image pour l'affichage de chaque face du dé */
      var imageOffset = (diceValue - 1) * 100;
      /* Ajout d'une class à la div créé précédemment */
      dice.className = 'dice';
      /* Div vide */
      dice.textContent = '';
      /* Changement du style de la position de l'arrière plan */
      dice.style.backgroundPosition = '-'+ imageOffset + 'px 0';
      /* Ajout de la div créé dans le board du joueur en fonction de son id */
      document.getElementById(player).appendChild(dice);
      /* Retour de la valeur du dé */
      return diceValue;
    },
  
    /*  9. Méthode pour le lancer de l'adversaire */
    dealerPlay: function() {
      /* Création des dés de l'adversaire et récupération de son score */
      var dealerScore = game.createAllDices('dealer');
  
      /* CONDITION - SI le score de l'adversaire est plus élevé, la partie est perdue */
      if(dealerScore > game.playerScore) {
        game.defeat++;
      }
      /* SINON SI - notre score est plus élevé, la partie est gagnée */
      else if(dealerScore < game.playerScore) {
        game.victory++;
      }
  
      /* CONDITION EGALITE - Rien à faire ! */
  
      /* Mise à jour de l'interface avec les résultats */
      game.displayResult('player', game.victory);
      game.displayResult('dealer', game.defeat);
  
      /* La partie est finie on peut ensuite en lancer une autre - False permet de ne pas lancer de parties en simultanée */
      game.ingame = false;
    },
  
    /* 10. Méthode pour ajouter une div avec le nombre de victoires pour chaque joueur */
    displayResult: function(board, counter) {
      /* Création d'une div */
      var result = document.createElement('div');
      /* Ajout d'une classe à la div précédemment créée */
      result.className = 'result';
      /* Inscription du nombre de victoire d'un joueur passé en paramètre */
      result.textContent = counter;
      /* Ajout de la div créé dans le board qui a l'id passé en paramètre */
      document.getElementById(board).appendChild(result);
    },
  
    /* 11. Méthode pour initialiser le compteur */
    createCounter: function() {
      /* Itinitialisation d'un compteur - 3 secondes avant le lancement de la partie */
      game.counter = 3;
      /* Création et ajout d'un élément au DOM */
      game.counterElement = document.createElement('div');
      /* Affectation de la valeur du compteur, via textContent qui permet d'ajouter du text à un élément/noeud du DOM, à la div précédemment créé 'counterElement' */
      game.counterElement.textContent = game.counter;
      /* Affectation de la class 'counter' à la div précédemment créée */
      game.counterElement.className = 'counter';
      /* Ajout d'un élément enfant (couterElement) à un élément parent (app) */
      document.getElementById('app').appendChild(game.counterElement);
  
      /* Stockage de la référence à l'intervalle pour pouvoir l'annuler plus tard */
      /* Mise à jour de l'intervalle à sa seconde */
      game.counterInterval = setInterval(game.countdown, 1000);
    },
  
    /* 12. Méthode pour décrémenter le compteur */
    countdown: function() {
      /* Décrémente du compteur */
      game.counter--;
      /* Mise à jour de l'élément dans le DOM */
      game.counterElement.textContent = game.counter;
  
      /* CONDITION - SI le compteur est à 0, on stoppe et supprime le compteur avec la méthode 'deleteCounter' */
      if (game.counter === 0) {
        game.deleteCounter();
      }
    },
  
    /* 13. Méthode pour stopper et supprimer le compteur du DOM */
    deleteCounter: function() {
      /* Interruption de l'intervalle avec la méthode clearInterval qui permet de supprimer l'intervalle qui a été précédemment édéfini avec la méthode setInterval */
      clearInterval(game.counterInterval);
  
      /* Suppression de la div précédemment créée contenant le compteur du DOM */
      game.counterElement.remove();
    },
  };
  
  /* Exécution de la méthode init */
  game.init();
  
  /* Exécution de la méthode init seulement quand on est sûr que le document est prêt */
  document.addEventListener('DOMContentLoaded', game.init);
  