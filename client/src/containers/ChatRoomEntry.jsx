import { useNavigate } from "react-router-dom";

import ChatRoomEntryComp from '../components/ChatRoomEntry';

const ChatRoomEntry = () => {
    const navigate = useNavigate();
	
    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
	
    const enterChatRoom = ({nickname, chatRoomId}) => {
        navigate(`/chat-room/${chatRoomId}/${nickname}`)
		const randomString = generateRandomString(8);
        //navigate(`/chat-room/${chatRoomId}/${chatRoomId}${randomString}`);
    }
    
    return <ChatRoomEntryComp enterChatRoom={enterChatRoom} />
}

export default ChatRoomEntry;
