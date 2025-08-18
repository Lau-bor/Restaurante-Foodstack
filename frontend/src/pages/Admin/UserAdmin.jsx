import { useEffect, useState } from "react";
import * as userService from "../../services/UserService";

function UserAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await userService.getUsers();
    setUsers(data);
  };

  const toggleActive = async (id, current) => {
    await userService.setActive(id, !current);
    loadUsers();
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
              <td>{u.active ? "Activo" : "Inhabilitado"}</td>
              <td>
                <button 
                  className={`btn btn-sm ${u.active ? "btn-danger" : "btn-success"}`}
                  onClick={() => toggleActive(u._id, u.active)}
                >
                  {u.active ? "Inhabilitar" : "Activar"}
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
