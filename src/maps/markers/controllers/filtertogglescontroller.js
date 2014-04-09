define([
  'aeris/util',
  'aeris/interactive/application/controllers/togglecollectioncontroller'
], function(_, ToggleCollectionController) {
  /**
   *
   * @class FilterTogglesController
   * @namespace aeris.interactive.maps.markers.controllers
   * @extends aeris.interactive.application.controllers.ToggleCollectionController
   *
   * @constructor
   * @override
   */
  var FilterTogglesController = function() {
    ToggleCollectionController.apply(this, arguments);
  };
  _.inherits(FilterTogglesController, ToggleCollectionController);


  return FilterTogglesController;
});
