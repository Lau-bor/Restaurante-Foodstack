import { ContactForm, Reviews } from '../../components';
import TeamSection from '../../components/TeamSection/TeamSection';
import './About.css';

const clients = [
  {
    id: 1,
    name: 'Leo Messi - Jugador de futbol profesional y campeón del mundo.',
    review: '"Los sanguches de milanesa de este lugar son tremendos."',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNisSA9NK1W_Bf7Kshi-d6iYyv56l1QxUwtw&s'
  },
  {
    id: 2,
    name: 'Franco Colapinto - Piloto de carreras de F1.',
    review: '"Me encanta venir a este lugar después de una carrera, nada mejor que un par de frituras para recuperar energías."',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKZvMHJUCPu5oXWwkRNmRIGB6YXGFOEAidg&s'
  },
  {
    id: 3,
    name: 'Dwayne Johnson (La Roca) - Actor y luchador profesional.',
    review: '"Aunque soy un tipo fitness, de vez en cuando me gusta darme un gusto y comerme una buena hamburguesa."',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3-Ijm9B-DTrAWys98SYRsV-6pHLllEJe2lA&s'
  },
  {
    id: 4,
    name: 'Neymar Jr - Jugador de futbol profesional.',
    review: 'Vim com Leo Messi pela primeira vez e sempre que estou na Argentina venho comer um sanduíche."',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdqLtnaAFj1NRnyP21ouPPGL2XujNQlWWayw&s'
  },

]

function About() {
  return (
    <div className='about-page'>
      <header className=''>
        <div className='container h-100 d-flex align-items-center justify-content-center'>
          <h1 className='text-light'>Nosotros</h1>
        </div>
      </header>

      <TeamSection/>

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
