
import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css"
import Home from './components/Home/Home';
// import Layout from './components/Layout/Layout';
import Shop from './components/Shop/Shop';
import About from './components/About/About';
import Contactus from './components/Contactus/Contactus';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import { Offline } from 'react-detect-offline';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CreateCategory from './components/Category/CreateCategory/CreateCategory';
import ViewCategory from './components/Category/ViewCategory/ViewCategory';
import EditCategory from './components/Category/EditCategory/EditCategory';
import AddProduct from './components/Product/AddProduct/AddProduct';
import ViewProduct from './components/Product/ViewProduct/ViewProduct';
import UpdateProduct from './components/Product/UpdateProduct/UpdateProduct';
import ProductsbyCat from './components/Shop/ProductsbyCat';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout'
import Orders from './components/Orders/Orders'
import UpdateOrder from './components/Orders/UpdateOrder';
import FavoriteList from './components/FavoriteList/FavoriteList';



function App() {

  return (
    <>
          <Offline>
        <div className='w-50 p-5 position-absolute  bg-dark shadow offline text-center'>
          <div className="text-danger h3">Unstable Connection......!</div>
        </div>
      </Offline>
<BrowserRouter>
        <Navbar />
        <Routes>
            {/* <Route> */}
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contactus/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/shop" element={<Shop/>} />
              <Route path="/single/:id" element={<SingleProduct/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="*" element={<Notfound/>} />
              {/* <AdminRoute path="/admin" name='Admin' /> */}
              <Route path="/CreateCategory" element={<CreateCategory />} />
              <Route path="/ViewCategory" element={<ViewCategory />} />
              <Route path="/categoryUpdate/:id" element={<EditCategory />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/allProducts" element={<ViewProduct />} />
              <Route path="/productUpdate/:id" element={<UpdateProduct />} />
              <Route path="/shop/:name" element={<ProductsbyCat />} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/checkout" element={<Checkout/>} />
              <Route path="/orders" element={<Orders/>} />
              <Route path="/updateOrder/:id" element={<UpdateOrder/>} />
              <Route path="/favorite/:id" element={<FavoriteList/>} />
              
            {/* </Route> */}
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
