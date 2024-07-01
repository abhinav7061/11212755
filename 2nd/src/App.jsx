import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './components/pages/ProductListPage';
import ProductDetailPage from './components/pages/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" index component={ProductListPage} />
        <Route path="/product/:productid" component={ProductDetailPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
