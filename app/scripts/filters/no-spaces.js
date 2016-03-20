'use strict';

/**
 * @ngdoc filter
 * @name weightsApp.filter:noSpaces
 * @function
 * @description
 * # noSpaces
 * Filter for stripping all spaces from strings
 */
angular.module('weightsApp')
	.filter('noSpaces', function () {
        return function(input){
            return input.replace(/ /g, "");
        }
	});
