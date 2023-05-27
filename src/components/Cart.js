import React, { useEffect, useState } from 'react'
import '../css/Cart.css'

function Cart({ setCartOpen, cartOpen, cartItems, setCartItems }) {

    const [addClass, setClass] = useState('')

    useEffect(() => {
        if (cartOpen) {
            setClass('-translate-x-0')
        } else {
            setClass('translate-x-80 hidden')
        }
    }, [cartOpen])

    const filterCartItem = (item)=>{
        let cartItem = cartItems.filter((cartItem) => {
            return cartItem.productId === item.productId
        })
        return cartItem;
    }

    const placeCartItem = (cartItem) => {
        let itemIndex = 0;
        for (let index = 0; index < cartItems.length; index++) {
            if (cartItems[index].productId === cartItem[0].productId) {
                itemIndex = index;
                break;
            }
        }

        let finalItems = cartItems.filter((item) => {
            return item.productId !== cartItem[0].productId
        })
        finalItems.splice(itemIndex, 0, cartItem[0])
        setCartItems(finalItems)
    }

    const increaseItemQuantity = (item, purchaseQuantity) => {
        let cartItem = filterCartItem(item);
        if (cartItem[0].quantity <= purchaseQuantity) {
            alert('Reached maximum quantity for this product')
        } else {
            cartItem[0].purchaseQuantity += 1;
            placeCartItem(cartItem)
        }
    }

    const reudceItemQuantity = (item, purchaseQuantity) => {
        let cartItem = filterCartItem(item);
        if (purchaseQuantity<=1) {
            let finalCartItems = cartItems.filter((cartItem)=>{
                return cartItem.productId!==item.productId
            })
            setCartItems(finalCartItems)
        } else {
            cartItem[0].purchaseQuantity -= 1;
            placeCartItem(cartItem)
        }
    }

    return (
        <div className={`text-white border border-purple-500 p-3 absolute z-10 right-0 duration-1000 ease-in-out bg-purple-400 cart-height-width ${addClass}`}>
            <h1 className='mb-5 text-2xl font-bold text-center'>Cart</h1>
            <i className='absolute text-3xl cursor-pointer right-2 bx bx-x-circle top-2' onClick={() => setCartOpen(false)}></i>
            {cartItems.map((item, index) => {
                return <div key={index} className='flex flex-row mb-5'>
                    <img alt="product" className="w-20 h-20" src={`data:image/png;base64,${item?.image}`} />
                    <div className='ml-2'>
                        <h1 className='text-xl'>{item?.productName}</h1>
                        <div className="flex flex-row justify-between gap-5 mt-2 align-baseline">
                            <p className='text-lg'>${item?.unitPrice}</p>
                            <div className='flex flex-row gap-2'>
                                <i className='text-lg bx bx-minus-circle' onClick={() => reudceItemQuantity(item, item?.purchaseQuantity)}></i>
                                <p className='text-lg'>{item?.purchaseQuantity}</p>
                                <i className='text-lg bx bx-plus-circle' onClick={() => increaseItemQuantity(item, item?.purchaseQuantity)}></i>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Cart