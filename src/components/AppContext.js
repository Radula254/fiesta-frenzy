"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.price;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export default function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ss = typeof window !== 'undefined' ? window.sessionStorage : null;

  useEffect(() => {
    if (ss && ss.getItem('cart')) {
        setCartProducts(JSON.parse(ss.getItem('cart')));
    }
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToSessionStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove);
      saveCartProductsToSessionStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed'); 
  }

  function saveCartProductsToSessionStorage(cartProducts) {
    if (ss) {
      ss.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToSessionStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
