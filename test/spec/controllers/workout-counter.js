'use strict';

describe('Controller: WorkoutCounterCtrl', function () {

  // load the controller's module
  beforeEach(module('weightsApp'));

  var WorkoutCounterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkoutCounterCtrl = $controller('WorkoutCounterCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WorkoutCounterCtrl.awesomeThings.length).toBe(3);
  });
});
