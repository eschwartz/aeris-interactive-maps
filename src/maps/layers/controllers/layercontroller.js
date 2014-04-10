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
    _.defaults(options, {
      boundAttributes: [
        'opacity',
        'zIndex'
      ]
    });

    /**
     * @property mapObject
     * @type {aeris.maps.layers.Layer}
     */

    MapObjectController.call(this, options);
  };
  _.inherits(LayerController, MapObjectController);

  return LayerController;
});
