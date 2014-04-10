define([
  'aeris/util',
  'marionette',
  'aeris/interactive/application/controllers/itemcontroller'
], function(_, Marionette, ItemController) {
  var CollectionView = Marionette.CollectionView;
  /**
   * Renders a for bound to a {aeris.Collection}, using a specified
   * {aeris.interactive.application.controllers.ItemController}
   *
   * See Marionette.CollectionView documentation.
   *
   * @class CollectionController
   * @namespace aeris.interactive.application.controllers
   * @extends Marionette.CollectionView
   * @implements aeris.interactive.application.controllers.ControllerInterface
   *
   * @constructor
   *
   * @param {Object} options
   * @param {aeris.Collection} options.collection
   * @param {Object.<string,aeris.interactive.application.controllers.ControllerInterface>} options.itemControllerLookup A map of controllers to use,
   *        based on the model id.
   */
  var CollectionController = function(options) {
    _.defaults(options, {
      itemView: ItemController,
      itemControllerLookup: {}
    });

    /**
     * @property itemControllerLookup_
     * @private
     * @type {Object}
     */
    this.itemControllerLookup_ = options.itemControllerLookup;


    CollectionView.call(this, options);
  };
  _.inherits(CollectionController, CollectionView);


  /**
   * Overrides {Marionette.CollectionView}#getItemView
   *
   * @method getItemView
   * @protected
   * @param {aeris.Model} model
   */
  CollectionController.prototype.getItemView = function(model) {
    return this.itemControllerLookup_[model.id] || this.options.itemView;
  };


  return CollectionController;
});
