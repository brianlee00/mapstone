// import { Link } from 'react-router-dom';
import Map from './Map';



function Home() {
  return (
    <>
      <center>
        <div className="container" text-align="center">
          {/* <h2 className="mt-3">Home</h2> */}

          <h2 className="mb-5 mt-5">Cyburbia Urban Development Map</h2>
        </div>
      </center>
      <div className="container">
        <Map />
      </div>
      <div>
        <img src="images/map-legend.jpg" alt="map-legend" width="300" height="80" className="center mt-4"></img>
      </div>
      <br/>
    </>
  );
}

export default Home;