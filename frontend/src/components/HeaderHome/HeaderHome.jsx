
import './HeaderHome.css';

function HeaderHome() {
  return (
    <header className='h-100 min-vh-100 d-flex align-items-center text-light shadow' >
      <img className='Logo' ></img>
        <div className='container'>
          
            <div className='row'>
            <div className='col-sm-6 d-flex d-sm-block flex-column align-items-center'>
                <h2 className='mb-0 text-black fw-bold'></h2>
                <h1 className='mb-5 fw-bold text-center text-sm-start'></h1>
                
            </div>
            </div>
        </div>
      
    </header>
  )
}

export default HeaderHome
