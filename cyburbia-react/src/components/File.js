import mapboxSdk from '@mapbox/mapbox-sdk';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoicmFlYmFlIiwiYSI6ImNsN2U3MGZtZzAwMWczb3J6dDJxMW5ndDgifQ.iUi9IT62BG9NNwGDVOrU8Q';
    const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    var projects= [];
  var locations =[];
  const newObject = '';
  var some = [];
    function FileTest() {
    var arr = ["343 Legion Street, Brooklyn, New York 11212", "769 St Marks Avenue, Brooklyn, New York 11213 "];
    const map = new mapboxgl.Map({
                container: 'map',
                // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-74.0060, 40.7128],
                zoom: 10
            });

            return (

  fetch('http://localhost:8080/api/project')
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject(`Unexpected status code: ${response.status}`);
    }
  })
  .then(data => 
  data.map(d =>
  fetch(`http://localhost:8080/api/location/${d.locationId}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data =>
    mapboxClient.geocoding
        .forwardGeocode({
            query: data.address.concat(", ",data.city,", ",data.state," ",data.zipCode),
            autocomplete: false,
            limit: arr.length
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
            new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
            const popup = new mapboxgl.Popup({ closeOnClick: false, closeOnMove: false })
            .setLngLat(feature.center)
            .setHTML('<h1>This Location Details</h1>')
            .addTo(map);

        })
    ))
      
      )
  
      .catch(console.log)
            

      
            )
    }
    export default FileTest;