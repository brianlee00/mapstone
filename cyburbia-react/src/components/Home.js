import { Link } from 'react-router-dom';
import Map from './Map';



function Home() {
  return (
    <>
    <div className="container">
      {/* <h2 className="mt-3">Home</h2> */}

      <h4 className="mb-3 mt-3">Welcome to the Cyburbia Urban Development Map</h4>
      </div>
      <div className="container">
        <Map />

      </div>
    </>
  );
}

export default Home;