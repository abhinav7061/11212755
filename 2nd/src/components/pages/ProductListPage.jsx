import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minRating: '',
    minPrice: '',
    maxPrice: '',
    availability: '',
    sort: '',
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/categories/${filters.category}/products`, { params: filters });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      company: '',
      minRating: '',
      minPrice: '',
      maxPrice: '',
      availability: '',
      sort: '',
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>

      {/* Filters Section */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={handleFilterChange}
              name="category"
              fullWidth
            >
              {/* Populate categories dynamically */}
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="Phone">Phone</MenuItem>
              {/* Add more categories as needed */}
            </Select>
          </FormControl>
        </Grid>

        {/* Add more filter components (company, rating, price range, availability, sort) */}

        <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>

      {/* Product List */}
      <Grid container spacing={2}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Typography variant="subtitle1">{product.productName}</Typography>
              <Typography variant="body2">Company: {product.company}</Typography>
              <Typography variant="body2">Category: {product.category}</Typography>
              <Typography variant="body2">Price: ${product.price}</Typography>
              <Typography variant="body2">Rating: {product.rating}</Typography>
              <Typography variant="body2">Discount: {product.discount}%</Typography>
              <Typography variant="body2">Availability: {product.availability}</Typography>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ProductListPage;
