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
            // // $scope.weight = 10;
        // }

        $scope.addSingleExercise = function(userId, exerciseId, weight, date){
            // Add exercise to db as soon as user chooses weight in dropdown
            var getString = 'php/service.php?service=addWeight&user_id=' + userId + '&weight_id=' + exerciseId + '&weight=' + weight + '&date=' + date;
            $http.get(getString, {cache : false}).success(function(data){});
        }
    })
    .controller('counterController', function ($scope, $interval) {
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

var weightsFilters = angular.module('weightsFilters', []);
weightsFilters
    .filter('nospaces', function(){
        // Filter for stripping all spaces from strings
        return function(input){
            return input.replace(/ /g, "");
        }
    });