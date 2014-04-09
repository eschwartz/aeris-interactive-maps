define([
  'aeris/util',
  'jquery',
  'aeris/interactive/application/controllers/togglecontroller',
  'aeris/interactive/maps/config/menuiconlookup'
], function(_, $, ToggleController, menuIconLookup) {
  /**
   * Controls a view with UI controls to manipulate a map object.
   *
   * @class MapObjectControlsController
   * @namespace aeris.interactive.maps.core.controllers
   * @extends aeris.interactive.application.controllers.ToggleController
   *
   * @constructor
   *
   * @param {Object} options
   *
   * @param {Object} options.ui
   * @param {string} options.ui.toggleBtn The button used to toggle on/off the map object.
   * @param {string} options.ui.controlsRegion The region in which component controls are rendered.
   *
   * @param {Array.<function():aeris.interactive.application.controllers.ControllerInterface>} options.controls Constructors for
   *        component controls.
   */
  var MapObjectControlsController = function(options) {
    _.defaults(options, {
      templateHelpers: {},
      ui: {},
      controls: []
    });

    _.defaults(options.templateHelpers, {
      iconClass: function() {
        return menuIconLookup[this.id] || 'aeris-icon-stack';
      },
      label: function() {
        return this.id;
      }
    });

    _.defaults(options.ui, {
      toggleBtn: 'button',
      controlsRegion: '.aeris-menu-item-opts'
    });

    /**
     * Describes the current state of the
     * map object.
     *
     * @property model
     * @private
     * @type {aeris.interactive.application.forms.models.Toggle}
     */

    ToggleController.call(this, options);

    this.listenTo(this, 'render', function() {
      options.controls.forEach(function(Controller) {
        this.addControls(Controller);
      }, this);
    });
  };
  _.inherits(MapObjectControlsController, ToggleController);


  /**
   * @method renderControls_
   * @private
   * @param {function():aeris.interactive.application.controllers.ControllerInterface} Controller Controller constructor
   */
  MapObjectControlsController.prototype.addControls = function(Controller) {
    var controller = new Controller({
      model: this.model
    });

    if (!(this.ui.controlsRegion instanceof $)) {
      throw new Error('Unable to add controls: MapObjectControlsController has not yet been rendered');
    }

    controller.render();
    controller.$el.appendTo(this.ui.controlsRegion);
  };


  /**
   * See {Marionette.View}#serializeData
   * @method serializeData
   * @protected
   */
  MapObjectControlsController.prototype.serializeData = function() {
    var data = ToggleController.prototype.serializeData.call(this);

    // Add model id to data
    // (for cases where a custom idAttribute is defined)
    data.id = this.model.id;

    return data;
  };


  return MapObjectControlsController;
});
