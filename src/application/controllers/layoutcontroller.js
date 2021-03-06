define([
  'aeris/util',
  'marionette',
  'aim/application/controllers/mixins/viewmixin',
  'aeris/errors/invalidargumenterror',
  'aim/application/controllers/templatehelperregistrars/handlebarstemplatehelperregistrar'
], function(_, Marionette, ViewMixin, InvalidArgumentError, HandlebarsTemplateHelperRegistrar) {
  /**
   * An Aeris extension of Marionette.Layout.
   *
   * Extended functionality
   * - Accepts ui, events, and regions in constructor options
   * - Accepts a regionControllers option,
   *   to simplify rendering controllers within regions
   *
   * @class LayoutController
   * @namespace aeris.application.controllers
   * @extends Marionette.Layout
   * @uses aeris.application.controllers.ViewMixin
   *
   * @constructor
   * @override
   *
   * @param {Object=} opt_options
   * @param {Object=} opt_options.ui
   * @param {Object.<string, string>=} opt_options.regions Named regions to add to the layout.
   * @param {Object.<string,Backbone.View>=} opt_options.regionControllers A hash of controllers to render in regions.
   */
  var LayoutController = function(opt_options) {
    var options = _.defaults(opt_options || {}, {
      ui: {},
      events: {},
      regions: {},
      regionControllers: {}
    });


    /**
     * DOM UI alias definitions
     *
     * See Marionette.View documentation.
     *
     * @override
     * @property ui
     */
    this.ui = _.defaults(options.ui, this.ui);


    /**
     * Layout regions definitions.
     * See Marionette.Layout documentation.
     *
     * @override
     * @type {Object.<string, string>}
     * @property regions
     */
    this.regions = _.defaults(options.regions, this.regions);


    /**
     * A hash of controllers to render in regions.
     *
     * @type {Object.<string,Backbone.View>} As { 'regionName': controllerInstance }
     * @private
     * @property regionControllers_
     */
    this.regionControllers_ = _.defaults(options.regionControllers, this.regionControllers_);


    /**
     * @override
     * @type {Object.<string,string|Function>} Backbone events hash.
     * @property events
     */
    this.events = _.defaults(options.events, this.events);


    /**
     * @type {aeris.application.controllers.templatehelperregistrars.TemplateHelperRegistrarInterface}
     * @private
     * @property templateHelperService_
     */
    this.templateHelperService_ = options.templateHelperService_ || new HandlebarsTemplateHelperRegistrar();


    Marionette.Layout.call(this, options);
    ViewMixin.call(this, options);


    // Render layout controllers when Layout is rendered.
    this.listenTo(this, 'render', this.renderRegionControls_);
  };
  _.inherits(LayoutController, Marionette.Layout);
  _.extend(LayoutController.prototype, ViewMixin);


  /**
   * Show a controller in the specified
   * region.
   *
   * @throws {aeris.errors.InvalidArgumentError} If region is not available.
   *
   * @param {Backbone.View} controller Object must have a `render` method.
   * @param {string} regionName
   * @method showInRegion
   */
  LayoutController.prototype.showInRegion = function(controller, regionName) {
    if (!this[regionName] || !(this[regionName] instanceof Marionette.Region)) {
      throw new InvalidArgumentError('Unable to show controller in region ' +
        '\'' + regionName + '\'. Region has not been renderered, ' +
        'or does not exist..');
    }

    this[regionName].show(controller);
  };


  /**
   * Render controllers and show in layouts, as defined in
   * this.regionControllers_.
   *
   * @private
   * @method renderRegionControls_
   */
  LayoutController.prototype.renderRegionControls_ = function() {
    _.each(this.regionControllers_, function(controller, regionName) {
      this.showInRegion(controller, regionName);
    }, this);
  };


  /**
   * @method hideAllRegions
   */
  LayoutController.prototype.hideAllRegions = function() {
    _.each(this.regions, function(regionSelector) {
      this.$el.find(regionSelector).hide();
    }, this);
  };


  return LayoutController;
});
