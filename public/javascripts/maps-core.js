      var overlay = [];
      USGSOverlay.prototype = new google.maps.OverlayView();

      // Initialize the map and the custom overlay.

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3.5,
          center: new google.maps.LatLng(-25.783195, -55.491477),
          mapTypeId: 'terrain'
        });

        var boundsAr = new google.maps.LatLngBounds(
            new google.maps.LatLng(-35.675147, -68.542969));

        var boundsCl = new google.maps.LatLngBounds(
            new google.maps.LatLng(-27.447487, -74.673676));        

        var boundsCo = new google.maps.LatLngBounds(
            new google.maps.LatLng(2.970868, -74.297333));        

        var boundsEc = new google.maps.LatLngBounds(
            new google.maps.LatLng(10.500000, -66.916664));        

        var boundsPe = new google.maps.LatLngBounds(
            new google.maps.LatLng(-13.189967, -76.015152));
      
        var boundsEc = new google.maps.LatLngBounds(
            new google.maps.LatLng(-1.831239, -81.183406));                

        var boundsBo = new google.maps.LatLngBounds(
            new google.maps.LatLng(-17.290154, -67.588653));

        var boundsPa = new google.maps.LatLngBounds(
            new google.maps.LatLng(-23.842503, -58.443832));        
        
        var boundsUr = new google.maps.LatLngBounds(
            new google.maps.LatLng(-33.522779, -57.765835));

        var boundsBr = new google.maps.LatLngBounds(
            new google.maps.LatLng(-9.433773, -58.625290));        

        var boundsMar = new google.maps.LatLngBounds(
            new google.maps.LatLng(-13.189967, -98.015152));

        var list = ['ar', 'br', 'cl', 'co', 'ec', 'pa', 'pe', 'bo', 'ur'];

        // The custom USGSOverlay object contains the circles with population data,
        // the bounds of the circles, and a reference to the map.
        overlay = new USGSOverlay(boundsAr, list[0], map);
        overlay = new USGSOverlay(boundsBr, list[1], map);
        overlay = new USGSOverlay(boundsCl, list[2], map);
        overlay = new USGSOverlay(boundsCo, list[3], map);
        overlay = new USGSOverlay(boundsEc, list[4], map);
        overlay = new USGSOverlay(boundsPa, list[5], map);
        overlay = new USGSOverlay(boundsPe, list[6], map);
        overlay = new USGSOverlay(boundsBo, list[7], map);
        overlay = new USGSOverlay(boundsUr, list[8], map);
        overlay = new USGSOverlay(boundsMar, 'mar', map);
      }

      /** @constructor */
      function USGSOverlay(bounds, country, map) {

        // Initialize all properties.
        this.bounds_ = bounds;
        this.country_ = country;
        this.map_ = map;

        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;

        // Explicitly call setMap on this overlay.
        this.setMap(map);
      }

      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */
      USGSOverlay.prototype.onAdd = function() {

        
        var divMain = document.getElementById(this.country_);

        this.div_ = divMain;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(divMain);
      };

      USGSOverlay.prototype.draw = function() {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
      };

      // The onRemove() method will be called automatically from the API if
      // we ever set the overlay's map property to 'null'.
      USGSOverlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };

      google.maps.event.addDomListener(window, 'load', initMap);