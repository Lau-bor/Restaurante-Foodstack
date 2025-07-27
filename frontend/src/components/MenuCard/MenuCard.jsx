import { Card, CardBody, CardText, CardTitle } from "react-bootstrap"

function MenuCard({menu, img, title, bg, text}) {
  return (
    <div className={`breakfast p-5 ${bg}`}>
          <div className='container'>
              <h2 className='text-center fs-2 mb-4 mb-lg-5 text-uppercase text-danger'>{title}</h2>
          </div>
          <div className='row flex-column-reverse flex-lg-row '>
              <div className='col-lg-6 d-flex justify-content-center'>
                  <img className='img-fluid w-75 mt-4 mt-lg-0' src={img} alt="menu-img" />
              </div>
              <div className='col-lg-6 d-flex flex-column justify-content-around'>
                  {menu.map((item) => (
                    <div key={item.id}>
                        <Card className={`border-0 w-100 ${bg} ${text}`}>
                          <CardBody>
                            <CardTitle className='text-center fs-3'>{item.name}</CardTitle>
                            <CardText className='text-center fs-5'>{item.description}</CardText>
                            <CardText className='text-center fs-5 fw-bold text-danger'>Precio: {item.price}</CardText>
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
