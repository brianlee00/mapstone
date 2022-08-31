import React, { useRef, useEffect, useState } from 'react';
  function FileTest() {

    const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  var newObject = '';
  var some = [];

  useEffect(() => {
    fetch('http://localhost:8080/api/project')
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject(`Unexpected status code: ${response.status}`);
    }
  })
  .then(data => setProjects(data))
  .catch(console.log);
  
},[]);
useEffect(() => {
    fetch('http://localhost:8080/api/location')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => setLocations(data))
      .catch(console.log);
  }, []);

  projects.forEach(project => (

    newObject = locations[project.locationId-1].address.concat(", ",locations[project.locationId-1].city,", ",locations[project.locationId-1].state,", ",locations[project.locationId-1].zipCode),
    some.push(newObject),
    console.log(some)

    ));

 
  }
    
export default FileTest;