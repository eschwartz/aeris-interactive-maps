define([
  'aeris/util',
  'aeris/interactive/maps/core/controllers/mapobjectcontroller',
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


    describe('binding to model toggle state', function() {

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


    describe('binding to model attributes', function() {
      var ATTR_A_STUB = 'ATTR_A_STUB';
      var ATTR_B_STUB = 'ATTR_B_STUB';

      beforeEach(function() {
        mockMapObject = new MockMapObject();
        mockMapObject.set({
          attrA: ATTR_A_STUB,
          attrB: ATTR_B_STUB
        });

        mapObjectController = new MapObjectController({
          mapObject: mockMapObject,
          mapState: mockMapState,
          model: model,
          boundAttributes: ['attrA', 'attrB']
        });
      });


      it('should set the initial model state using the map object\'s bound attributes', function() {
        expect(model.get('attrA')).toEqual(ATTR_A_STUB);
        expect(model.get('attrB')).toEqual(ATTR_B_STUB);
      });

      describe('when bound model attributes change', function() {
        var CHANGED_ATTR_A_STUB = 'CHANGED_ATTR_A_STUB';
        var CHANGED_ATTR_B_STUB = 'CHANGED_BTTR_A_STUB';


        it('should update the mapObject with the model attribute values', function() {
          model.set('attrA', CHANGED_ATTR_A_STUB);
          expect(mockMapObject.get('attrA')).toEqual(CHANGED_ATTR_A_STUB);

          model.set('attrB', CHANGED_ATTR_B_STUB);
          expect(mockMapObject.get('attrB')).toEqual(CHANGED_ATTR_B_STUB);
        });

      });

      describe('when not-bound model attributes change', function() {
        var NOT_BOUND_ATTR_STUB = 'NOT_BOUND_ATTR_STUB';

        it('should not update the mapObject', function() {
          model.set('notBoundAttr', NOT_BOUND_ATTR_STUB);
          expect(mockMapObject.get('notBoundAttr')).not.toEqual(NOT_BOUND_ATTR_STUB);
        });

      });


    });

  });

});
