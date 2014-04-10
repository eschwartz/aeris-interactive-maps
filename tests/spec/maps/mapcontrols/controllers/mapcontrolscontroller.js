define([
  'aeris/util',
  'aeris/interactive/maps/mapcontrols/controllers/mapcontrolscontroller',
  'aeris/events',
  'aeris/model',
  'aeris/interactive/application/controllers/layoutcontroller',
  'jquery',
  'marionette'
], function(_, MapControlsController, Events, Model, LayoutController, $, Marionette) {

  var MockBuilderOptions = function(opt_attrs) {
    var opts = new Model(opt_attrs);

    return opts;
  };


  var MockController = function() {
    var controller = { id: _.uniqueId('mockController_')};

    controller.$el = { id: _.uniqueId('mockController.$el_')};

    return controller;
  };


  var MockRegion = function() {
    spyOn(this, 'show');
    spyOn(this, 'close');

    this.$el = $('<div></div>');
  };
  _.inherits(MockRegion, Marionette.Region);


  describe('A MapControlsController', function() {
    var templateFn;

    beforeEach(function() {
      templateFn = function() { return 'foo'; };
    });


    describe('renderControlsView', function() {

      it('should render the controls view in a region', function() {
        var mapOptionControls, geosearchControls;
        var controlsController = new MapControlsController({
          eventHub: new Events(),
          builderOptions: new MockBuilderOptions(),
          regions: {
            mapOptionControlsRegion: '.someSelector',
            geosearchControlsRegion: '.someOther .selector'
          },
          controlsRegionLookup: {
            mapOptionControlsView: 'mapOptionControlsRegion',
            geosearchControlsView: 'geosearchControlsRegion'
          }
        });

        // Mock layout regions
        controlsController.mapOptionControlsRegion = new MockRegion();
        controlsController.geosearchControlsRegion = new MockRegion();

        // Mock controls
        mapOptionControls = new MockController();
        geosearchControls = new MockController();

        controlsController.renderControlsView(mapOptionControls, 'mapOptionControlsView');
        expect(controlsController.mapOptionControlsRegion.show).toHaveBeenCalledWith(mapOptionControls);

        controlsController.renderControlsView(geosearchControls, 'geosearchControlsView');
        expect(controlsController.geosearchControlsRegion.show).toHaveBeenCalledWith(geosearchControls);
      });

      it('should throw an error if the region doesn\'t exist', function() {
        var controller = new MapControlsController({
          eventHub: new Events(),
          builderOptions: new MockBuilderOptions(),
          controlsRegions: {}
        });
        var controls = new MockController();

        expect(function() {
          controller.renderControlsView(controls, 'someControlsView');
        }).toThrowType('InvalidArgumentError');
      });

    });

  });

});
