define({
  $exports: {
    map: { wire: 'aeris/interactive/maps/map/config/module' },

    mapControls: { wire: 'aeris/interactive/routes/mapcontrols/config/module' },

    markers: { wire: 'aeris/interactive/maps/markers/config/module' },
    layers: { wire: 'aeris/interactive/maps/layers/config/module' },
    infoPanel: { wire: 'aeris/interactive/maps/infopanel/config/module'},
    geosearch: { wire: 'aeris/interactive/maps/geosearch/config/module' },
    modal: { wire: 'aeris/interactive/maps/modal/config/module' },

    routeBuilder: { wire: 'aeris/interactive/routes/routebuilder/config/module' }
  }
});
