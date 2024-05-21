import axios from 'axios';
import {APP_API_URL}  from '@/api/consts.js'
const getItems = async (searchUrl,filter) => {
  try {

    const response = await axios.get(APP_API_URL+searchUrl, {
      params: {
        Offset: filter.offset,
        PageSize: filter.pageSize,
        SearchQuery: filter.searchQuery,
        OrderBy: filter.column?`${filter.column} ${filter.order}`:null,
      }
    });
    return response;
  } catch (error) {
    // Handle error here
    console.error('There was an error fetching the suppliers:', error);
    throw error;
  }
}

export { getItems };