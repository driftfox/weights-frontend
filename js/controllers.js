var weightsControllers = angular.module('weightsControllers', []);
weightsControllers
    .controller('WeightListController', function ($scope, $http, $filter) {
        var date = new Date();
        $scope.userId = 2;
        $scope.weight = 0;
        $scope.todaysDay = $filter('date')(date, "dd");
        $scope.todaysYear = $filter('date')(date, "yyyy");
        $scope.todaysMonth = $filter('date')(date, "MM");
        $scope.todaysDate = $filter('date')(date, "yyyy-MM-dd");
        
        $scope.showUserWeights = function(){
            var getString = 'php/service.php?service=weightsList&user_id=' + $scope.userId;
            $http.get(getString, {cache: true}).success(function(data){
                $scope.exercises = data;
            });
        }
        $scope.showUserWeights();

        $scope.updateDate = function(){
            $scope.todaysDate = $scope.todaysYear + "-" + $scope.todaysMonth + "-" + $scope.todaysDay;
            // console.log($scope.todaysDate);
        }

        $scope.showGraph = function(userId, exerciseId, exerciseName){
            var getString = 'php/service.php?service=weightHistory&user_id=' + userId + '&weight_id=' + exerciseId;
            $http.get(getString, {cache: false}).success(function(data){
                // Prepare data for chart.js
                var chartLabels = [],
                    chartData = [];
                data.forEach(function(entry){
                    //Fill the empty arrays
                    chartLabels.push(entry.date);
                    chartData.push(parseInt(entry.weight));
                });
                // console.log(chartLabels);
                // console.log(chartData);

                //Get the context of the canvas element we want to select
                $('body').addClass('show-chart');
                $('#chartContainer').highcharts({
                    chart: {
                        type: 'column',
                        inverted: false,
                        events: {
                            click: function(){
                                $('body').removeClass('show-chart');
                            }
                        }
                    },
                    legend: {enabled: false},
                    plotOptions: {
                        column: {
                            dataLabels: {enabled: true },
                            enableMouseTracking: false
                        }
                    },
                    title: {text: exerciseName},
                    xAxis: {
                        categories: chartLabels
                    },
                    yAxis: {
                        title: {text: 'Pounds'},
                        tickInterval: 5
                    },
                    series: [{
                        name: userId,
                        data: chartData
                    }]
                });
            });
        }

        // $scope.setToPreviousWeight = function(previousWeight, weight, $scope){
            // console.log(weight);
            // console.log(previousWeight);
            // // $scope.weight = 10;
            // console.log($scope);
            // console.log($scope.weight);
        // }

        $scope.addSingleExercise = function(userId, exerciseId, weight, date){
            // Add exercise to db as soon as user chooses weight in dropdown
            var getString = 'php/service.php?service=addWeight&user_id=' + userId + '&weight_id=' + exerciseId + '&weight=' + weight + '&date=' + date;
            $http.get(getString, {cache : false}).success(function(data){});
            // console.log($scope);
        }
    })
    .controller('counterController', function ($scope, $interval) {
        // Increment Counter in seconds
        $scope.counterTime = 0;
        var incrementCounter = function() {
            $scope.counterTime++;
        }
        $interval(incrementCounter, 1000);

        // Reset Counter
        $scope.resetCounterTime = function() {
            $scope.counterTime = 0;
        }
        // console.log('ok');
        // $scope.showUserWeights = function(){
        //     var getString = 'php/service.php?service=weightsList&user_id=' + $scope.userId;
        //     $http.get(getString, {cache: true}).success(function(data){
        //         $scope.exercises = data;
        //     });
        // }
        // $scope.showUserWeights();
    });

var weightsFilters = angular.module('weightsFilters', []);
weightsFilters
    .filter('nospaces', function(){
        // Filter for stripping all spaces from strings
        return function(input){
            return input.replace(/ /g, "");
        }
    });
weightsFilters
    .filter('sectominsec', function(){
        // Filter seconds to min sec (i.e. 65 to 1:05)
        return function(input){
            var minutes,
                seconds,
                minSecFormat;
            minutes = Math.floor(input / 60);
            console.log(minutes);
            seconds = (input - minutes) % 60;
            if(seconds < 10) {
                seconds = "0" + seconds;
            }
            minSecFormat = minutes + ":" + seconds;
            return minSecFormat;
        }
    });