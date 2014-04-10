define([
  'aeris/util',
  'aeris/interactive/application/controllers/itemcontroller',
  'aeris/config',
  'hbars!aeris/interactive/maps/layers/views/legend.html',
  'aeris/interactive/maps/config/translate/mapobjecttypes'
], function(_, ItemController, aerisConfig, legendTemplate, mapObjectTypesLookup) {
  /**
   * @class LegendController
   * @namespace aeris.interactive.maps.layers.controllers
   * @extends aeris.interactive.application.controllers.ItemController
   *
   * @constructor
   *
   * @param {Object} options
   * @param {string} options.urlTemplate Template for location of legend image url,
   *        where {id} is the model id (converted to lowercase).
   * @param {string} options.urlTemplateRetina
   */
  var LegendController = function(options) {
    _.defaults(options, {
      urlTemplate: aerisConfig.get('assetPath') + 'legends/{id}.png',
      urlTemplateRetina: aerisConfig.get('assetPath') + 'legends/{id}@2x.png',
      templateHelpers: {},
      className: 'aeris-item-opt-legend',
      template: legendTemplate
    });

    _.defaults(options.templateHelpers, {
      url: function() {
        var isRetina = (window.devicePixelRatio === 2);
        var url = isRetina ? options.urlTemplate : options.urlTemplateRetina;

        return _.template(url, { id: this.id.toLowerCase() });
      },
      type: function() {
        return mapObjectTypesLookup[this.id];
      }
    });

    ItemController.call(this, options);


    this.listenTo(this, 'render', this.renderLegendImage_);
  };
  _.inherits(LegendController, ItemController);


  /**
   * @method serializeData
   * @protected
   */
  LegendController.prototype.serializeData = function() {
    var data = ItemController.prototype.serializeData.call(this);
    data.id = this.model.id;

    return data;
  };

  return LegendController;
});
