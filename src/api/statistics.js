import axios from 'axios';
import { APP_API_URL } from '@/api/consts.js'
const getStatistic = async (searchUrl) => {
  try {

    const response = await axios.get(APP_API_URL + searchUrl);
    return response;
  } catch (error) {
    // Handle error here
    throw error;
  }
}

export { getStatistic }