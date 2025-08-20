import React from 'react';
import { useCart } from '../../context/cartContext';

const Cart = () => {
    const { cartItems, removeItemFromCart, getCartTotal } = useCart();

    if (cartItems.length === 0) {
        return <div className="text-center mt-8">El carrito está vacío.</div>;
    }

    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item._id} className="flex justify-between items-center mb-2">
                        <span>{item.title} ({item.quantity})</span>
                        <div className="flex items-center">
                            <span className="font-bold">${item.price * item.quantity}</span>
                            <button
                                onClick={() => removeItemFromCart(item._id)}
                                className="ml-4 text-red-500 hover:text-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4 font-bold text-xl text-right">
                Total: ${getCartTotal()}
            </div>
            
        </div>
    );
};

export default Cart;