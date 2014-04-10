define([
  'aeris/util',
  'aeris/interactive/application/controllers/layoutcontroller',
  'aeris/errors/invalidargumenterror',
  'marionette'
], function(_, LayoutController, InvalidArgumentError, Marionette) {
  /**
   * Controls the map controls view.
   *
   * @class MapControlsController
   * @namespace aeris.interactive.maps.mapcontrols.controllers
   * @extends aeris.interactive.application.controllers.LayoutController
   *
   * @constructor
   *
   * @param {Object} options
   * @param {aeris.Events} options.eventHub Required.
   * @param {aeris.interactive.options.AppBuilderOptions} options.builderOptions Required.
   * @param {Object.<string,string>=} options.controlsRegionLookup
   * @param {string=} options.selectedClass
   * @param {string=} options.deselectedClass
   */
  var MapControlsController = function(options) {
    /**
     * Application event hub.
     *
     * @type {aeris.Events}
     * @private
     * @property eventHub_
     */
    this.eventHub_ = options.eventHub;


    /**
     * Lookup region names from
     * control view names.
     *
     * @type {Object.<string,string>}
     * @private
     * @property controlsRegionLookup_
     */
    this.controlsRegionLookup_ = options.controlsRegionLookup || {};


    LayoutController.call(this, options);
  };
  _.inherits(MapControlsController, LayoutController);


  /**
   * Setup view bindings
   * @method render
   */
  MapControlsController.prototype.render = function() {
    this.startRenderingControlsFromEvents_();

    LayoutController.prototype.render.apply(this, arguments);

    // We want to start out with all regions
    // hidden, so we don't have funky empty container
    // UI all over the place.
    this.hideAllRegions();
  };


  /**
   * @private
   * @method startRenderingControlsFromEvents_
   */
  MapControlsController.prototype.startRenderingControlsFromEvents_ = function() {
    // Request controls views.
    this.listenTo(this.eventHub_, 'mapControls:ready', this.renderControlsView);
  };


  /**
   * Add a view to the
   * controls view.
   *
   * @throws {aeris.errors.InvalidArgumentError}
   *        If no region is associated with the controlsViewName.
   *
   * @param {LayoutController} controller
   * @param {string} controlsViewName
   * @method renderControlsView
   */
  MapControlsController.prototype.renderControlsView = function(controller, controlsViewName) {
    var controlsRegion = this.getControlsRegion(controlsViewName);

    if (!controlsRegion) {
      throw new InvalidArgumentError('Unable to render \'' + controlsViewName + '\' ' +
        'controls: No region is defined in which to render the view');
    }

    controlsRegion.show(controller);
    controlsRegion.$el.css('display', '');
  };


  /**
   * @param {string} controlsViewName
   * @return {Marionette.Region|undefined}
   * @method getControlsRegion
   */
  MapControlsController.prototype.getControlsRegion = function(controlsViewName) {
    var regionName = this.controlsRegionLookup_[controlsViewName];
    var region = this[regionName];
    var isRegionCorrectType = region instanceof Marionette.Region;

    return isRegionCorrectType ? region : undefined;
  };


  /**
   * Clean up.
   * @method close
   */
  MapControlsController.prototype.close = function() {
    this.stopListening();
    this.$el.remove();
  };


  return MapControlsController;
});

/**
 * @for aeris.interactive.maps.event.EventHub
 */
/**
 * Fired when a map controls UI controller
 * is ready to be rendered in the map controls view.
 *
 * @event mapControls:ready
 *
 * @param {aeris.interactive.application.controllers.ControllerInterface} controller
 * @param {string} controlsViewName Name of the controls view.
 */
