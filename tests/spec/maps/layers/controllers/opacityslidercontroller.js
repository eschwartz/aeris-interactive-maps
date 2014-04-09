define([
  'aeris/util',
  'aeris/interactive/maps/layers/controllers/opacityslidercontroller',
  'aeris/model'
], function(_, OpacitySliderController, Model) {

  describe('OpacitySliderController', function() {
    var opacitySliderController;
    var SLIDER_VALUE_STUB = 12.3454321;
    var model;

    beforeEach(function() {
      spyOn(OpacitySliderController.prototype, 'getValue').andReturn(SLIDER_VALUE_STUB);

      model = new Model();
      opacitySliderController = new OpacitySliderController({
        model: model
      });
    });


    describe('binding to model', function() {


      describe('before render', function() {


        it('should not change the model\'s opacity', function() {
          expect(model.get('opacity')).not.toEqual(SLIDER_VALUE_STUB / 100);
        });


      });

      describe('on render', function() {

        beforeEach(function() {
          opacitySliderController.render();
        });


        it('should set the model\'s opacity to the slider\'s value', function() {
          expect(model.get('opacity')).toEqual(SLIDER_VALUE_STUB / 100);
        });


        describe('when the slider value changes', function() {

          it('should update the model\'s opacity from the slider value, whenever the value changes', function() {
            var CHANGED_SLIDER_VALUE_STUB = SLIDER_VALUE_STUB + 9.876;
            opacitySliderController.getValue.andReturn(CHANGED_SLIDER_VALUE_STUB);

            opacitySliderController.trigger('change');

            expect(model.get('opacity')).toEqual(CHANGED_SLIDER_VALUE_STUB / 100);
          });

        });

      });

    });

  });

});
