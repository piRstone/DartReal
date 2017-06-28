angular.module('components', [])

.directive('player', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			player: '=player',
			onWin: '&',
			onRemove: '&',
			status: '='
		},
		controller: function($scope, $timeout) {
			$scope.error = false;
			$scope.success = false;

			/**
			 * Supprime un joueur de la liste des joueurs
			 */
			$scope.removePlayer = function() {
				$scope.onRemove({player: $scope.player});
			}

			/**
			 * Met à jour le score du joueur
			 *
			 * @params {number} - ID du joueur
			 * @params {number} - Score à soustraire
			 */
			$scope.updateScore = function(id, score, event) {
				if ($scope.player.score - score < 0) {
					$scope.error = true;
				} else {
					$scope.player.score -= score;

					$scope.success = true;
					$timeout(function() {
						$scope.success = false;
					}, 1000);
					$scope.score = "" // Reset le champ score
					event.target[0].blur(); // Blur l'input

					if ($scope.player.score == 0) {
						$scope.onWin({winner: $scope.player});
					}
				}
			}

			/**
			 * Efface le message d'erreur dès qu'on modifie le score
			 */
			$scope.clearError = function() {
				if ($scope.error == true) $scope.error = false;
			}
		},
		template:
		'<div>' +
			'<p class="order" ng-class="{trophy: player.order == 1}" ng-show="player.order != undefined">{{ player.order }}<span ng-show="player.order == 1">er</span><span ng-show="player.order != 1">ème</span></p><p>{{ player.name }}</p> <span>score : </span><p ng-class="{changed: success == true}">{{ player.score }}</p>' +
			'<a class="remove" ng-show="status == 0" ng-click="removePlayer()">&times;</a>' +
			'<div class="score-form">' +
				'<form name="scoreForm" ng-submit="updateScore(player.id, score, $event)">' +
					'<input type="text" title="Score à soustraire" ng-model="score" ng-change="clearError()" ng-disabled="status == 0 || status == 2" required/><button type="submit" ng-disabled="status == 0 || status == 2">MAJ</button>' +
					'<p class="error" ng-show="error == true">Votre score ne peut pas être négatif !</p>' +
				'</form>' +
			'</div>' +
			'<div class="clear"></div>' +
		'</div>'
	}
})
