define([
  'aeris/util',
  'aeris/interactive/application/controllers/mapobjectcontroller'
], function(_, BaseMapObjectController) {
  /**
   * @class MapObjectController
   * @namespace aeris.interactive.maps.core.controllers
   * @extends aeris.interactive.application.controlleres.MapObjectController
   *
   * @constructor
   *
   * @param {Object} options
   * @param {aeris.maps.MapObjectInterface} options.appState
   */
  var MapObjectController = function(options) {
    /**
     * The state of the map used by the application.
     *
     * @property mapState_
     * @private
     * @type {aeris.maps.MapObjectInterface}
     */
    this.mapState_ = options.mapState;

    /**
     * Describes the current state of the
     * map object.
     *
     * @property model
     * @private
     * @type {aeris.interactive.application.forms.models.Toggle}
     */

    BaseMapObjectController.call(this, options);

    this.bindToMapState_();
    this.bindToToggleState_();
  };
  _.inherits(MapObjectController, BaseMapObjectController);


  /**
   * Use the mapState map when rendering.
   *
   * @method bindToAppState_
   * @private
   */
  MapObjectController.prototype.bindToMapState_ = function() {
    this.useMap(this.mapState_.getMap());
    this.listenTo(this.mapState_, 'change:map', function(appState, map) {
      this.useMap(map);
    });
  };


  /**
   * Renders or hides when the model is
   * selected or deselected.
   *
   * @method bindToToggleState_
   * @private
   */
  MapObjectController.prototype.bindToToggleState_ = function() {
    this.listenTo(this.model, {
      select: function() {
        this.render();
      },
      deselect: function() {
        this.hide();
      }
    });

    if (this.model.isSelected()) {
      this.render();
    }
    else {
      this.hide();
    }
  };


  return MapObjectController;
});
