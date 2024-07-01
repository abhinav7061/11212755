const { v4: uuidv4 } = require('uuid');
const { fetchProductsFromCompany } = require('../services/apiService');

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

const getTopProducts = async (req, res) => {
  const { categoryname } = req.params;
  const { n = 10, page = 1, minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER, sort, order = 'asc' } = req.query;
  const limit = parseInt(n);
  const offset = (parseInt(page) - 1) * limit;

  try {
    let allProducts = [];

    for (const company of companies) {
      const products = await fetchProductsFromCompany(company, categoryname, minPrice, maxPrice, limit);
      allProducts = allProducts.concat(products);
    }

    let sortedProducts = allProducts;

    if (sort) {
      sortedProducts = allProducts.sort((a, b) => {
        if (order === 'asc') {
          return a[sort] > b[sort] ? 1 : -1;
        } else {
          return a[sort] < b[sort] ? 1 : -1;
        }
      });
    }

    const paginatedProducts = sortedProducts.slice(offset, offset + limit);
    const productsWithUniqueId = paginatedProducts.map(product => ({
      ...product,
      id: uuidv4(),
    }));

    res.json(productsWithUniqueId);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  const { categoryname, productid } = req.params;

  try {
    let product = null;
    for (const company of companies) {
      const products = await fetchProductsFromCompany(company, categoryname, 0, Number.MAX_SAFE_INTEGER, 1000); // Adjust limit if necessary
      product = products.find(p => p.id === productid);
      if (product) break;
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};

module.exports = {
  getTopProducts,
  getProductById,
};
