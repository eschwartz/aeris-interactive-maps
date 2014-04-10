define([
  'aeris/util',
  'aeris/interactive/application/controllers/collectioncontroller',
  'aeris/interactive/maps/core/controllers/mapobjectcontroller'
], function(_, CollectionController, MapObjectController) {
  /**
   * @class MapObjectCollectionController
   * @namespace aeris.interactive.maps.core.controllers
   * @extends aeris.interactive.application.controllers.CollectionController
   *
   * @constructor
  */
  var MapObjectCollectionController = function(options) {
    _.defaults(options, {
      itemView: MapObjectController
    });

    CollectionController.call(this, options);

    // Child views are rendered when added to our collection,
    // but we need to make sure they're hidden if they're toggled off.
    // Otherwise, all child views will always start out visible
    // on render.
    this.listenTo(this, 'itemview:render', this.hideDeselectedChild_);
  };
  _.inherits(MapObjectCollectionController, CollectionController);


  /**
   * @method updateChildToggleState_
   * @private
   * @param {aeris.interactive.maps.core.controllers.MapObjectController} child
   */
  MapObjectCollectionController.prototype.hideDeselectedChild_ = function(child) {
    if (!child.model.isSelected()) {
      child.hide();
    }
  };


  return MapObjectCollectionController;
});
