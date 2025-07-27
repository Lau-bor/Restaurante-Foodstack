import './ImageGallery.css';

function ImageGallery() {
    return (
      <div className="container py-5">
          <h2 className="text-center fs-1 mb-5 text-uppercase">Un poco de tentacion</h2>
          <div className="row">
              <div className="col-md-4 px-2">
                  <div className="my-3">
                      <img className="img-fluid gallery-pic-vertical" src="https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  </div>
                  <div className="my-3">
                      <img className="img-fluid gallery-pic" src="https://images.pexels.com/photos/30343602/pexels-photo-30343602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  </div>
              </div>
              <div className="col-md-4 px-2">
                  <div className="my-3">
                      <img className="img-fluid gallery-pic" src="https://images.pexels.com/photos/30343585/pexels-photo-30343585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  </div>
                  <div className="my-3">
                      <img className="img-fluid gallery-pic-vertical" src="https://images.pexels.com/photos/2067403/pexels-photo-2067403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  </div>
              </div>
              <div className="col-md-4 px-2">
                  <div className="my-3">
                      <img className="img-fluid gallery-pic-vertical" src="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  </div>
                  <div className="my-3">
                      <img className="img-fluid gallery-pic" src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  </div>
              </div>
          </div>
      </div>
    )
  }

export default ImageGallery
