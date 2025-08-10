import { MenuCard } from '../../components'
import './Menu.css'

const desayuno = [
  {
    id: 1,
    name: 'Ejecutivo',
    description: 'Infusion, Pan, Jamon y Queso',
    price: '$5000',
  },
  {
    id: 2,
    name: 'Avocado Toast',
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

const almuerzo = [
  {
    id: 1,
    name: 'Napolitana con papas',
    description: 'Milanesa de carne con salsa de tomate, jamon y queso, papas fritas',
    price: '$12000',
  },
  {
    id: 2,
    name: 'Matambre al verdeo',
    description: 'Matambre de vaca o cerdo, cebolla de verdeo, papas al horno',
    price: '$13500',
  },
  {
    id: 3,
    name: 'Sorrentinos',
    description: 'Sorrentinos con salsa blanca o roja, queso rallado',
    price: '$11000',
  }
]

const cena = [
  {
    id: 1,
    name: 'Pizza 4 Quesos',
    description: 'Pizza con queso azul, queso parmesano, queso mozzarella y queso cheddar',
    price: '$8500',
  },
  {
    id: 2,
    name: 'Sandwich de Milanesa',
    description: 'Sandwich de milanesa de carne, lechuga, tomate, mayonesa, mostaza',
    price: '$10500',
  },
  {
    id: 3,
    name: 'Mexicano',
    description: 'Pan de miga, jamon, queso, tomate, lechuga, huevo, mayonesa, ternera',
    price: '$9500',
  }
]

const postre = [
  {
    id: 1,
    name: 'Helado',
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
    name: 'Coca Cola',
    description: 'Gaseosa Cola',
    price: '$2000',
  },
  {
    id: 2,
    name: 'Pepsi',
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
      img='https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600'
      title='Desayuno'
      bg='bg-white'
      text=''
      />
      <MenuCard 
      menu={almuerzo}
      img='https://images.pexels.com/photos/1860204/pexels-photo-1860204.jpeg?auto=compress&cs=tinysrgb&w=600'
      title='Almuerzo'
      bg='bg-dark'
      text='text-white'
      />
      <MenuCard
      menu={cena}
      img='https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=600'
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
