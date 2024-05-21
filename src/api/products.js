import axios from 'axios';
import { APP_API_URL } from '@/api/consts.js'
const getProducts = async (filter) => {
  try {

    const response = await axios.get(APP_API_URL + "api/product/productsList", {
      params: {
        Offset: filter.offset,
        PageSize: filter.pageSize,
        SearchQuery: filter.searchQuery,
        OrderBy: filter.column ? `${filter.column} ${filter.order}` : null,
      }
    });
    return response;
  } catch (error) {
    // Handle error here
    throw error;
  }
}

const getUnitLookups = async (filter) => {
  try {

    const response = await axios.get(APP_API_URL + "api/unit");
    return response;
  } catch (error) {
    // Handle error here
    throw error;
  }
}

const createProduct = async (product) => {


  const response = await axios.post(APP_API_URL + "api/Product/CreateProduct", product);
  return response;

}

const editProduct = async (product) => {

  const response = await axios.put(APP_API_URL + "api/Product/UpdateProduct", product);
  return response;

}

const deleteProduct = async (productId) => {
  try {

    const response = await axios.delete(APP_API_URL + "api/Product/deleteProduct/" + productId);
    return response;
  } catch (error) {
    // Handle error here
    throw error;
  }
}


export { getProducts, getUnitLookups, createProduct, editProduct, deleteProduct };