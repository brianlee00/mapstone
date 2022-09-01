import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';


mapboxgl.accessToken = 'pk.eyJ1IjoicmFlYmFlIiwiYSI6ImNsN2U3MGZtZzAwMWczb3J6dDJxMW5ndDgifQ.iUi9IT62BG9NNwGDVOrU8Q';



function Map() {
	mapboxgl.accessToken = 'pk.eyJ1IjoicmFlYmFlIiwiYSI6ImNsN2U3MGZtZzAwMWczb3J6dDJxMW5ndDgifQ.iUi9IT62BG9NNwGDVOrU8Q';
  const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [project, setProject] = useState('');
    
  useEffect(() => {
    if (map.current) {return};
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
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
        data.map(project => {
          setProject(project);
          fetch(`http://localhost:8080/api/location/${project.locationId}`)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              return Promise.reject(`Unexpected status code: ${response.status}`);
            }
          })
          .then(data =>
            mapboxClient.forwardGeocode({
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

                const popupText = `<div>Description: ${project.description}</div>
                  <div>Type: ${convertType(project.projectType)}</div>
                  <a href="/projectdetails/${project.projectId}">Details</a>`;
                const popup = new mapboxgl.Popup({ closeOnClick: false, closeOnMove: false })
                .setLngLat(feature.center)
                .setHTML(popupText)
                .addTo(map.current);
                
                const colorCode = convertStatusToColor(project.status);
                new mapboxgl.Marker({
                  color: colorCode
                }).setLngLat(feature.center).setPopup(popup).addTo(map.current);
              })
          );
        })
      )
      .catch(console.log);
    }, []);

  return (
    <div ref={mapContainer} className="map-container" />
  );
}


function convertType(input) {
  if (input == "RES") {
      return "Residential"
  }
  if (input == "IND") {
      return "Industrial"
  }
  if (input == "IND") {
      return "Industrial"
  }
  if (input == "COM") {
      return "Commercial"
  }
  if (input == "AGR") {
      return "Agricultural"
  }
  if (input == "REC") {
      return "Recreational"
  }
  if (input == "INS") {
      return "Institutional"
  }
  if (input == "TRA") {
      return "Transportation"
  }
  if (input == "MIX") {
      return "Mixed-Urban"
  }
  if (input == "NAT") {
      return "Natural"
  }
}

function convertStatusToColor(status) {
  var colorCode = "";
  if (status === "PRO") {
    colorCode = "#00B9FF";
  } else if (status === "REV") {
    colorCode = "#FFF300";
  } else if (status === "APP") {
    colorCode = "#8B00FF";
  } else if (status === "CON") {
    colorCode = "#FFAA00";
  } else if (status === "COM") {
    colorCode = "#51FF00";
  } else if (status === "CAN") {
    colorCode = "#FF0000";
  }
  return colorCode;
}

export default Map;
