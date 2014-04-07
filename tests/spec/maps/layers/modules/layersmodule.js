define([
  'aeris/util',
  'aim/maps/layers/modules/layersmodule',
  'tests/mocks/application/controllers/controllerinterface',
  'aeris/model',
  'aeris/collection',
  'aeris/events'
], function(_, LayersModule, MockController, Model, Collection, Events) {

  describe('LayersModule', function() {
    var layersModule;
    var controlsController, builderOptions, moduleState, eventHub;

    beforeEach(function() {
      controlsController = new MockController();
      builderOptions = new Model({
        layers: []
      });
      moduleState = new Collection();
      eventHub = new Events();

      layersModule = new LayersModule({
        controlsController: controlsController,
        moduleState: moduleState,
        eventHub: eventHub
      });
    });


    describe('start', function() {

      it('should emit a \'mapControls:ready\' event with the controlsController', function() {
        var onMapControlsReady = jasmine.createSpy('onMapControlsReady');
        eventHub.on('mapControls:ready', onMapControlsReady);
        layersModule.start(builderOptions);

        expect(onMapControlsReady).toHaveBeenCalledWith(controlsController, 'layers');
      });

      it('should populate the module state with the \'layers\' builder option ', function() {
        var mockLayerModelA = new Model(), mockLayerModelB = new Model();

        builderOptions.set('layers', [
          mockLayerModelA,
          mockLayerModelB
        ]);

        layersModule.start(builderOptions);

        expect(moduleState.contains(mockLayerModelA));
        expect(moduleState.contains(mockLayerModelB));
      });

    });

  });

})
;
