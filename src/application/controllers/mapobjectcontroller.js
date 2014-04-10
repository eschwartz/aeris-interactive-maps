define([
  'aeris/util',
  'aeris/events'
], function(_, Events) {
  /**
   * A controller for an {aeris.maps.MapObjectInterface}
   *
   * @class MapObjectController
   * @namespace aeris.interactive.application.controllers
   * @implements aeris.interactive.application.controllers.ControllerInterface
   * @uses aeris.Events
   *
   * @constructor
   *
   * @param {Object=} options
   * @param {aeris.maps.MapObjectInterface} options.mapObject
   */
  var MapObjectController = function(options) {

    /**
     * @property mapObject_
     * @protected
     * @type {aeris.maps.MapObjectInterface}
    */
    this.mapObject_ = options.mapObject;

    /**
     * The map to use when rendering the
     * map object.
     *
     * @property mapInUse_
     * @private
     * @type {?aeris.maps.Map}
    */
    this.mapInUse_ = null;

    /**
     * @property model
     * @protected
     * @type {aeris.Model}
     */
    this.model = options.model;


    Events.call(this);

    /**
     * @event map:use
     * @param {aeris.interactive.application.controllers.MapObjectController} mapObject
     * @param {aeris.maps.Map} map
     */
  };
  _.extend(MapObjectController.prototype, Events.prototype);


  /**
   * @method useMap
   * @param {aeris.maps.Map} map
   */
  MapObjectController.prototype.useMap = function(map) {
    this.mapInUse_ = map;

    this.trigger('map:use', this, map);
  };


  /**
   * @method render
   */
  MapObjectController.prototype.render = function() {
    if (this.mapInUse_) {
      this.mapObject_.setMap(this.mapInUse_);
    }

    // Remove existing 'map:use' binding, so
    // we don't bind multiple times on mutliple calls
    // to render
    this.stopListening(this, 'map:use');

    this.listenTo(this, 'map:use', function(mapObject, map) {
      this.mapObject_.setMap(map);
    });

    this.trigger('render');
  };


  /**
   * @method hide
   */
  MapObjectController.prototype.hide = function() {
    this.mapObject_.setMap(null);

    this.stopListening(this, 'map:use');
  };


  /**
   * @method destroy
   */
  MapObjectController.prototype.destroy = function() {
    this.hide();
    this.stopListening();

    this.trigger('close');
  };


  /**
   * Alias for `destroy`
   *
   * @method close
   */
  MapObjectController.prototype.close = function() {
    this.destroy();
  };


  return MapObjectController;
});
