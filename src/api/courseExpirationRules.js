import axios from 'axios';
import { getCookie } from '../util';

export const getCourseExpirationRules = (boardProvTypeId) => {
  const authToken = getCookie( process.env.REACT_APP_SECURE_COOKIE);
  return axios.request({
    method: 'get',
    url: `http://localhost:4000/settings/course/expiration/${boardProvTypeId}`,
    headers: {
      Authorization: `Bearer KTlwomGllOaRH1M4EDNDHx88cshx6CrCcESf2-ehl9INjTtqp75wenpiNAkNlE0ga5muI_6c9_AvxB0hL1bwu8FpgLHPc82jRV31Me0qojjdn64pGkwN2X6RC_4AzzkTtMAm05T7M7bEGjkPCD5tG43YN2gTOPd7E2sfsOM-2w5AqeDX310yJLChY4h6RBT7W97aGWbECWzZeTFn-KiivDp9gXwp6FcU5OitenxAKLYcbU99Py9e6GYxbQavqmrIuh9LwDsXMfvI5LGqYQIcoP4RIpCqDadk4HVvxyrSFD3FYjmLDw36ft6EqgP7Mmpmx4wbTv7IYbhKN7S7l8N4Nt-8PO9AfHpYKXtbMHM7zKUKmhBXxzC9T0Qrv74fXZC0g0kuxoyH_KZjuGXlLGzHII-mIXw0VQ98ZkwviXihNH2VJXBvzNPjzN6sd2cy-Z1WBz2yGIZCp4zhg03qq-YH-4yrqMs`
    },
    timeout: 120000
      
  });

  
};

export const postCourseExpirationRules = (data) => {
  const authToken = getCookie( process.env.REACT_APP_SECURE_COOKIE);
  
  return axios.request({
    method: 'post',
    url: `http://localhost:4000/settings/course/expiration`,     
    headers: {
      Authorization: `Bearer KTlwomGllOaRH1M4EDNDHx88cshx6CrCcESf2-ehl9INjTtqp75wenpiNAkNlE0ga5muI_6c9_AvxB0hL1bwu8FpgLHPc82jRV31Me0qojjdn64pGkwN2X6RC_4AzzkTtMAm05T7M7bEGjkPCD5tG43YN2gTOPd7E2sfsOM-2w5AqeDX310yJLChY4h6RBT7W97aGWbECWzZeTFn-KiivDp9gXwp6FcU5OitenxAKLYcbU99Py9e6GYxbQavqmrIuh9LwDsXMfvI5LGqYQIcoP4RIpCqDadk4HVvxyrSFD3FYjmLDw36ft6EqgP7Mmpmx4wbTv7IYbhKN7S7l8N4Nt-8PO9AfHpYKXtbMHM7zKUKmhBXxzC9T0Qrv74fXZC0g0kuxoyH_KZjuGXlLGzHII-mIXw0VQ98ZkwviXihNH2VJXBvzNPjzN6sd2cy-Z1WBz2yGIZCp4zhg03qq-YH-4yrqMs`
    },
    timeout: 120000,
    data
      
  });

  
};



