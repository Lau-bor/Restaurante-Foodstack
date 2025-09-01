import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message;
      if (message === "Usuario inactivo. Contacta al administrador.") {
        setError(message);
        toast.error(message);
      } else {
        setError(message || "Error al iniciar sesión");
        toast.error(message || "Error al iniciar sesión");
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-4"
      style={{
        backgroundImage: 'url("/fast-food-seamless-background-illustration-simple-restaurant-menu-background-vector.jpg")'
      }}
    >
      <div className="card shadow-sm p-4 bg-dark-subtle" style={{maxWidth: '400px', width: '100%'}}>
        <div className="card-body">
          <h2 className="h4 fw-bold mb-4 text-center">Iniciar sesión</h2>
          
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="form-control"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="form-control"
                required
              />
            </div>

            <div className="d-grid mb-4">
              <button type="submit" className="btn btn-warning fw-bold">
                Entrar
              </button>
            </div>

            <div className="text-center">
              <p className="mb-2">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-danger text-decoration-none">
                  Regístrate
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;