const axios = require('axios');

const AUTH_API_URL = 'http://3.34.124.249:5000/auth'

async function getToken(userNick, userPW) {
  try {
	  
	console.log('userNick', userNick);
	console.log('userPW', userPW);
	console.log('flag', "getToken API called");

    const response = await axios.post(AUTH_API_URL, {
      userNick: userNick,
      userPW: userPW,
	  token: '',
    });

	console.log("getToken API response");

	  
    if (response.data && response.data.token) {
      return response.data.token;
    } else {
      throw new Error('Authentication failed. Please check your credentials.');
    }
  } catch (error) {
    console.error(`Error while calling auth API: ${error.message}`);
    throw error;
  }
}


module.exports = {
  getToken,
};