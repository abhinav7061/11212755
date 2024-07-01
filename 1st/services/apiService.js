const axios = require('axios');

const TEST_SERVER_URL = 'http://20.244.56.144/test'; // we can put it into the .env file to side it
const COMPANY_NAME = 'goMart';
const OWNER_NAME = 'Abhinav Kumar';
const ROLL_NO = '11212755';
const OWNER_EMAIL = 'abhinavkumar93043@gmail.com';

let clientID = 'eed0a699-95ed-421b-b7d5-41dc7b280461';
let clientSecret = 'szZswLzQROxeyPJk';
let accessToken = '';

const obtainAuthToken = async () => {
  try {
    const response = await axios.post(`${TEST_SERVER_URL}/auth`, {
      companyName: COMPANY_NAME,
      clientID,
      clientSecret,
      ownerName: OWNER_NAME,
      ownerEmail: OWNER_EMAIL,
      rollNo: ROLL_NO,
    });
    accessToken = response.data.access_token;
  } catch (error) {
    console.error('Error obtaining auth token:', error.response ? error.response.data : error.message);
  }
};

const fetchProductsFromCompany = async (companyName, categoryName, minPrice, maxPrice, topN) => {
  try {
    const response = await axios.get(`${TEST_SERVER_URL}/companies/${companyName}/categories/${categoryName}/products`, {
      params: { top: topN, minPrice, maxPrice },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products from ${companyName}:`, error.response ? error.response.data : error.message);
    return [];
  }
};

module.exports = {
  obtainAuthToken,
  fetchProductsFromCompany,
};
