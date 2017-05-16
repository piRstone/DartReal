angular.module('dartreal', ['components'])

.controller('testCtrl', function($scope) {
	$scope.players = [];
	$scope.type = null;
	$scope.status = 0; // 0 : partie non commencée, 1 : partie en cours, 2 : partie terminée
	$scope.winner = null;

	/**
	 * Choix du type de jeu
	 *
	 * @params {number} - Nombre de points de la partie
	 */
	$scope.chooseGame = function(type) {
		$scope.type = type;
	}

	/**
	 * Lance le jeu (active les inputs de score)
	 */
	$scope.play = function() {
		if ($scope.players.length > 0)
			$scope.status = 1;
	}

	/**
	 * Ajoute un joueur et lui assigne son score de début
	 *
	 * @params {String} - Nom du joueur
	 */
	$scope.addPlayer = function(name) {
		if ($scope.addUser.$valid) {
			var player = {id: $scope.players.length, name: name, score: $scope.type};
			$scope.players.push(player);

			// Reset form
			$scope.name = "";
		}
	}

	/**
	 * Supprime un joueur de la liste des joueurs
	 */
	$scope.removePlayer = function(player) {
		var index = $scope.players.findIndex(function(p) { return p.id == player.id });
		$scope.players.splice(index, 1);
	}

	/**
	 * Est appelé quand un joueur à gagné (score == 0)
	 * Arrête la partie et affiche le nom joueur gagnant
	 *
	 * @params {Object} - Joueur
	 */
	$scope.setWinner = function(winner) {
		console.log('called', winner);
		$scope.winner = winner;
		$scope.status = 2;
	}

	/**
	 * Réinitialise la partie
	 */
	$scope.init = function() {
		$scope.players.splice(0, $scope.players.length);
		$scope.type = null;
		$scope.status = 0;
		$scope.winner = null;
	}
})