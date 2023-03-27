import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";

import Main from './pages/main';
import Chat from './pages/chat';
import './global.scss';
import { SocketContextProvider } from './contexts/SocketContext';


const App = () => {
    return (
        <HashRouter>
            <SocketContextProvider>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/chat-room/:roomId/:userId" element={<Chat />} />
              </Routes>
            </SocketContextProvider>
        </HashRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
