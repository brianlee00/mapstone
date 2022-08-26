import { Link } from 'react-router-dom';

function Navbar() {
  return (

    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <Link className="navbar-brand" to="/">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active"><Link className="nav-link" to="/projects"> Projects </Link></li>
          <li className="nav-item active"><Link className="nav-link" to="/agencies"> Agencies </Link></li>
          <li className="nav-item active"><Link className="nav-link" to="/developers"> Developers </Link></li>
        </ul>
      </div>
    </nav>

  );
}

export default Navbar;