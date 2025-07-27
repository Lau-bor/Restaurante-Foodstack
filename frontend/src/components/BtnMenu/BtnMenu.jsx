import { Link } from "react-router-dom"

function BtnMenu() {
  return (
    <div>
      <Link to='/menu'>
        <button className='btn btn-danger btn-lg fw-bold'>Ver menú</button>
      </Link>
    </div>
  )
}

export default BtnMenu
