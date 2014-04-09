define([
  'aeris/util',
  'aeris/interactive/maps/layers/controllers/layercontroller',
  'aeris/mocks/aeris/toggle',
  'aeris/mocks/mapobject'
], function(_, LayerController, MockToggle, MockMapObject) {
  
  describe('LayerController', function() {
    var layerController;
    var model, mapObject, mapState;


    function createLayerController(opt_options) {
      var options = _.defaults(opt_options || {}, {
        model: model,
        mapObject: mapObject,
        mapState: mapState
      });

      return new LayerController(options);
    }
    
    beforeEach(function() {
      model = new MockToggle();
      mapObject = new MockMapObject();
      mapState = new MockMapObject();

      layerController = createLayerController();
    });


    describe('binding to the model state', function() {

      describe('on init', function() {

        beforeEach(function() {
          // Create a fresh mapObject
          // which hasn't already been bound by the
          // global-scoped layer controller
          mapObject = new MockMapObject();
        });


        it('should bind the map object opacity to the model', function() {
          var OPACITY_STUB = 0.12345;
          var layerController;
          
          model.set('opacity', OPACITY_STUB);
          layerController = createLayerController({
            mapObject: mapObject
          });
          
          expect(mapObject.get('opacity')).toEqual(OPACITY_STUB);
        });

        it('should bind the map object zIndex to the model', function() {
          var Z_INDEX_STUB = 0.12345;
          var layerController;

          model.set('zIndex', Z_INDEX_STUB);
          layerController = createLayerController({
            mapObject: mapObject
          });

          expect(mapObject.get('zIndex')).toEqual(Z_INDEX_STUB);
        });

      });

      it('should bind the map object opacity to the model', function() {
        var OPACITY_STUB = 0.12345;

        model.set('opacity', OPACITY_STUB);

        expect(mapObject.get('opacity')).toEqual(OPACITY_STUB);
      });

      it('should bind the map object zIndex to the model', function() {
        var Z_INDEX_STUB = 0.12345;

        model.set('zIndex', Z_INDEX_STUB);

        expect(mapObject.get('zIndex')).toEqual(Z_INDEX_STUB);
      });

    });

  });
  
});
