import { useEffect, useState } from "react";
import * as userService from "../../services/UserService";

function UserAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const toggleActive = async (id, current) => {
    try {
      await userService.toggleUser(id);
      loadUsers();
    } catch (error) {
      console.error("Error al cambiar estado de usuario:", error);
    }
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.isActive ? "Activo" : "Inhabilitado"}</td>
              <td>
                <button
                  className={`btn btn-sm ${u.isActive ? "btn-danger" : "btn-success"}`}
                  onClick={() => toggleActive(u._id, u.isActive)}
                >
                  {u.isActive ? "Inhabilitar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAdmin;
