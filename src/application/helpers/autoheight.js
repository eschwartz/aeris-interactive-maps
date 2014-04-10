define(function() {
  /**
   * @method autoHeight
   * @namespace aeris.interactive.application.helpers
   * @param {HTMLElement|jQuery} el
   * @return {number} The full height of the element, with height=auto.
   */
  return function autoHeight(el) {
    var $clone = $(el).clone();
    var height;

    // remove id attribute, so we do not have multiple els with the same id
    // of course, this assumes there are no id-based
    // css style rules
    $clone.attr('id', false);

    $clone.
      css({
        display: 'block',
        visibility: 'hidden',
        height: 'auto'
      }).
      appendTo('body');

    height = $clone.outerHeight(true);

    $clone.remove();

    return height;
  };
});
