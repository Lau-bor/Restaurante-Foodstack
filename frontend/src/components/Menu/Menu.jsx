import { MenuCard } from '../../components'
import './Menu.css'

const desayuno = [
  {
    id: 1,
    name: 'Wake Up',
    description: 'Infusion, Pan, Jamon y Queso',
    price: '$5000',
  },
  {
    id: 2,
    name: 'Grand Toast',
    description: 'Infusion, Pan en rodajas con palta, tomate, huevo y queso',
    price: '$7000',
  },
  {
    id: 3,
    name: 'Milshake',
    description: 'Batido de frutas con leche, azucar y hielo, medialunas',
    price: '$7800',
  }
]

const Hamburguesas = [
  {
    id: 1,
    name: 'Mc Coders',
    description: 'Hamburguesa, jamon, queso, tocino, papas fritas',
    price: '$12000',
  },
  {
    id: 2,
    name: 'Jaw Breaker',
    description: 'Hamburguesa, cebollas, queso cheddar, papas fritas',
    price: '$13500',
  },
  {
    id: 3,
    name: 'Big Node.JS',
    description: ' 2 Hamburguesas, cebolla, lechuga, tomates, huevo, queso cheddar, papas fritas',
    price: '$20000',
  }
]

const Sandwiches = [
  {
    id: 1,
    name: 'Git-Chicken',
    description: 'Sandwich de pollo, jamon, queso parmesano, huevo y salsa',
    price: '$9500',
  },
  {
    id: 2,
    name: 'Sandwich de Milanesa Commit',
    description: 'Sandwich de milanesa de carne, lechuga, tomate, mayonesa, jamon y queso, mostaza',
    price: '$10500',
  },
  {
    id: 3,
    name: 'Sandwich de Lomito Java',
    description: 'Lomito, jamon, queso, tomate, lechuga, huevo, mayonesa',
    price: '$10.000',
  }
]

const postre = [
  {
    id: 1,
    name: 'Rolling Ice',
    description: 'Helado de crema americana, dulce de leche, frutilla o chocolate',
    price: '$4500',
  },
  {
    id: 2,
    name: 'Budin de Pan',
    description: 'Budin de pan, crema chantilly, dulce de leche',
    price: '$6000',
  },
  {
    id: 3,
    name: 'Brownie',
    description: 'Brownie con nueces, helado de crema americana, chocolate',
    price: '$5000',
  }
]
const bebidas = [
  {
    id: 1,
    name: 'Rolling Cola',
    description: 'Gaseosa Cola',
    price: '$2000',
  },
  {
    id: 2,
    name: 'Popsi',
    description: 'Gaseosa Cola',
    price: '$1500',
  },
  {
    id: 3,
    name: 'Sprite',
    description: 'Vodka, licor de durazno, jugo de naranja y granadina',
    price: '$1500',
  }
]

function Menu() {
  return (
    <div className='menu-page'>
      <header className='mt-5'>
          <div className='container h-100 d-flex justify-content-center align-items-center'>
              <h1 className='text-light'>Menu</h1>
          </div>
      </header>

      <MenuCard
      menu={desayuno}
      img=''
      title='Desayuno'
      bg='bg-white'
      text=''
      />
      <MenuCard 
      menu={Hamburguesas}
      img=''
      title='Almuerzo'
      bg='bg-dark'
      text='text-white'
      />
      <MenuCard
      menu={Sandwiches}
      img=''
      title='Cena'
      bg='bg-white'
      text=''
      />
      <MenuCard
      menu={postre}
      img='postres'
      title='Postre'
      bg='bg-dark'
      text='text-white'
      />
      <MenuCard
      menu={bebidas}
      img= "fizzydrinks"
      title='Bebidas'
      bg='bg-white'
      text=''
      />
    </div>
  )
}

export default Menu
