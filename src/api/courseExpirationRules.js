import axios from 'axios';
import { getCookie } from '../util';

export const getCourseExpirationRules = (boardProvTypeId) => {
  const authToken = getCookie( process.env.REACT_APP_SECURE_COOKIE);
  return axios.request({
    method: 'get',
    url: `https://api.providers.test.cebroker.com/settings/course/expiration/${boardProvTypeId}`,
    headers: {
      Authorization: `Bearer 416X4pANYDAda73Ey6I5TGo1g0CBvCBNVPEPytRiuXijVsb5bZWtuQuKnVZWhPIBg3ZufE5YZLkK8HjLb4ak_NDMmhsqqr558iMTWG5rDVxIvsJMr0sQjzNZApZ1MwcHunmqL6-YDM28IXnt42x0-8brloJCqUlQ4NMfIPofmFJG1D8OiDqmiqhzfD6f-hRlnJDGyEa_uhXWXdrscFXPi2RdOkpzEKBoTmaC9Q7_6QEOWPbjjvP_bqh2uApNuwLHObmaWY6IBdLsOvJePa_xqBHWjRhuHLg4HA8JaDWSlLy4uFsrK8bnlJnvhLPTd116o2CNuPwm_dn6ihVxAPz6lyBhTjXtvHlE8XHyhAhFNqHMzCDaubzOm_cB493X21JKbETNpA1iWEBgGdXr5X40j3x6IEtvCCMIGNDA_qG6xD8cGBMEOezxZOm8909UhkrQ8TgCBbvX5HSvwj8tCqOoIYDyGwE`
    },
    timeout: 120000

  });


};

export const postCourseExpirationRules = (data) => {
  const authToken = getCookie( process.env.REACT_APP_SECURE_COOKIE);

  return axios.request({
    method: 'post',
    url: `https://api.providers.test.cebroker.com/settings/course/expiration`,
    headers: {
      Authorization: `Bearer 416X4pANYDAda73Ey6I5TGo1g0CBvCBNVPEPytRiuXijVsb5bZWtuQuKnVZWhPIBg3ZufE5YZLkK8HjLb4ak_NDMmhsqqr558iMTWG5rDVxIvsJMr0sQjzNZApZ1MwcHunmqL6-YDM28IXnt42x0-8brloJCqUlQ4NMfIPofmFJG1D8OiDqmiqhzfD6f-hRlnJDGyEa_uhXWXdrscFXPi2RdOkpzEKBoTmaC9Q7_6QEOWPbjjvP_bqh2uApNuwLHObmaWY6IBdLsOvJePa_xqBHWjRhuHLg4HA8JaDWSlLy4uFsrK8bnlJnvhLPTd116o2CNuPwm_dn6ihVxAPz6lyBhTjXtvHlE8XHyhAhFNqHMzCDaubzOm_cB493X21JKbETNpA1iWEBgGdXr5X40j3x6IEtvCCMIGNDA_qG6xD8cGBMEOezxZOm8909UhkrQ8TgCBbvX5HSvwj8tCqOoIYDyGwE`
    },
    timeout: 120000,
    data

  });


};
