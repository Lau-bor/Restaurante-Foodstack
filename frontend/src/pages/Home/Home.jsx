import { AboutSection, MenuSection, Menu } from '../../components'
import './Home.css'; 

function Home() {
return (
<>
<div className="hero-image">
<img src="../../../public/FoodStack-495051.jpg" alt="Imagen de Foodstack" className='responsive-img'/>
</div>

  <AboutSection/>

  <MenuSection/>

  <Menu/>
</>
)
}

export default Home