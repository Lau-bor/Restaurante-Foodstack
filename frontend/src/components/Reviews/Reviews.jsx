import './Reviews.css';
import { Card, CardBody, CardFooter, CardTitle, CardText } from 'react-bootstrap';

function Reviews({clients}) {
  return (
    <div className='reviews-section container'>
      <h2 className='text-center mb-5 text-uppercase fw-bold fs-1'>Amigos de la casa</h2>
      <div className='row g-4'>
        {
          clients.map((item) => (
            <div className='col-ls-6' key={item.id}>
              <Card className='h-100 shadow'>
                <CardBody>
                  <div className='p-4'>
                  <CardText>{item.review}</CardText>
                  </div>
                </CardBody>
                <CardFooter className='d-flex align-items-center'>
                  <img src={item.image} alt={item.name} className='img-fluid mx-3 shadow'/>
                  <CardTitle className='text-danger'>{item.name}</CardTitle>
                </CardFooter>
              </Card>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Reviews
