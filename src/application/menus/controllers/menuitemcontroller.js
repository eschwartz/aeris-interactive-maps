define([
  'aeris/util',
  'marionette',
  'hbars!aeris/interactive/application/menus/views/menuitem.html'
], function(_, Marionette, menuItemView) {
  /**
   * A MenuItemController
   * - Binds to a {aeris.interactive.application.forms.models.Toggle} model
   * - The sub-menu corresponds to the Toggle model's childCollection attribute
   * - The sub-menu is a MenuController
   *
   * @class MenuItemController
   * @namespace aeris.interactive.application.menus.controllers
   * @extends Marionette.CompositeView
   *
   * @constructor
   * @override
   *
   * @param {string} opt_options.childCollectionAttribute
   */
  var MenuItemController = function(opt_options) {
    var options = _.defaults(opt_options || {}, {
      className: 'aeris-menuItem',
      template: menuItemView,
      itemViewContainer: '.aeris-subMenu'
    });

    /**
     * @property model
     * @type {aeris.interactive.application.forms.models.RecursiveToggle}
     */

    /**
     * MenutItemController creates a recursive view structure.
     *
     * That is, for every model in it's collection, it
     * renders a new instance of itself.
     *
     * @property itemView
     * @type {aeris.interactive.application.menus.controllers.MenuItemController}
     */


    /**
     * The attribute of the model which defines
     *                  its child collection.
     *                  Defaults to 'childCollection'.
     *
     * @type {string}
     * @default 'childCollection'
     * @private
     * @property childCollectionAttribute_
     */
    this.childCollectionAttribute_ = options.childCollectionAttribute_;


    Marionette.CompositeView.call(this, options);
  };
  _.inherits(MenuItemController, Marionette.CompositeView);


  /**
   * @method initialize
   * @protected
   */
  MenuItemController.prototype.initialize = function() {
    // Define our collection as a child collection
    // of the model.
    this.collection = this.model.getChildCollection();
  };


  return MenuItemController;
});
