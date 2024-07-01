import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const ProductDetailPage = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`/api/categories/Laptop/products/${productid}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <Container>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <div>
          <Typography variant="h4">{product.productName}</Typography>
          <Typography variant="body1">Company: {product.company}</Typography>
          <Typography variant="body1">Category: {product.category}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
          <Typography variant="body1">Rating: {product.rating}</Typography>
          <Typography variant="body1">Discount: {product.discount}%</Typography>
          <Typography variant="body1">Availability: {product.availability}</Typography>
        </div>
      )}
    </Container>
  );
};

export default ProductDetailPage;
