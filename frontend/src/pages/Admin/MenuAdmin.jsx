import { useState, useEffect } from "react";
import * as menuService from "../../services/MenuService";

function MenuAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", price: "", files: [] });
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [existingFiles, setExistingFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [replaceAllImages, setReplaceAllImages] = useState(false);

  const loadMenus = async () => {
    const data = await menuService.getMenus();
    setMenus(data.data || data);
  };

  useEffect(() => {
    loadMenus();
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
  setFilesToDelete(prev => [...prev, fileId]);
  setExistingFiles(prev => prev.filter(f => f._id !== fileId));
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
 
  if(filesToDelete.length > 0){
    filesToDelete.forEach(id => data.append("filesToDelete", id));
  }
  
  data.append("replaceImages", replaceAllImages ? "true" : "false");

  try {
    if(editingMenu){
      await menuService.updateMenu(editingMenu._id, data);
    } else {
      await menuService.createMenu(data);
    }
    setShowModal(false);
    loadMenus();
  } catch (error) {
    console.error("Error al guardar menú:", error);
  }
};
  return (
    <div className="container my-5">
      <h1 className="text-2xl font-bold mb-4">Administración de Menús</h1>
      <button 
        className="btn btn-primary mb-4"
        onClick={() => openModal()}
      >
        Crear Menú
      </button>

      <div className="menus-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus.map(menu => (
          <div key={menu._id} className="card p-3 shadow-md border rounded">
            <h2 className="font-bold">{menu.title}</h2>
            <p>{menu.description}</p>
            <p>Precio: ${menu.price}</p>
            {menu.files && menu.files.length > 0 && (
              <div className="mb-2 flex flex-wrap">
                {menu.files.map(file => (
                  <img 
                    key={file._id} 
                    src={file.url.startsWith("http") ? file.url : `http://localhost:4000${file.url}`} 
                    alt={menu.title} 
                    style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "8px", marginBottom: "8px" }}
                  />
                ))}
              </div>
            )}
            <button className="btn btn-warning btn-sm" onClick={() => openModal(menu)}>Editar</button>
          </div>
        ))}
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
    <div className="flex flex-wrap">
      {existingFiles.map(file => (
        <div key={file._id} className="relative mr-2 mb-2">
          <img 
            src={file.url.startsWith("http") ? file.url : `http://localhost:4000${file.url}`} 
            alt="menu" 
            style={{ maxWidth: "300px", maxHeight: "300px" }} 
          />
          <button 
            type="button" 
            onClick={() => handleRemoveExistingFile(file._id)} 
            className="btn btn-sm btn-danger absolute top-0 right-0"
          >
            X
          </button>
        </div>
      ))}
    </div>
  </div>
)}

                <div className="form-check mb-2">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    checked={replaceAllImages} 
                    onChange={e => setReplaceAllImages(e.target.checked)}
                    id="replaceAllImages"
                  />
                  <label htmlFor="replaceAllImages" className="form-check-label">
                    Reemplazar todas las imágenes
                  </label>
                </div>

                <button type="submit" className="btn btn-success mt-3">Guardar menú</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuAdmin;

