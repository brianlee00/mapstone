import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
    <div className="container">
      <h2 className="mt-3">Home</h2>

      <h4 className="mb-3 mt-3 ml-3">Welcome to the Cyburbia Urban Development Map. Get started <Link to="/agents"> here.</Link></h4>
      </div>
    </>
  );
}

export default Home;