define([
  'aeris/util',
  'marionette',
  'aeris/interactive/application/controllers/togglecontroller'
], function(_, Marionette, ToggleController) {
  /**
   * Controls a collection of map object {aeris.interactive.application.controllers.ToggleController}
   * views.
   *
   * @class ToggleCollectionController
   * @namespace aeris.interactive.application.controllers
   * @extends Marionette.CompositeView
   *
   * @param {Object} options
   * @param {aeris.interactive.application.forms.collections.ToggleCollection} options.collection
   *        Required.
   * @param {aeris.interactive.maps.core.controllers.MapObjectToggleController=} options.itemView
   * @constructor
   */
  var ToggleCollectionController = function(options) {
    options = _.defaults(options, {
      itemView: ToggleController,

      // Allows the controller to act as a
      // simple CollectionController
      template: function() { return '<div></div>'; }
    });

    /**
     * @property collection
     * @type {aeris.interactive.application.forms.collections.ToggleCollection}
     */

    /**
     * @property itemView
     * @type {aeris.interactive.application.controllers.ToggleController}
     */

    Marionette.CompositeView.call(this, options);
  };
  _.inherits(ToggleCollectionController, Marionette.CompositeView);


  return ToggleCollectionController;
});
