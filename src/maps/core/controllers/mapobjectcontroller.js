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
    _.defaults(options, {
      boundAttributes: []
    });

    /**
     * The state of the map used by the application.
     *
     * @property mapState_
     * @private
     * @type {aeris.maps.MapObjectInterface}
     */
    this.mapState_ = options.mapState;

    /**
     * The controller will keep the values
     * of these attributes in sync
     * between the map object and the map object state.
     *
     * @property boundAttributes_
     * @private
     * @type {Array.<string>}
     */
    this.boundAttributes_ = options.boundAttributes;

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
    this.bindAttributes_();
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


  /**
   * @method bindAttributes_
   * @private
   */
  MapObjectController.prototype.bindAttributes_ = function() {
    this.bindMapObjectToState_();
    this.updateStateFromMapObject_();
  };


  /**
   * @method bindMapObjectToState_
   * @private
   */
  MapObjectController.prototype.bindMapObjectToState_ = function() {
    var changeEvents = this.boundAttributes_.map(function(attr) {
      return _.template('change:{attr}', { attr: attr });
    });

    this.listenTo(this.model, changeEvents.join(' '), this.updateMapObjectFromState_);
  };


  /**
   * Update map object, using attributes
   * from the app state.
   *
   * @method updateMapObjectFromState_
   * @private
   */
  MapObjectController.prototype.updateMapObjectFromState_ = function() {
    var appStateViewAttributes = this.model.pick(this.boundAttributes_);

    this.mapObject_.set(appStateViewAttributes, { validate: true });
  };


  /**
   * Update the app state with attributes
   * from the view.
   *
   * @method updateStateFromMapObject_
   * @private
   */
  MapObjectController.prototype.updateStateFromMapObject_ = function() {
    var viewAttributes = this.mapObject_.pick(this.boundAttributes_);
    this.model.set(viewAttributes, { validate: true });
  };


  return MapObjectController;
});
