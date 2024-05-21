import axios from 'axios'; // Ensure the path matches where your axios instance is configured
import {APP_API_URL} from '@/api/consts.js'

const getSuppliers = async (filter) => {
    const response = await axios.get(APP_API_URL+'api/Supplier/SuppliersList', {
      params: {
        Offset: filter.offset,
        PageSize: filter.pageSize,
        SearchQuery: filter.searchQuery,
        OrderBy: filter.column?`${filter.column} ${filter.order}`:null,
      }
    });
    return response;
  
}



const createSupplier=async (supplier)=>{
  try {

    const response = await axios.post(APP_API_URL+"api/Supplier/CreateSupplier",supplier);
    return response;
  } catch (error) {
    // Handle error here
    throw error;
  }
}

const editSupplier=async (supplier)=>{
  try {

    const response = await axios.put(APP_API_URL+"api/Supplier/UpdateSupplier",supplier);
    return response;
  } catch (error) {
    // Handle error here
    throw error;
  }
}

const deleteSupplier=async (supplierId)=>{
  try {

    const response = await axios.delete(APP_API_URL+"api/supplier/DeleteSupplier/"+supplierId);
    return response;
  } catch (error) {
    // Handle error here
    throw error;
  }
}


export { getSuppliers , createSupplier, editSupplier , deleteSupplier };