import { AboutSectionPage, ContactForm, ImageGallery, Reviews } from '../../components';
import './About.css';

const clients = [
  {
    id: 1,
    name: 'Leo Messi - Jugador de futbol profesional y campeón del mundo.',
    review: '"Me encanta la comida de este lugar, la milanesa napolitana es como la de mi mamá."',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNisSA9NK1W_Bf7Kshi-d6iYyv56l1QxUwtw&s'
  },
  {
    id: 2,
    name: 'Franco Colapinto - Piloto de carreras de F1.',
    review: '"Siempre que vengo a la ciudad paso por este lugar, la comida es increible."',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKZvMHJUCPu5oXWwkRNmRIGB6YXGFOEAidg&s'
  },
  {
    id: 3,
    name: 'Dwayne Johnson (La Roca) - Actor y luchador profesional.',
    review: '"Los Fideos Strogonoff son mi plato favorito."',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3-Ijm9B-DTrAWys98SYRsV-6pHLllEJe2lA&s'
  },
  {
    id: 4,
    name: 'Neymar Jr - Jugador de futbol profesional.',
    review: '"Este lugar me lembra de casa, é por isso que sempre que estou por perto venho comer aqui."',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdqLtnaAFj1NRnyP21ouPPGL2XujNQlWWayw&s'
  },

]

function About() {
  return (
    <div className='about-page'>
      <header className='mt-5'>
        <div className='container h-100 d-flex align-items-center justify-content-center'>
          <h1 className='text-light'>Nosotros</h1>
        </div>
      </header>

      <AboutSectionPage />

      <div className='container h-100'>
        <ContactForm/>
      </div>

      <div className='my-5'>
        <Reviews
        clients={clients}
        />
      </div>

    </div>
  )
}

export default About
