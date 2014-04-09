define([
  'aeris/util',
  'aeris/events',
  'aeris/mocks/mockfactory',
  'tests/mocks/template',
  'jquery'
], function(_, Events, MockFactory, MockTemplate, $) {
  /**
   * @class MockController
   * @implements aeris.interactive.application.controllers.ControllerInterface
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
      this.$el = $('<div></div>');
      this.el = this.$el[0];

      Events.call(this);
    }
  });
  _.extend(MockController.prototype, Events.prototype);


  MockController.prototype.render = function() {
    this.trigger('render');

    this.$el.html(MockTemplate());

    return this;
  };


  MockController.prototype.close = function() {
    this.trigger('close');

    return this;
  };


  return MockController;
});
