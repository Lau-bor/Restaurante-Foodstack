import { Link } from 'react-router-dom'

function AboutSection() {
  return (
    <div className='container my-5'>
    <div className='row'>
      <div className='col-lg-6 d-flex justify-content-center d-none d-lg-flex'>
          <img src="KDLC-AW-Pic-1013x675" alt="about img" className='img-fluid w-75 object-fit-cover' />
      </div>
      <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
          <h2 className='fs-1 mb-5 text-uppercase'>Sobre Nosotros</h2>
          <p>¡Bienvenidos a nuestro rincón culinario, donde la tradición se fusiona con la innovación!
            En cada plato, celebramos los sabores auténticos y los ingredientes frescos de nuestra tierra.
            Nuestra cocina es un viaje a través de recetas familiares y creaciones contemporáneas que deleitarán tu paladar.</p>
          <p className='mb-5'>Desde el primer bocado hasta el último, te invitamos a disfrutar de una experiencia gastronómica inolvidable.
            Nuestro ambiente cálido y acogedor es el escenario perfecto para compartir momentos especiales con tus seres queridos.
            Te esperamos para celebrar la vida a través de la buena comida y la mejor compañía.</p>
          <Link to="/about">
        <button className='btn btn-outline-danger btn-lg'>Más sobre nosotros</button>
          </Link>
      </div>
    </div>
</div>
  )
}

export default AboutSection
