'use strict';

describe('Controller: WeightListCtrl', function () {

  // load the controller's module
  beforeEach(module('weightsApp'));

  var WeightListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WeightListCtrl = $controller('WeightListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WeightListCtrl.awesomeThings.length).toBe(3);
  });
});
