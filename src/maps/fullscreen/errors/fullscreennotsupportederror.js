define([
  'aeris/errors/errortypefactory'
], function(ErrorTypeFactory) {
  /**
   * @class FullscreenNotSupportedError
   * @namespace aeris.interactive.maps.fullscreen.errors
   * @extends aeris.errors.AbstractError
  */
  return new ErrorTypeFactory({
    name: 'FullscreenNotSupportedError'
  });
});
