const axios = require('axios');

const LOAD_API_URL = 'http://3.34.124.249:5000/load'
const AUTH_API_URL = 'http://3.34.124.249:5000/auth'
const TEMP_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25pY2siOiJzYXl1IiwidXNlcl9wdyI6InNheXUiLCJ0b2RheSI6IjIwMjMwMzI0In0.wbPU24twJ_XujBc7LxKlTq29ncI2gDgi97CGMQDuld4'

async function getAuthToken(userNick, userPW) {
  try {
    const response = await axios.post(AUTH_API_URL, {
      userNick: userNick,
      userPW: userPW,
	  token: TEMP_TOKEN,
    });
	  
	console.log('userNick', userNick);
	console.log('userPW', userPW);
	console.log('flag', "chatHistory token API called");

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

async function getChatHistory(userNick, userPW) {
  try {
    // Get the token from the auth API
    //const token = await getAuthToken(userNick, userPW);
	//console.log('chathistory token: ', token);

    // Send the message and token to the chat API
	console.log('userNick', userNick)
	console.log('userPW', userPW)
    const response = await axios.post(LOAD_API_URL, {
      userNick: userNick,
      userPW: userPW,
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('서버 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    }
  } catch (error) {
    console.error(`Error while calling chat API: ${error.message}`);
    throw error;
  }
}

module.exports = {
  getChatHistory,
};