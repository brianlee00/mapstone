import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import mapboxSdk from '@mapbox/mapbox-sdk';


mapboxgl.accessToken = 'pk.eyJ1IjoicmFlYmFlIiwiYSI6ImNsN2U3MGZtZzAwMWczb3J6dDJxMW5ndDgifQ.iUi9IT62BG9NNwGDVOrU8Q';



function Map() {
	mapboxgl.accessToken = 'pk.eyJ1IjoicmFlYmFlIiwiYSI6ImNsN2U3MGZtZzAwMWczb3J6dDJxMW5ndDgifQ.iUi9IT62BG9NNwGDVOrU8Q';
  const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
  const mapContainer = useRef(null);
  const map = useRef(null);
    
  useEffect(() => {
    if (map.current) {return};
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.0060, 40.7128],
      zoom: 10
    });
  });

  useEffect(() => {
    if (!map.current) {return};
    fetch('http://localhost:8080/api/project')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => 
        data.map(project =>
        fetch(`http://localhost:8080/api/location/${project.locationId}`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
      })
      .then(data =>
        mapboxClient.geocoding.forwardGeocode({
          query: data.address.concat(", ",data.city,", ",data.state," ",data.zipCode),
          autocomplete: false,
          limit: 10
        })
        .send()
        .then((response) => {
          if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length
          ) {
            console.error('Invalid response:');
            console.error(response);
            return;
          }
          const feature = response.body.features[0];
          // Create a marker and add it to the map.
          new mapboxgl.Marker().setLngLat(feature.center).addTo(map.current);
          const popup = new mapboxgl.Popup({ closeOnClick: false, closeOnMove: false })
            .setLngLat(feature.center)
            .setHTML('<h1>This Location Details</h1>')
            .addTo(map.current);
        })
      ))
      )
      .catch(console.log);
    })


  return (
    <div ref={mapContainer} className="map-container" />
  );
}

export default Map;
