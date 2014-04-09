define([
  'aeris/util',
  'aeris/interactive/application/controllers/itemcontroller',
  'aeris/interactive/application/templatehelpers/i18n'
], function(_, ItemController, i18n) {
  /**
   * Controls the marker details view.
   *
   * @class MarkerInfoController
   * @namespace aeris.interactive.maps.markers.controllers
   * @extends aeris.interactive.application.controllers.ItemController
   *
   * @constructor
   * @override
   *
   * @param {string|Function} options.template Required.
   */
  var MarkerInfoController = function(options) {
    /**
     * @property model
     * @type {aeris.api.models.PointData}
     */
    options = _.defaults(options || {}, {
      handlebarsHelpers: {
        i18n: i18n
      }
    });


    ItemController.call(this, options);
  };
  _.inherits(MarkerInfoController, ItemController);


  return MarkerInfoController;
});
