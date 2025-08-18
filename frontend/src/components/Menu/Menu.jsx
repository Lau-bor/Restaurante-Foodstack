import { useEffect, useState } from "react";
import { MenuCard } from '../../components'
import * as menuService from "../../services/MenuService";
import './Menu.css'

function Menu() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const data = await menuService.getMenus();
      setMenus(data.data || data);
    };
    fetchMenus();
  }, []);

  return (
    <div className='menu-page'>
      <header className=''>
          <div className='container h-100 d-flex justify-content-center align-items-center'>
              <h1 className='text-light'>Menu</h1>
          </div>
      </header>
      {menus.map(menu => (
        <div key={menu._id}>
          <MenuCard
            menu={[menu]}
            img={menu.files && menu.files.length > 0 ? `http://localhost:3003${menu.files[0].path}` : ""}
            title={menu.title}
          />
          <hr
            style={{
              margin: "60px 0",
              marginBottom: "0px",
              border: "0",
              height: "6px",
              background: "linear-gradient(90deg, #ff9800 0%, #ff2222ff 100%)",
              borderRadius: "6px"
            }}
          />
        </div>
      ))}
    </div>
  )
}


export default Menu
