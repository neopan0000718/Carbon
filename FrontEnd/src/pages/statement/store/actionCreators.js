import axios from 'axios'
import * as constants from './constants';

const API_URL = 'http://localhost:8000/';
//axios.post(`${API_URL}/login`,{...     //測試替換部分

export const getproject = () => {
  return (dispatch) => {
    axios.get('/api/access.json').then((res) => {
      const result = res.data.data;
      dispatch({
        type: constants.GET_PROJECT,
        projectlist: result
      });
    }).catch((error) => {
      console.error('Error fetching access data:', error);
    });
  }
}

export const sendinfo = (PID, startDate, endDate, chartType) => {
  return (dispatch) => {
    axios./*正是對接時用post*/get('/api/AAinfo.json', { PID, startDate, endDate, chartType }).then((res) => {
      const result = res.data.data;
      result? alert('success'):alert('fail')
    }).catch(() => {
      alert('AAsendinfo fail')
    });
  }
}