import { Card, CardBody, CardText} from "react-bootstrap"
import { useCart } from "../../context/cartContext.jsx";

function MenuCard({menu, img, title, bg, text}) {
  const { addItemToCart } = useCart();

  const item = menu[0];

  return (
    <div className={`breakfast p-5 ${bg}`}>
          <div className='container'>
              <h2 className='text-center fs-2 mb-4 mb-lg-5 text-uppercase text-danger'>{title}</h2>
          </div>
          <div className='row flex-column-reverse flex-lg-row '>
              <div className='col-lg-6 d-flex justify-content-center flex-wrap'>
                  
                  {menu[0].files && menu[0].files.map((file, idx) => (
                    <img
                      key={idx}
                      className='img-fluid responsive-img m-2 rounded'
                      style={{ width: "45%", maxWidth: "400px", maxHeight: "300px" }}
                      src={`${import.meta.env.VITE_API_URL}${file.path}`}
                      alt={`menu-img-${idx}`}
                    />
                  ))}
              </div>
              <div className='col-lg-6 d-flex flex-column justify-content-around'>
                  {Array.isArray(menu) && menu.map((item) => (
                    <div key={item._id}>
                        <Card className={`border-0 w-100 ${bg} ${text}`}>
                          <CardBody>
                            <CardText className='text-center fs-3'>{item.description}</CardText>
                            <CardText className='text-center fs-2 fw-bold text-danger'>Precio: {item.price}</CardText>
                            
                                    <button
                                      onClick={() => {
                                        console.log("Intentando agregar al carrito:", {
                                          _id: item._id,
                                          title: item.title,
                                          price: Number(item.price),
                                        });
                                        try {
                                          addItemToCart({
                                            _id: item._id,
                                            title: item.title,
                                            price: Number(item.price),
                                          });
                                          console.log("¡Agregado al carrito!");
                                        } catch (error) {
                                          console.error("Error al agregar al carrito:", error);
                                        }
                                      }}
                                      className="btn btn-danger w-100"
                                    >
                                      Añadir al Carrito
                                    </button>
                          </CardBody>
                        </Card>
                    </div>
                  ))}
              </div>
          </div>
      </div>
  )
}

export default MenuCard
