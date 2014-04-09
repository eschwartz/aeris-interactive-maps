define([
  'aeris/util',
  'aeris/interactive/application/modules/module'
], function(_, Module) {
  /**
   * Application module for managing tile layers.
   *
   * @class LayersModule
   * @namespace aeris.interactive.maps.layers.modules
   * @extends aeris.interactive.application.modules.Module
   *
   * @param {Object.<string, aeris.interactive.application.controller.ControllerInterface>} options.controlsController
   * @param {aeris.Events} options.eventHub
   * @param {aeris.Collection} options.moduleState
   *
   * @constructor
   */
  var LayersModule = function(options) {

    /**
     * Controls the view with UI controls for manipulating
     * the map object.
     *
     * @property controlsController_
     * @private
     * @type {Object.<string, aeris.interactive.application.controller.ControllerInterface>}
     */
    this.controlsController_ = options.controlsController;

    /**
     * @property eventHub_
     * @private
     * @type {aeris.Events}
    */
    this.eventHub_ = options.eventHub;

    /**
     * @property moduleState_
     * @private
     * @type {aeris.Collection}
    */
    this.moduleState_ = options.moduleState;


    Module.call(this);

    this.addInitializer(this.populateState_);
    this.addInitializer(this.renderControls_);
  };
  _.inherits(LayersModule, Module);


  /**
   * Render UI controls, for controlling
   * map objects associated with this module.
   *
   * @method renderControls_
   * @private
   * @param {aeris.interactive.maps.options.MapAppBuilderOptions} builderOptions
   */
  LayersModule.prototype.renderControls_ = function() {
    this.eventHub_.trigger('mapControls:ready', this.controlsController_, 'layers');
  };


  /**
   * @method populateState_
   * @private
   */
  LayersModule.prototype.populateState_ = function(builderOptions) {
    this.moduleState_.set(builderOptions.get('layers'));
  };


  return LayersModule;
});
