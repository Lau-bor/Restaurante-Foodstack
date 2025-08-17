
function ContactInfo() {
    return (
        <div className='py-5 shadow  '
        style={{
        backgroundImage: 'url(../../../public/pexels-eva-bronzini-7598077.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        }}>
            <div className='container'>
                    <div className='col-lg-12 d-flex align-items-center justify-content-center mb-5 mb-lg-0'>
                        <div className='text-dark d-flex flex-column align-items-between'>
                            <h2 className='fs-2 mb-2 text-uppercase fw-bold'>Nos encontramos en 📍</h2>
                            <p className='mb-4 pb-2 fs-3'>San Juan 500 - San Miguel de Tucuman</p>
                            <h3 className="fs-2 mb-2 text-uppercase fw-bold">Horarios⌚</h3>
                            <p className='m-0 fs-4'><strong>Martes a Domingo:</strong> 20:00 - 01:00 hs</p>
                            <p className="fs-4"><strong>Lunes:</strong> Cerrado</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ContactInfo
