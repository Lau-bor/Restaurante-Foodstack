import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { createPayment } from "../../services/PaymentService";
import * as MenuService from "../../services/MenuService";
import { useCart } from "../../context/cartContext.jsx";

const Orders = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const { cartItems, getCartTotal, removeItemFromCart } = useCart();
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const responseData = await MenuService.getMenus();

        if (Array.isArray(responseData.data)) {
          setMenus(responseData.data);
        } else {
          throw new Error("Formato de datos inválido del servidor.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      if (cartItems.length === 0) {
        throw new Error("El carrito está vacío.");
      }
      if (!user) {
        throw new Error("Debes iniciar sesión para completar la compra.");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const paymentResponse = await createPayment(cartItems, token);
      window.location.href = paymentResponse.init_point;
    } catch (error) {
      console.error("Error en el pago:", error.message);
      alert(`Error en el pago: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading || authLoading) {
    return <div className="text-center mt-8">Cargando...</div>;
  }
  if (error) {
    return <div className="text-center mt-8 text-danger">Error: {error}</div>;
  }

  return (
    <div
      className="container py-4"
      style={{
        backgroundImage:
          "url('../../../public/fast-food-seamless-background-illustration-simple-restaurant-menu-background-vector.jpg')",
        backgroundSize: "cover",
      }}
    >
      {/* Contenedor del carrito centrado arriba en el medio */}
      <div className="d-flex justify-content-center p-5 mb-5">
        <div
          className="card shadow"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="card-body">
            <h2 className="card-title text-center">Tu Carrito</h2>
            {cartItems.length === 0 ? (
              <p className="text-center">El carrito está vacío.</p>
            ) : (
              <div>
                <ul className="list-group list-group-flush">
                  {cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        {item.title} ({item.quantity})
                      </span>
                      <div className="d-flex align-items-center">
                        <span className="fw-bold me-2">
                          ${item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeItemFromCart(item._id)}
                          className="btn btn-sm btn-link text-danger"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 fw-bold text-end">
                  Total: ${getCartTotal()}
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="btn btn-warning fw-bold w-100 mt-3"
                >
                  {isProcessing ? "Procesando Pago..." : "Ir a Pagar"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
