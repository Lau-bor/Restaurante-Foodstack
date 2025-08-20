
import './MenuSection.css'

function MenuSection() {
  return (
    <div className='menu-section py-5 text-light shadow'>
    <div className='container d-flex flex-column align-items-center mb-0'>
        <h2 className='fs-1 mb-5 text-uppercase fw-bold'>Especiales del Mes</h2>
        <div className='row mb-5 w-100'>
            <div className='col-lg-6 d-flex flex-column align-items-center mb-5 mb-lg-0'>
                  <h3 className='fs-2 mb-5'>Comidas</h3>
                  <ul className='px-0'>
                        <li className='d-flex justify-content-between'>
                          <p className='fs-3 mx-2'>Grand Rolling Coder</p>
                          <p className='fs-3 mx-2 text-danger fw-bold'>$12.000</p>
                        </li>
                        <li className='d-flex justify-content-between'>
                          <p className='fs-3 mx-2'>Jaw Breaker</p>
                          <p className='fs-3 mx-2 text-danger fw-bold'>$15.000</p>
                        </li>
                        <li className='d-flex justify-content-between'>
                          <p className='fs-3 mx-2'>Git Ham</p>
                          <p className='fs-3 mx-2 text-danger fw-bold'>$10.000</p>
                        </li>
                  </ul>
            </div>
            <div className='col-lg-6 d-flex flex-column align-items-center mb-5 mb-lg-0'>
                  <h3 className='fs-2 mb-5'>Bebidas</h3>
                  <ul className='px-0'>
                        <li className='d-flex justify-content-between'>
                          <p className='fs-3 mx-2'>Café Helado</p>
                          <p className='fs-3 mx-2 text-danger fw-bold'>$5.000</p>
                        </li>
                        <li className='d-flex justify-content-between'>
                          <p className='fs-3 mx-2'>Jugo Tropical</p>
                          <p className='fs-3 mx-2 text-danger fw-bold'>$2.000</p>
                        </li>
                        <li className='d-flex justify-content-between'>
                          <p className='fs-3 mx-2'>Cerveza Tirada</p>
                          <p className='fs-3 mx-2 text-danger fw-bold'>$6.000</p>
                        </li>
                  </ul>
            </div>
        </div>
        
     </div>
  </div>
  )
}
export default MenuSection
