import { Link } from 'react-router-dom';
import Map from './Map';
import FileTest from './File';



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
        <FileTest />

      </div>
    </>
  );
}

export default Home;