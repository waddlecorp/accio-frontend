// import { useEffect, createContext, useRef, useState } from "react";
// import io from "socket.io-client";

// export const SocketContext = createContext();

// export const SocketContextProvider = ({ children }) => {
//   // const socketRef = useRef();

//   // useEffect(() => {
//   //   socketRef.current = io(process.env.REACT_APP_SERVER_URL, () => {
//   //     console.log("Socket connected");
//   //   });
//   //   return () => {
//   //     socketRef.current.disconnect();
//   //   };
//   // }, []);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io(process.env.REACT_APP_SERVER_URL);
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);


//   const joinRoom = async ({ roomId, userId }) => {
//     socket && socket.emit("JOIN_ROOM", { userId, roomId });
//   };

//   const sendMessage = ({ roomId, userId, message }) => {
//     socket && socket.emit("SEND_MESSAGE", { roomId, userId, message });
//   };

//   const updateMessage = (func) => {
//     socket && socket.on("UPDATE_MESSAGE", (msg) => func(msg));
//   };
	
//   // const joinRoom = async ({ roomId, userId }) => {
//   //   if (socketRef.current) {
//   //     socketRef.current.emit("JOIN_ROOM", { userId, roomId });
//   //   }
//   // };

//   // const sendMessage = ({ roomId, userId, message }) => {
//   //   if (socketRef.current) {
//   //     socketRef.current.emit("SEND_MESSAGE", { roomId, userId, message });
//   //   }
//   // };

//   // const updateMessage = (func) => {
//   //   if (socketRef.current) {
//   //     socketRef.current.on("UPDATE_MESSAGE", (msg) => func(msg));
//   //   }
//   // };

//   return (
//     <SocketContext.Provider value={{ joinRoom, sendMessage, updateMessage }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };


import { useEffect, createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    let socket;
    
    useEffect(()=>{
        socket = io(process.env.REACT_APP_SERVER_URL);
        return () => {
            socket.disconnect();
        }
    }, [])

    const joinRoom = ({roomId, userId}) => {
        socket.emit('JOIN_ROOM', {userId, roomId}); 
    }
    
    const sendMessage = ({roomId, userId, message}) => {
        socket.emit('SEND_MESSAGE', {roomId, userId, message});
    }
    
    const updateMessage = (func) => {
        socket.on('UPDATE_MESSAGE', (msg) => func(msg));
    }

    
    return (
        <SocketContext.Provider value={{joinRoom, sendMessage, updateMessage}}>
            {children}
        </SocketContext.Provider>
    );
}