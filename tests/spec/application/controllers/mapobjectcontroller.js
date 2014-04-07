define([
  'aeris/util',
  'aim/application/controllers/mapobjectcontroller',
  'aeris/mocks/mapobject',
  'aeris/mocks/aeris/maps/map'
], function(_, MapObjectController, MockMapObject, MockMap) {


  describe('MapObjectController', function() {
    var mapObjectController;
    var mockMap, mockMapObject;

    beforeEach(function() {
      mockMapObject = new MockMapObject();
      mockMap = new MockMap();

      mapObjectController = new MapObjectController({
        mapObject: mockMapObject
      });
    });

    describe('render', function() {


      describe('when no map has been set with useMap', function() {

        it('should not set the map object to the map', function() {
          mapObjectController.render();
          expect(mockMapObject.getMap()).toBeNull();
        });

      });

      describe('when a map has been set with useMap', function() {

        beforeEach(function() {
          mapObjectController.useMap(mockMap);
        });

        it('should set the map object to the map', function() {
          mapObjectController.render();
          expect(mockMapObject.getMap()).toEqual(mockMap);
        });

      });

      describe('when useMap is called after render', function() {

        beforeEach(function() {
          mapObjectController.render();
          mapObjectController.useMap(mockMap);
        });


        it('should set the map object to the map', function() {
          expect(mockMapObject.getMap()).toEqual(mockMap);
        });


      });

    });

    describe('hide', function() {

      beforeEach(function() {
        mapObjectController.useMap(mockMap);
        mapObjectController.render();
      });


      it('should set the map object map to null', function() {
        mapObjectController.hide();

        expect(mockMapObject.getMap()).toBeNull();
      });

      it('should not set a map to the map object when useMap is called', function() {
        mapObjectController.hide();
        mapObjectController.useMap(new MockMap());

        expect(mockMapObject.getMap()).toBeNull();
      });

      it('should not effect the way render is called', function() {
        var mockMapA = new MockMap(), mockMapB = new MockMap();

        mapObjectController.useMap(mockMapA);

        mapObjectController.hide();

        mapObjectController.render();
        expect(mockMapObject.getMap()).toEqual(mockMapA);

        mapObjectController.useMap(mockMapB);
        expect(mockMapObject.getMap()).toEqual(mockMapB);
      });

    });

    describe('destroy', function() {

      beforeEach(function() {
        spyOn(mapObjectController, 'hide');
      });


      it('should hide the map object', function() {
        mapObjectController.destroy();

        expect(mapObjectController.hide).toHaveBeenCalled();
      });

      it('should remove all event binding from the map object', function() {
        spyOn(mapObjectController, 'stopListening');

        mapObjectController.destroy();

        expect(mapObjectController.stopListening).toHaveBeenCalled();
      });

    });

    describe('close', function() {

      beforeEach(function() {
        spyOn(mapObjectController, 'destroy');
      });


      // Close is an alias for destroy
      it('should destroy the map object', function() {
        mapObjectController.close();

        expect(mapObjectController.destroy).toHaveBeenCalled();
      });

    });

    describe('render', function() {
      var onRender;

      beforeEach(function() {
        onRender = jasmine.createSpy('onRender');
        mapObjectController.on('render', onRender);
      });

      it('should emit when the controller is rendered', function() {
        mapObjectController.render();

        expect(onRender).toHaveBeenCalled();
      });

    });

    describe('close', function() {
      var onClose;

      beforeEach(function() {
        onClose = jasmine.createSpy('onClose');
        mapObjectController.on('close', onClose);
      });

      it('should emit when the controller is closed', function() {
        mapObjectController.close();

        expect(onClose).toHaveBeenCalled();
      });

      it('should emit when the controller is destroyed', function() {
        mapObjectController.destroy();

        expect(onClose).toHaveBeenCalled();
      });

    });

  });

});
