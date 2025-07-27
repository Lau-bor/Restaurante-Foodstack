import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/orders", {
      credentials: "include", 
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Pedidos</h2>
      {orders.length === 0 ? (
        <p>No hay pedidos aún.</p>
      ) : (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order._id} className="list-group-item">
              <strong>{order.title}</strong>: {order.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
