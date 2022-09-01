function Error({ errors }) {
    if (!errors || errors.length === 0) {
      return null;
    }
  
    return (
      <div className="alert alert-danger">
        <p>The following errors were found:</p>
        <ul>
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Error;