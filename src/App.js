import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { CartContext } from "./contexts/ProductContext";
// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    !cart.find((items) => items.id === item.id)
      ? setCart([...cart, item])
      : console.log("Ürün Sepette VAr");
  };

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, setCart }}>
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
