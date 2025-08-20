
import { Card, CardBody, CardFooter, CardTitle, CardText } from 'react-bootstrap';
import './Reviews.css';

function Reviews({ clients }) {
    return (
        <div className='reviews-section container py-1'>
            <h2 className='text-center mb-5 text-uppercase fw-bold fs-1'>Amigos de la casa</h2>
            <div className='row justify-content-center'>
                {
                    clients.map((item) => (
                        <div className='col-12 col-md-8 col-lg-12 mb-4' key={item.id}>
                            <Card className='h-100 shadow'>
                                <CardBody>
                                    <div className='p-2'>
                                        <CardText>{item.review}</CardText>
                                    </div>
                                </CardBody>
                                <CardFooter className='footer-card d-flex align-items-center'>
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className='review-client-img  me-3' 
                                    />
                                    <CardTitle className='text-danger mb-1'>{item.name}</CardTitle>
                                </CardFooter>
                            </Card>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Reviews;