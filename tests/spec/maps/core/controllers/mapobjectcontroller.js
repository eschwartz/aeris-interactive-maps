define([
  'aeris/util',
  'aim/maps/core/controllers/mapobjectcontroller',
  'aeris/mocks/mapobject',
  'aeris/mocks/aeris/maps/map',
  'aeris/mocks/aeris/toggle'
], function(_, MapObjectController, MockMapObject, MockMap, MockToggle) {

  var MockMapState = function(opt_attrs, opt_options) {
    MockMapObject.call(this, opt_attrs, opt_options);
  };
  _.inherits(MockMapState, MockMapObject);


  describe('MapObjectController', function() {
    var mapObjectController;
    var mockMapState, mockMap, mockMapObject, model;

    beforeEach(function() {
      mockMapObject = new MockMapObject();
      mockMapState = new MockMapState();
      mockMap = new MockMap();
      model = new MockToggle();

      mapObjectController = new MapObjectController({
        mapObject: mockMapObject,
        mapState: mockMapState,
        model: model
      });
    });


    describe('binding to the mapState', function() {

      it('should use the current state of the mapState\'s map', function() {
        mockMapState.setMap(mockMap);

        mapObjectController.render();

        expect(mockMapObject.getMap()).toEqual(mockMap);
      });


      it('should use the mapState\'s map when it changes', function() {
        mapObjectController.render();

        mockMapState.setMap(mockMap);
        expect(mockMapObject.getMap()).toEqual(mockMap);

        mockMapState.setMap(null);
        expect(mockMapObject.getMap()).toBeNull();
      });

    });


    describe('binding to model (Toggle)', function() {

      beforeEach(function() {
        spyOn(MapObjectController.prototype, 'render');
        spyOn(MapObjectController.prototype, 'hide');
      });


      it('should render when the model is selected', function() {
        model.deselect();
        model.select();

        expect(mapObjectController.render).toHaveBeenCalled();
      });

      it('should render immediately if the model selected in init', function() {
        model.select();

        new MapObjectController({
          mapObject: mockMapObject,
          mapState: mockMapState,
          model: model
        });

        expect(MapObjectController.prototype.render).toHaveBeenCalled();
      });

      it('should hide when the model is deselected', function() {
        model.select();
        model.deselect();

        expect(mapObjectController.hide).toHaveBeenCalled();
      });

      it('should hide immediated if the model in deselected on init', function() {
        model.deselect();

        new MapObjectController({
          mapObject: mockMapObject,
          mapState: mockMapState,
          model: model
        });

        expect(MapObjectController.prototype.hide).toHaveBeenCalled();
      });

    });

  });

});
