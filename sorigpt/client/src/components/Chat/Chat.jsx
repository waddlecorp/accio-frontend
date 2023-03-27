import { useState, useEffect, useRef } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Message from '../Message';
import style from './Chat.module.scss';

import { Typography as TypographyComponent } from '@mui/material';
import { FiSend } from 'react-icons/fi';
import CircularProgress from '@mui/material/CircularProgress';

//import ReactUrlPreview from 'react-url-preview';


const Chat = ({ messages, submitMessage, myId, isGeneratingAnswer, fetchChatHistory }) => {
    const [input, setInput] = useState('');
	const [isMobileDevice, setIsMobileDevice] = useState(false);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);


    const onChange = (e) => {
        setInput(e.currentTarget.value);
    }
	
	const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isGeneratingAnswer) {
                return;
            }
            onClick();
			if (isMobileDevice) {
				inputRef.current.blur();
			}
        }
    };
	
	const handleButtonClick_fill = (text) => {
		setInput(text);
	}
	
	const handleButtonClick_send = (text) => {
		submitMessage(text);
	}
	
	const handleButtonClick_fetch = () => {
		fetchChatHistory();
	}
	
	const onClick = () => {
		if (isGeneratingAnswer) {
			return;
	  	}
	  	submitMessage(input);
		setInput('');
	}
	
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };
    
	useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setIsMobileDevice(isMobile);
    }, []);
	
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <Container maxWidth="md" className={style.Chat__wrapper} sx={{ display: 'flex', flexDirection: 'column' }}>	
			
			{messages.length === 0 && (
				<div style={{ overflowY: 'scroll', height: `calc(90vh - 2rem)` }}>
					<Stack direction="column" sx={{ mb: '10vh', flex: '0 0 auto', flexWrap: 'wrap' }}>

						<Stack direction="row" sx={{ mb: '2vh', flex: '0 0 auto' }}>
							<Container
								sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "auto", flex: 1, marginTop: '12vh',
									fontFamily: 'NanumSquare', bgcolor: 'white', color: 'black', p: 2, borderRadius: 4, boxShadow: 'none', '&:hover': {backgroundColor: 'white'} }} disableRipple>
								<TypographyComponent variant="h5" align="center" fontWeight="bold">안녕하세요🙋 어떤 상품을 찾아드릴까요?</TypographyComponent>
							</Container>
						</Stack>
						<Stack direction="row" sx={{ mb: '2vh', flex: '0 0 auto' }}>
							<Button
								sx={{ display: "flex", justifyContent: "flex-start", height: "auto", flex: 1, top: '4vh',
									fontFamily: 'NanumSquare', bgcolor: '#F5F5F5', color: 'black', p: 2, borderRadius: 4, boxShadow: 'none', '&:hover': {backgroundColor: '#F5F5F5'} }} disableRipple>
								<TypographyComponent variant="body1" align="left" fontWeight="medium">⚡ 일상적인 대화도 가능하지만 상품 추천에 최적화 되어있어요.</TypographyComponent>
							</Button>
							<Button
								sx={{ display: "flex", justifyContent: "flex-start", height: "auto", flex: 1, top: '4vh', marginLeft: '2vh', marginRight: '2vh',
									fontFamily: 'NanumSquare', bgcolor: '#F5F5F5', color: 'black', p: 2, borderRadius: 4, boxShadow: 'none', '&:hover': {backgroundColor: '#F5F5F5'} }} disableRipple>
								<TypographyComponent variant="body1" align="left" fontWeight="medium">🚧 부정확한 정보가 포함될 수 있어요. 구매 전 상세 정보를 꼭 확인해주세요.</TypographyComponent>
							</Button>
							<Button
								sx={{ display: "flex", justifyContent: "flex-start", height: "auto", flex: 1, top: '4vh',
									fontFamily: 'NanumSquare', bgcolor: '#F5F5F5', color: 'black', p: 2, borderRadius: 4, boxShadow: 'none', '&:hover': {backgroundColor: '#F5F5F5'} }} disableRipple>
								<TypographyComponent variant="body1" align="left" fontWeight="medium">⚠️ 대화내역은 성능 개선에 이용될 수 있어요. 민감정보 유출에 유의해주세요.</TypographyComponent>
							</Button>
						</Stack>
						<Stack direction="row" sx={{ mb: '2vh', flex: '0 0 auto' }}>
							<Button
								onClick={() =>
									handleButtonClick_fill("무라벨 생수 2L 20개 찾아줘")
								}
								sx={{ display: "flex", justifyContent: "flex-start", height: "auto", flex: 1, top: '4vh',
									fontFamily: 'NanumSquare', bgcolor: '#F5F5F5', color: 'black', p: 2, borderRadius: 4, boxShadow: 'none', '&:hover': {backgroundColor: '#D8D8D8'} }} disableRipple>
								<TypographyComponent variant="body1" align="left" fontWeight="medium">💡 "무라벨 생수 2L 20개 찾아줘"</TypographyComponent>
							</Button>
							<Button
								onClick={() =>
									handleButtonClick_fill("집에서 사용할 머그컵 추천해줘 무료배송 상품으로")
								}
								sx={{ display: "flex", justifyContent: "flex-start", height: "auto", flex: 1, top: '4vh', marginLeft: '20px', marginRight: '20px',
									fontFamily: 'NanumSquare', bgcolor: '#F5F5F5', color: 'black', p: 2, borderRadius: 4, boxShadow: 'none', '&:hover': {backgroundColor: '#D8D8D8'} }} disableRipple>
								<TypographyComponent variant="body1" align="left" fontWeight="medium">💡 “회사에서 사용할 대용량 텀블러 추천해줘 무료배송으로”</TypographyComponent>
							</Button>
							<Button
								onClick={() =>
									handleButtonClick_fill("그거 뭐라고 하더라? 모니터 책상에 고정하는 장치 알려줘")
								}
								sx={{ display: "flex", justifyContent: "flex-start", height: "auto", flex: 1, top: '4vh',
									fontFamily: 'NanumSquare', bgcolor: '#F5F5F5', color: 'black', p: 2, borderRadius: 4, boxShadow: 'none', '&:hover': {backgroundColor: '#D8D8D8'} }} disableRipple>
								<TypographyComponent variant="body1" align="left" fontWeight="medium">💡 "그거 뭐라고 하더라? 모니터 책상에 고정하는 장치 알려줘"</TypographyComponent>
							</Button>
						</Stack>
					</Stack>
				</div>
			)}
			
			<List maxWidth="md" className={style.Chat__list} style={{ paddingTop: '12vh', paddingBottom: '3.5rem' }}>
				{messages.map(({userId, message}, index) => 
					<Message
						key={`${userId}_${index}`}
						userId={userId}
						myId={myId}
						text={message}
						//showName={!index || messages[index - 1].userId !== userId}
					/>
			)}
			<div ref={messagesEndRef} />
			</List>
			<Stack maxWidth="md" direction="row" className={style.Chat__input} sx={{ flex: '0 0 auto' }}>
				<TextField 
					className={style.Chat__input__textfield}
					onChange={onChange} 
					value={input}
					inputRef={inputRef}
					onKeyPress={handleKeyPress}
					multiline
					minRows={1}
					maxRows={3}

					InputProps={{
						endAdornment: (
							isGeneratingAnswer ?
							<CircularProgress size={18} /> :
							<Button
								onClick={onClick}
								variant="contained"
								color="primary"
								className={style.Chat__input__button}
								sx={{ minWidth: '2rem', minHeight: '2rem', position: 'absolute', right: '5px', bottom: '12px' }}
							>	<FiSend color="grey"/>
						</Button>
					  )
					}}
				/>
				<Button
					onClick={() =>
						handleButtonClick_fetch()
					}
					variant="contained"
					className={style.Chat__button_restart}
					sx={{ minWidth: '2rem', minHeight: '2rem', position: 'absolute', left: '50%', transform: 'translate(-102.5%, -50%)', top: '-1.75rem',
						fontFamily: 'NanumSquare', bgcolor: 'white', color: 'black', border: '1px solid #ccc', '&:hover': {backgroundColor: '#F5F5F5'} }} disableRipple>
					<TypographyComponent variant="button" align="left" fontWeight="medium">이전 대화내역 불러오기</TypographyComponent>
				</Button>
				<Button
					onClick={() =>
						handleButtonClick_send("새로운 상품 찾을래")
					}
					variant="contained"
					className={style.Chat__button_restart}
					sx={{ minWidth: '2rem', minHeight: '2rem', position: 'absolute', left: '50%', transform: 'translate(2.5%, -50%)', top: '-1.75rem',
						fontFamily: 'NanumSquare', bgcolor: 'white', color: 'black', border: '1px solid #ccc', '&:hover': {backgroundColor: '#F5F5F5'} }} disableRipple>
					<TypographyComponent variant="button" align="left" fontWeight="medium">새로운 상품 물어보기</TypographyComponent>
				</Button>
			</Stack>
			{/*
			<Stack maxWidth="md" direction="row" justifyContent="flex-start" sx={{ fontFamily: 'NanumSquare', bgcolor: 'white', color: '#A9A9A9' }}>
				<TypographyComponent variant="caption" align="left" sx={{ marginTop: '2px' }}>ACCIO는 (주)와들이 GPT-3.5를 튜닝하여 개발한 상품 추천 챗봇입니다. 2023년 03월 25일 업데이트(V1.0). 제휴 및 협력 제안: waddle@waddlelab.com</TypographyComponent>
			</Stack>
			*/}
        </Container>
    )
}

export default Chat;