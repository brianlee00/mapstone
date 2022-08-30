import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import React, { useRef, useEffect, useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoicmFlYmFlIiwiYSI6ImNsN2U3MGZtZzAwMWczb3J6dDJxMW5ndDgifQ.iUi9IT62BG9NNwGDVOrU8Q';



function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-74.0060);
    const [lat, setLat] = useState(40.7128);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });


    return (
        <>
            <div>
                <div className="bottom">
                    {/* Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}
                </div>
                <div ref={mapContainer} className="map-container" />
            </div>
        </>
    );
}

export default Map;

