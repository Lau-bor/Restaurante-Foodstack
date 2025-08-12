import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(data);
      toast.success("Registrado correctamente. Revisa tu email 📨");
      navigate("/login");
    } catch (err) {
      const messages = err.response?.data?.error;
      if (Array.isArray(messages)) {
        messages.forEach((msg) => toast.error(msg));
      } else {
        toast.error(messages || "Error al registrarse");
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light"
    style={{
        backgroundImage: 'url("/fast-food-seamless-background-illustration-simple-restaurant-menu-background-vector.jpg")'
      }}>
      <div
        className="card shadow-sm p-4 bg-dark-subtle"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body">
          <h2 className="h4 fw-bold mb-4 text-center">Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                placeholder="Usuario"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-grid mb-4">
              <button className="btn btn-warning fw-bold">Registrarse</button>
            </div>
            <p className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-danger text-decoration-none">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
