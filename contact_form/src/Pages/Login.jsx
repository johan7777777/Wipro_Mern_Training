function Login() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>

      <form className="w-50">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" />
        </div>

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;