define([
  'aeris/util'
], function(_) {
  /**
   * @class MockTemplate
   */
  return function() {
    return '<div>MOCK_TEMPLATE_{id}</div>'.
      replace('{id}', _.uniqueId());
  };
});
