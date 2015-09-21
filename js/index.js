var map, measureControl, navi_control;

function measureOn() {
    measureControl.activate();
}

function measureOff() {
    measureControl.deactivate();
}

function printOutput(e) {
    var length = (e.measure).toFixed(2);
    var output = length + ' ' + e.units;
    $('#length').html(output);
}

function init() {
    
	navi_control=new OpenLayers.Control.TouchNavigation(
		{
			defaultDblClick: function(event) { console.log("event") }
			
		}
		);
	
	map = new OpenLayers.Map('map', {
        allOverlays: false,
        autoUpdateSize: true,
        displayProjection: new OpenLayers.Projection('EPSG:4326'),
        numZoomLevels: 16,
        projection: new OpenLayers.Projection('EPSG:900913'),
        zoomMethod: null,
        units: 'km',
		controls: 
		[
		navi_control
		
		]
    });
map.events.register("dblclick", map, function(){alert("scheidde");});
    var pointSymbolizer = {
        pointRadius: 4,
        graphicName: "square",
        fillColor: "white",
        fillOpacity: 1,
        strokeWidth: 1,
        strokeOpacity: 1,
        strokeColor: "#333333"
    };

    var lineSymbolizer = {
        strokeWidth: 3,
        strokeOpacity: 1,
        strokeColor: "#666666",
        strokeDashstyle: "dash"
    };

    var measureControlOptions = {
        immediate: true,
        geodesic: true,
        handlerOptions: {
            maxVertices: 2,
            layerOptions: {
                renderers: ['SVG'],
                styleMap: new OpenLayers.StyleMap({
                    'default': new OpenLayers.Style({
                        rules: [
                            {
                                symbolizer: {Point: pointSymbolizer, Line: lineSymbolizer}
                            }
                        ]
                    })
                })
            }
        }
    };

    measureControl = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, measureControlOptions);

    //map.addControl(measureControl);
	
	var control = new MobileMeasure();
    map.addControl(control);

   /*
   measureControl.events.register('measure', measureControl, function(e) {
        printOutput(e);
    });

    measureControl.events.register('measurepartial', measureControl, function(e) {
        printOutput(e);
    });

	*/
	var control = new MobileMeasure();
    map.addControl(control);
	
    var osm = new OpenLayers.Layer.OSM();

    map.addLayer(osm);
	
	
	
	
	
    var center = new OpenLayers.LonLat(13.446632, 52.493962);
    center.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'));
    var zoomLevel = 18;
    map.setCenter(center, zoomLevel);
}