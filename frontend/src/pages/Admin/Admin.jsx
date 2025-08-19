import { useEffect, useState } from "react";
import * as menuService from "../../services/MenuService";
import * as userService from "../../services/UserService";

function Admin() {
  const [menus, setMenus] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", price: "", files: [] });
  const [searchUser, setSearchUser] = useState("");
  const [existingFiles, setExistingFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [replaceAllImages, setReplaceAllImages] = useState(false);

  const loadMenus = async () => {
    const data = await menuService.getMenus();
    setMenus(data.data || data);
  };

  const loadUsers = async () => {
    const data = await userService.getUsers();
    setUsers(data || []);
  };

  useEffect(() => {
    loadMenus();
    loadUsers();
  }, []);

  const openModal = (menu = null) => {
    if(menu){
      setEditingMenu(menu);
      setFormData({
        title: menu.title,
        description: menu.description,
        price: menu.price,
        files: []
      });
      setExistingFiles(menu.files || []);
      setFilesToDelete([]);
      setReplaceAllImages(false);
    } else {
      setEditingMenu(null);
      setFormData({ title: "", description: "", price: "", files: [] });
      setExistingFiles([]);
      setFilesToDelete([]);
      setReplaceAllImages(false);
    }
    setShowModal(true);
  };

  const handleRemoveExistingFile = (fileId) => {
    setFilesToDelete([...filesToDelete, fileId]);
    setExistingFiles(existingFiles.filter(f => f._id !== fileId));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();

  
  Object.keys(formData).forEach(key => {
    if(key === "files"){
      Array.from(formData.files).forEach(file => data.append("files", file));
    } else {
      data.append(key, formData[key]);
    }
  });

 
  filesToDelete.forEach(id => data.append("filesToDelete", id));

  try {
    if(editingMenu){
      await menuService.updateMenu(editingMenu._id, data);
    } else {
      await menuService.createMenu(data);
    }

    
    setShowModal(false);
    loadMenus();
    setEditingMenu(null);
    setExistingFiles([]);
    setFilesToDelete([]);
    setFormData({ title: "", description: "", price: "", files: [] });
  } catch (error) {
    console.error("Error al guardar menú:", error);
  }
};


  const handleDeleteMenu = async (id) => {
    if(window.confirm("¿Seguro que quieres eliminar este menú?")){
      await menuService.deleteMenu(id);
      loadMenus();
    }
  };


  const filteredUsers = users.filter(u => 
  u.username.toLowerCase().includes(searchUser.toLowerCase()) ||
  u.email.toLowerCase().includes(searchUser.toLowerCase())
);

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center mb-5 text-uppercase fw-bold fs-1">Panel de Administración</h1>

        <div className="mb-8">
          <h2 className="text-center mb-5 fw-semibold fs-2">Menús</h2>
          <button className="btn btn-primary mb-3" onClick={() => openModal()}>Crear Menú</button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menus.map(menu => (
              <div key={menu._id} className="card p-3 shadow-md border rounded">
                <h3 className="font-bold">{menu.title}</h3>
                <p>{menu.description}</p>
                <p>Precio: ${menu.price}</p>
                {menu.files && menu.files.length > 0 && (
                  <div className="mb-2 flex flex-wrap">
                    {menu.files.map(file => (
                      <img
                        key={file._id}
                        src={file.url.startsWith("http") ? file.url : `http://localhost:3003${file.url}`}
                        alt={menu.title}
                        style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "8px", marginBottom: "8px" }}
                      />
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <button className="btn btn-warning btn-sm me-4" onClick={() => openModal(menu)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMenu(menu._id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
  <h2 className="text-center mb-5 fw-semibold fs-2">Usuarios</h2>
  <input 
    type="text"
    placeholder="Buscar usuario..."
    value={searchUser}
    onChange={e => setSearchUser(e.target.value)}
    className="form-control mb-3"
  />
  <div className="overflow-x-auto">
    <table className="table table-striped w-full">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Email</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(u => (
          <tr key={u._id}>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.isActive ? "Sí" : "No"}</td>
            <td>
              <button
                className="btn btn-sm btn-secondary"
                onClick={async () => {
                  try {
                    await userService.toggleUser(u._id, u.isActive);
                    loadUsers();
                  } catch (error) {
                    console.error("Error al cambiar estado de usuario", error);
                  }
                }}
              >
                {u.isActive ? "Inactivar" : "Activar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content p-4">
                <div className="modal-header">
                  <h5 className="modal-title">{editingMenu ? "Editar Menú" : "Crear Menú"}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit} className="modal-body flex flex-col gap-3">
                  <input 
                    type="text" 
                    placeholder="Título" 
                    className="form-control" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    required
                  />
                  <textarea 
                    placeholder="Descripción" 
                    className="form-control" 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    required
                  />
                  <input 
                    type="number" 
                    placeholder="Precio" 
                    className="form-control" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})} 
                    required
                  />
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="form-control" 
                    onChange={e => setFormData({...formData, files: e.target.files})} 
                  />

                  {existingFiles.length > 0 && (
                    <div className="mb-2">
                      <label>Imágenes actuales:</label>
                      <div className="flex gap-2 flex-wrap">
                        {existingFiles.map(file => (
                          <div key={file._id} className="relative">
                            <img
                              src={file.url.startsWith("http") ? file.url : `http://localhost:3003${file.url}`}
                              alt="menu"
                              style={{ maxWidth: "100px", maxHeight: "100px" }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm absolute top-0 right-0"
                              style={{ padding: "2px 5px", fontSize: "0.7rem" }}
                              onClick={() => handleRemoveExistingFile(file._id)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button type="submit" className="btn btn-success mt-3">Guardar</button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Admin;