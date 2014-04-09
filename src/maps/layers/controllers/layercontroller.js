define([
  'aeris/util',
  'aeris/interactive/maps/core/controllers/mapobjectcontroller'
], function(_, MapObjectController) {
  /**
   * Controls an {aeris.maps.layer.Layer} view.
   *
   * @class LayerController
   * @namespace aeris.interactive.maps.layers.controllers.LayerController
   * @extends aeris.interactive.maps.core.controllers.MapObjectController
   *
   * @constructor
   *
   * @param {Object} options
   * @param {aeris.maps.layers.Layer} options.mapObject
   */
  var LayerController = function(options) {
    /**
     * @property mapObject
     * @type {aeris.maps.layers.Layer}
     */

    MapObjectController.call(this, options);

    this.bindToModelViewAttributes_();
  };
  _.inherits(LayerController, MapObjectController);


  /**
   * @method bindToModelViewAttributes_
   * @private
   */
  LayerController.prototype.bindToModelViewAttributes_ = function() {
    this.listenTo(this.model, {
      change: this.updateFromAppState_
    });

    this.updateFromAppState_();
  };


  /**
   * Update layer view, using attributes
   * from the app state.
   *
   * @method updateFromAppState_
   * @private
   */
  LayerController.prototype.updateFromAppState_ = function() {
    var appStateViewAttributes = this.model.pick([
      'opacity',
      'zIndex'
    ]);

    this.mapObject_.set(appStateViewAttributes, { validate: true });
  };


  return LayerController;
});
