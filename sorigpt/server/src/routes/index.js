const express = require('express');
const router = express.Router();
const { getChatbotReply } = require('../chatbot');
const { getChatHistory } = require('../chatHistory');
const { getToken } = require('../getToken');

router.post('/chatbot', async (req, res) => {
  console.log('Chatbot route called'); // Add this line to check if the route is called
  try {
    const userMessage = req.body.message;
	const userNick = req.body.userNick;
	const userPW = req.body.userPW
	const token = req.body.token
	
    const chatbotReply = await getChatbotReply(userMessage, userNick, userPW, token);

    res.status(200).json({ reply: chatbotReply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/chatHistory', async (req, res) => {
  console.log('Chat history route called'); // Add this line to check if the route is called
  try {
    const userNick = req.body.userNick;
	const userPW = req.body.userPW
	console.log(userNick);
	console.log(userPW);
    const chatHistory = await getChatHistory(userNick, userPW);

    res.status(200).json({ res: chatHistory });
  } catch (error) {
    //res.status(500).json({ error: error.message });
	  
  }
});

router.post('/getToken', async (req, res) => {
  console.log('token route called'); // Add this line to check if the route is called
  try {
    const userNick = req.body.userNick;
	const userPW = req.body.userPW
	console.log(userNick);
	console.log(userPW);
    const token = await getToken(userNick, userPW);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

