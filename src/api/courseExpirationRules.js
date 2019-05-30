import axios from 'axios';
import { getCookie } from '../util';

export const getCourseExpirationRules = (boardProvTypeId) => {
  const authToken = getCookie( process.env.REACT_APP_SECURE_COOKIE);
  return axios.request({
    method: 'get',
    url: `http://localhost:4000/settings/course/expiration/${boardProvTypeId}`,
    headers: {
      Authorization: `Bearer up8bvgyZ9mQn4G8Tmbz965sh4JV-GAiMrVGGDaVlhrPDc0G9Ebz8lQaA2nRT_IAlh66bn-uu8uT65N5yn1IVLA52OpnGLdhPBMH9fNlwYnK7pXHdtPmLyBq9KyGKIhDwgif8UgPTtydsbvyHkX_w1SWuNIXxFYDx4jA28fwmawnYJ0hWiCF1Zc8O18N2pxR0Cv4lmNENchXN8hM1Pn_pPPe7gsBz70wMGCoeCwNcomoLvqK1_Pk4OY72ikX7bE5Z7l6XStHCp0r5u3KA7ZOceeI9Swelt0OU3chUdC2uAWs19kieon0OdSbHe53-X1vh1ujV2FJelBvauxstsM_z7qy-QJ0U-nSHYQ7ZmIF2rzkdEx5nL0XlfGBPtHI4Fenq-HDjNPF1BjUgfoaZ20kZGIQ8nM-F81tWWoAlMzQILdODCIp01ScAq-H0L_ZGDbNh4B7-ok4wQUsaHoxGGcmUVP_EIa4`
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
      Authorization: `Bearer up8bvgyZ9mQn4G8Tmbz965sh4JV-GAiMrVGGDaVlhrPDc0G9Ebz8lQaA2nRT_IAlh66bn-uu8uT65N5yn1IVLA52OpnGLdhPBMH9fNlwYnK7pXHdtPmLyBq9KyGKIhDwgif8UgPTtydsbvyHkX_w1SWuNIXxFYDx4jA28fwmawnYJ0hWiCF1Zc8O18N2pxR0Cv4lmNENchXN8hM1Pn_pPPe7gsBz70wMGCoeCwNcomoLvqK1_Pk4OY72ikX7bE5Z7l6XStHCp0r5u3KA7ZOceeI9Swelt0OU3chUdC2uAWs19kieon0OdSbHe53-X1vh1ujV2FJelBvauxstsM_z7qy-QJ0U-nSHYQ7ZmIF2rzkdEx5nL0XlfGBPtHI4Fenq-HDjNPF1BjUgfoaZ20kZGIQ8nM-F81tWWoAlMzQILdODCIp01ScAq-H0L_ZGDbNh4B7-ok4wQUsaHoxGGcmUVP_EIa4`
    },
    timeout: 120000,
    data
      
  });

  
};



