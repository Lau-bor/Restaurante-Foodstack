import { Link } from 'react-router-dom'

function AboutSection() {
  return (
    <div className='container my-5 pb-5 pt-5 mb-0 bg-dark text-light'>
    <div className='row'>
      <div className='col-lg-6 d-flex justify-content-center d-none d-lg-flex'>
          <img src="https://imgcdn.stablediffusionweb.com/2024/3/12/95d05e00-0954-45c7-b4e0-6274391cca09.jpg" alt="about img" className='img-fluid w-75 object-fit-cover border-0' />
      </div>
      <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
          <h2 className='fs-1 mb-5 text-uppercase'>Sobre Nosotros</h2>
          <p>¡¡¡Bienvenidos todos a la mejor experiencia de Fast Food que van a tener en su vida!!!.</p>
          <p className='mb-5'>Desde el primer bocado hasta el último, te invitamos a vos y a tu familia a disfrutar de una experiencia gastronómica inolvidable.
            Nuestro ambiente cálido y acogedor es el escenario perfecto para compartir momentos especiales con tus seres queridos.
            ¡¡Te esperamos para celebrar la vida a través de la buena comida y la mejor compañía, desde 1984!!</p>
          <Link to="/about">
        <button className='btn btn-outline-danger btn-lg'>Conocenos mejor</button>
          </Link>
      </div>
    </div>
</div>
  )
}

export default AboutSection
