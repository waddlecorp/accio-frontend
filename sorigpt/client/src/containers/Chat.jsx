import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

import ChatComp from '../components/Chat';
import { SocketContext } from '../contexts/SocketContext';

const Chat = () => {
    const { roomId, userId } = useParams();
    const { joinRoom, sendMessage, updateMessage } = useContext(SocketContext);
    const [ messages, setMessages ] = useState([]);
	const [ isGeneratingAnswer, setIsGeneratingAnswer ] = useState(false);
    const navigate = useNavigate();
	//const inputRef = useRef(null);

	// if (!roomId || !userId) {
	// roomId = localStorage.getItem("roomId");
	// userId = localStorage.getItem("userId");
	// }
	
    const addMessage = (message) => {
        setMessages((prev) => prev.concat(message));
    }
	
	const fetchChatHistory = async () => {
		console.log("flag1", roomId, userId)
		try {
			const response = await axios.post('https://accio-server.run.goorm.app/chatHistory', {
				userNick: roomId,
				userPW: userId,
			});
			console.log(response.data)
			if (response.data) {
				console.log("response: ", response.data)
				const formattedChatHistory = response.data.res.map((chat, index) => {
					return {
						userId: chat.role === 'user' ? userId : 'Accio',
						message: chat.content,
					};
				});
				setMessages(formattedChatHistory);
			} else {
				throw new Error('Invalid server response');
			}
		} catch (error) {
			console.error(`Error while fetching chat history: ${error.message}`);
			//toast.error('이전 대화내역 불러오기를 실패했습니다..');
		}
	};

	// useEffect(() => {
	// 	async function initializeChat() {
	// 		try {
	// 			await joinRoom({ userId, roomId });
	// 			await fetchChatHistory();
	// 			updateMessage(addMessage);
	// 		} catch (error) {
	// 			console.log("error: ", error);
	// 			fetchChatHistory();
	// 		}
	// 	}

	//   initializeChat();
	// }, []);	
	
	useEffect(() => {
		try {
			joinRoom({userId, roomId});
			updateMessage(addMessage);
			//fetchChatHistory();
		} catch (error) {
			navigate('/');
			console.log('error: ', error)
			//fetchChatHistory();

		}
	}, []);

	
	const getChatbotReply = async (userMessage, roomId, userId) => {
		try{
			const token = localStorage.getItem("token");
			console.log('token: ', token)
			if (token == null || token == undefined) {
				console.log(userMessage, roomId, userId, "token not exists")
				const getTokenRes = await axios.post('https://accio-server.run.goorm.app/getToken', {
					userNick: roomId,
					userPW: userId,
				});				
				if (getTokenRes.data && getTokenRes.data.token) {
					const newToken = getTokenRes.data.token;
					localStorage.setItem("token", newToken);
				} else {
					throw new Error('Invalid Token');
					const newToken = '';
				}
				//test code
				const test = localStorage.getItem("token");
				console.log('localstorage: ', test)


				setIsGeneratingAnswer(true);
				const response = await axios.post('https://accio-server.run.goorm.app/chatbot', {
					message: userMessage,
					userNick: roomId,
					userPW: userId,
					token: token
				});
				setIsGeneratingAnswer(false);

				if (response.data && response.data.reply) {
					return response.data.reply;
				} else {
					throw new Error('Invalid server response');
				}			

			} else {
				console.log(userMessage, roomId, userId, token, "token exists")
				setIsGeneratingAnswer(true);
				const response = await axios.post('https://accio-server.run.goorm.app/chatbot', {
					message: userMessage,
					userNick: roomId,
					userPW: userId,
					token: token
				});
				setIsGeneratingAnswer(false);

				if (response.data && response.data.reply) {
					return response.data.reply;
				} else {
					throw new Error('Invalid server response');
				}

			}
		
// 		try {
		} catch (error) {
			  console.error(`Error while calling chatbot API: ${error.message}`);
			  return '현재 서버 이용량이 많아 일시적으로 이용이 제한될 수 있습니다. 잠시 후에 다시 이용해주세요.';
		}
	};
    
    const submitMessage = async (message) => {
        if(message.trim()) {
            sendMessage({roomId, userId, message});
			const chatbotReply = await getChatbotReply(message, roomId, userId);
      		sendMessage({ roomId, userId: 'Accio', message: chatbotReply });
			//inputRef.current.focus();
        } else {
            toast.error("메세지를 입력해주세요.")
        }
        
    }
    console.log(isGeneratingAnswer)
    return (<ChatComp submitMessage={submitMessage} messages={messages} myId={userId} isGeneratingAnswer={isGeneratingAnswer} fetchChatHistory={fetchChatHistory}/>);
}

export default Chat;
