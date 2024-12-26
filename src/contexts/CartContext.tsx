import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'

export interface IProduct {
  id: string
  name: string
  imageUrl: string
  price: string
  numberPrice: number
  description: string
  defaultPriceId: string
}

interface CartContextData {
  cartItems: IProduct[]
  cartTotal: number
  addToCart: (product: IProduct) => void
  removeCartItem: (productId: string) => void
  checkIfItemAlreadyExists: (productId: string) => boolean
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext<CartContextData | null>(null)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, product) => total + product.numberPrice, 0)
  }, [cartItems])

  function addToCart(product: IProduct) {
    console.log(product)
    if (!product.id) {
      console.error('Produto inválido')
      return
    }

    setCartItems((state) => {
      if (state.some((item) => item.id === product.id)) {
        return state
      }
      return [...state, product]
    })
  }

  function removeCartItem(productId: string) {
    setCartItems((state) => state.filter((item) => item.id !== productId))
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeCartItem,
        cartTotal,
        checkIfItemAlreadyExists,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
