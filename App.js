import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // cart.find((items) => items.id !== item.id)
    //   ? setCart([...cart, item])
    //   : console.log("ürün Sepette VARRE");
  };

  return (
    <div className="App">
      <Navigation cart={cart} />

      {/* Routelar */}
      <Route exact path="/">
        <Products products={products} addItem={addItem} />
      </Route>

      <Route path="/cart">
        <ShoppingCart cart={cart} />
      </Route>
    </div>
  );
}

export default App;
