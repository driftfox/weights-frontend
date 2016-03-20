'use strict';

/**
 * @ngdoc function
 * @name weightsApp.controller:WorkoutCounterCtrl
 * @description
 * # WorkoutCounterCtrl
 * Controller of the weightsApp
 */
angular.module('weightsApp')
	.controller('WorkoutCounterCtrl', function ($scope, $interval) {
        // Increment Counter in seconds
        $scope.counterTime = 0;
        $scope.counterStartTime = new Date();
        var updateTimer = function() {
            var currentTime = new Date();
            $scope.counterTime = new Date(currentTime - $scope.counterStartTime);
        }
        $interval(updateTimer, 250);

        // Reset Counter
        $scope.resetCounterTime = function() {
            $scope.counterStartTime = new Date();
            updateTimer();
        }

        // Set Count
        $scope.setCount = [
            {
                'number' : 1,
                'active' : false
            },
            {
                'number' : 2,
                'active' : false
            },
            {
                'number' : 3,
                'active' : false
            },
            {
                'number' : 4,
                'active' : false
            },
            {
                'number' : 5,
                'active' : false
            },
        ]
        $scope.setSetCount = function(index) {
            $scope.resetCounterTime();
            var setCountLength = $scope.setCount.length;
            for (var i = $scope.setCount.length - 1; i >= 0; i--) {
                if(i > index || index === -1) {
                    $scope.setCount[i].active = false;
                } else {
                    $scope.setCount[i].active = true;
                }
            }
        }
	});
