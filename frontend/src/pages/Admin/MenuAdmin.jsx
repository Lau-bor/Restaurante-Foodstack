import { useEffect, useState } from "react";
import * as orderService from "../../services/OrderService";

function OrdersAdmin({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders(token);
      setOrders(data);
    } catch (err) {
      console.error("Error cargando órdenes:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status, token);
      loadOrders();
    } catch (err) {
      console.error("Error al actualizar orden:", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) return <p>Cargando órdenes...</p>;

  return (
    <div className="container my-5">
      <h1 className="text-2xl font-bold mb-4">Gestión de Órdenes</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Items</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.user ? order.user.role : "Usuario eliminado"}</td>
              <td>{order.user ? order.user.email : "N/A"}</td>
              <td>
                {order.items.map(item => (
                  <div key={item._id}>
                    {item.menu ? item.menu.title : "Menú eliminado"} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td>
                {order.status === "pending" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateStatus(order._id, "approved")}
                  >
                    Aprobar
                  </button>
                )}
                {order.status === "approved" && (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => updateStatus(order._id, "delivered")}
                  >
                    Marcar como Entregado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersAdmin;


