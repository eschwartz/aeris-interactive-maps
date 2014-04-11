define([
  'aeris/util',
  'aeris/interactive/application/controllers/itemcontroller',
  'hbars!aeris/interactive/application/widgets/slider/view/tooltip.html'
], function(_, ItemController, tooltipTemplate) {
  /**
   * @class Tooltip
   * @namespace aeris.interactive.application.widgets.slider
   * @extends aeris.interactive.application.widgets.ItemController
   *
   * @constructor
  */
  var Tooltip = function(options) {
    _.defaults(options, {
      className: 'aeris-tooltip',
      template: tooltipTemplate,
      ui: {},
      offsetY: 2
    });

    _.defaults(options.ui, {
      content: '.aeris-tooltip-content'
    });


    /**
     * @property offsetY_
     * @private
     * @type {number}
    */
    this.offsetY_ = options.offsetY;


    ItemController.call(this, options);
  };
  _.inherits(Tooltip, ItemController);


  /**
   * @method setContent
   * @param {string} content
   */
  Tooltip.prototype.setContent = function(content) {
    this.ui.content.text(content);
  };


  /**
   * @method setPosition
   * @param {number} positionX
   */
  Tooltip.prototype.setPosition = function(positionX) {
    // Adjusts for pointer element
    var heightAdjusment = 8;
    var totalOffsetY = this.$el.outerHeight() + heightAdjusment + this.offsetY_;

    // Adjust so that tooltip is centered over position.
    var widthAdjustment = (this.$el.outerWidth() / 2) * -1;
    var totalOffsetX = widthAdjustment + positionX;

    this.$el.css({
      top: totalOffsetY * -1,
      left: totalOffsetX
    });
  };


  /**
   * @method show
   */
  Tooltip.prototype.show = function() {
    this.$el.css('opacity', 1);
  };


  /**
   * @method hide
   */
  Tooltip.prototype.hide = function() {
    this.$el.css('opacity', 0);
  };


  return Tooltip;
});
