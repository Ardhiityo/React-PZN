import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import Data from './Data';
import Customer from './Customer';
import Seller from './Seller';
import Product from './Product';
import Home from './Home';
import About from './About';
import DataLayout from './DataLayout';
import ProductDetail from './ProductDetail';
import Image from './Image';
import NotFound from './NotFound';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/images/*' element={<Image />} />
        <Route path='/data' element={<DataLayout />}>
          <Route index element={<Data />} />
          <Route path='customers' element={<Customer />} />
          <Route path='sellers' element={<Seller />} />
          <Route path='products' element={<Product />} />
          <Route path='products/:id' element={<ProductDetail />} />
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
