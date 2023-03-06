import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { CartContext } from "./contexts/ProductContext";
// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";

function App() {
  const startStorage = () => {
    window.localStorage.getItem("carts")
      ? JSON.parse(window.localStorage.getItem("carts"))
      : window.localStorage.setItem("carts", JSON.stringify([]));
    return JSON.parse(window.localStorage.getItem("carts"));
  };

  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(startStorage);

  const addItem = (item) => {
    !cart.find((items) => items.id === item.id) && setCart([...cart, item]);
    window.localStorage.setItem("carts", JSON.stringify([...cart, item]));
  };
  const removeItem = (item) => {
    setCart([...cart.filter((items) => items.id !== item.id)]);
    window.localStorage.setItem(
      "carts",
      JSON.stringify([...cart.filter((items) => items.id !== item.id)])
    );
  };

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, setCart, removeItem }}>
        <Navigation />

        {/* Routelar */}
        <main className="content">
          <ProductContext.Provider value={{ products, addItem }}>
            <Route exact path="/">
              <Products />
            </Route>
          </ProductContext.Provider>

          <Route path="/cart">
            <ShoppingCart cart={cart} />
          </Route>
        </main>
      </CartContext.Provider>
    </div>
  );
}

export default App;
