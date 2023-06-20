import React, {createContext, useContext, useState, useEffect} from 'react'

const CartContext = createContext({})

const CartContextProvider = ({children}) => {
    const [cartProducts, setCartProduct] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    useEffect(() => {
        if(cartProducts?.length > 0){
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])
    function addProduct(productId) {
        setCartProduct(prev => [...prev, productId])
    }

    function removeProduct(productId){
      setCartProduct(prev => {
        const pos = prev.indexOf(productId)
        if(pos !== -1){
          return prev.filter((value, index) => index !== pos)
        }
        return prev
      })
    }

    const clearCartItems = () => {
      if(cartProducts.length > 0){
        localStorage.removeItem('cart')
      }
    }
    
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProduct,
        addProduct,
        removeProduct,
        clearCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext)

export default CartContextProvider;