'use strict';

describe('Filter: noSpaces', function () {

  // load the filter's module
  beforeEach(module('weightsApp'));

  // initialize a new instance of the filter before each test
  var noSpaces;
  beforeEach(inject(function ($filter) {
    noSpaces = $filter('noSpaces');
  }));

  it('should return the input prefixed with "noSpaces filter:"', function () {
    var text = 'angularjs';
    expect(noSpaces(text)).toBe('noSpaces filter: ' + text);
  });

});
