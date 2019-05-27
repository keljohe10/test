import axios from 'axios';
import config from '../config/development.config';
import { getCookie } from '../util';

export const getCourseExpirationRules = (boardProvTypeId) => {
  const authToken = getCookie(config.secureCookie);
  return axios.request({
    method: 'get',
    url: `${config.specialRulesUrl}/settings/course/expiration`,
    headers: {
      Authorization: `Bearer Uy_03_z9aF2TKoyUuR4f12XosEPuqD73pAEEPgEuNaL5NGXWb7AmxcGCErRk0Y7YJO3ByK9ur1mp5tVd-swRhV6z552io6Gnk0xB2_JetK6CoDe4UKdN3u30QxDzbrazeZQQjVG7T8IQ-N19EscHwuo8FOTX51UaIBDPydTMmLn8d3R2drNNH2ZqBeR7NFG48qu2JX63dn596upaGX06LPaIXosTGcQJ0Hyc1dJlwPx5UlsGVgAXu9TXzGl9LrTUcaeW7l07USFQnlVlBoPOo1zRtsG5f4iCK1znbYwz7-tjnnL897i13yz-ZJhJaQhpToJeHoEK9AzBBr2xrmgUFtykRqtR_EJOniEqKcV79dg6S-qgB5MIez4wa0IPjvP2FHPUCqyyeDLZX0g5lhXOSyrn96IGhloB_bVJIiySpSshGEA81kGHELRgnn9kzu5gg6mLLNC4K2u3JIhryPJgJlVkTp4`
    },
    data: {
        boardProvTypeId
    }
  });
};
