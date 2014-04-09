define([
  'aeris/interactive/config/i18n/labels'
], function(labels) {
  var i18n = function(key) {
    return labels[key] || key;
  };

  return i18n;
});
