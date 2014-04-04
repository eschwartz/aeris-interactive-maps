define([
  'aeris/util',
  'aeris/events',
  'aeris/mocks/mockfactory',
  'tests/mocks/template',
  'jquery'
], function(_, Events, MockFactory, MockTemplate, $) {
  /**
   * @class MockController
   * @implements aeris.application.controllers.ControllerInterface
   *
   * @constructor
   */
  var MockController = new MockFactory({
    methods: [
      'render',
      'close',
      'setElement'
    ],
    constructor: function() {
      Events.call(this);
    }
  });
  _.extend(MockController.prototype, Events.prototype);


  MockController.prototype.render = function() {
    this.trigger('render');

    this.$el = $(MockTemplate());
    this.el = this.$el[0];

    return this;
  };


  MockController.prototype.close = function() {
    this.trigger('close');

    return this;
  };


  return MockController;
});
