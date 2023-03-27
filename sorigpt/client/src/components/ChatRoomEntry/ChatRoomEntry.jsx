import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import style from './ChatRoomEntry.module.scss';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const ChatRoomEntry = ({enterChatRoom}) => {
    const [chatRoomId, setChatRoomId] = useState('');
    const [nickname, setNickname] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
    
	const isInvalidNickname = () => {
	    const pattern = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
	    const invalid = nickname.length > 16 || nickname.length < 2 || !pattern.test(nickname);
	    return invalid;
	}

	const isInvalidChatRoomId = () => {
	    const pattern = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣][^\s]{0,14}[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]$/;
	    const invalid = chatRoomId.length > 16 || chatRoomId.length < 2 || !pattern.test(chatRoomId);
	    return invalid;
	}
    
    const onChangeChatRoomId = (e) => {
        const input = e.currentTarget.value;
        setChatRoomId(input);
    }
    
    const onChangeNickname = (e) => {
        const input = e.currentTarget.value;
        setNickname(input);
    }
    
    const handleRememberMe = (event) => {
    	setRememberMe(event.target.checked);
  	};

  	useEffect(() => {
		const savedUsername = localStorage.getItem('username');
		const savedPassword = localStorage.getItem('password');
		
		if (savedUsername && savedPassword) {
			setChatRoomId(savedUsername);
			setNickname(savedPassword);
			setRememberMe(true);
		}
  	}, []);

  	const handleLogin = (event) => {
    	event.preventDefault();
		if (isInvalidChatRoomId()) {
		  toast.error("사용자 이름은 알파벳 또는 숫자로 이루어진 2~16글자만 가능합니다.");
		  return;
		}
		if (isInvalidNickname()) {
		  toast.error("비밀번호는 알파벳 또는 숫자로 이루어진 2~16글자 문자입니다.");
		  return;
		}
    	enterChatRoom({ nickname, chatRoomId });
		
		if (rememberMe) {
		  localStorage.setItem('username', chatRoomId);
		  localStorage.setItem('password', nickname);
		} else {
		  localStorage.removeItem('username');
		  localStorage.removeItem('password');
		}
	};
	
  	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent page refresh on form submission
		handleLogin(e);
  	};
	
	const theme = createTheme({
	    components: {
		    MuiOutlinedInput: {
		        styleOverrides: {
					root: {
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: '#154CCB', // replace 'your-desired-color' with the color you want
						},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: '#154CCB', // replace 'your-desired-color' with the color you want
					    },
					},
		  		},
			},
	  	},
	});
    
    return (
		<ThemeProvider theme={theme}>
			<form onSubmit={handleSubmit}>
				<Stack className={style.ChatRoomEntry} alignItems="center" spacing={2}>
					<div className={style.ChatRoomEntry__title}> 아씨오 ACCIO </div>
					<div className={style.ChatRoomEntry__subtitle}> 회원가입 없이 5초만에 <br/> 인공지능 쇼핑 메이트와 대화하기 </div>
					<TextField label="사용자 이름(Username)" variant="outlined" value={chatRoomId} onChange={onChangeChatRoomId}/>
					<TextField label="비밀번호(Password)" variant="outlined" value={nickname} onChange={onChangeNickname}/>
					<Button size="large" className={style.startButton} type="submit" disableRipple>시작하기</Button>
					
					<FormControlLabel control={
              			<Checkbox checked={rememberMe} onChange={handleRememberMe} name="rememberMe" color = 'default' style={{ marginLeft: "-10px" }} />}
						label={<span style={{ fontFamily: 'NanumSquare', fontSize: '0.9rem'}}> 로그인 정보 저장하기 🙂 </span>}
    					labelPlacement="end"
          			/>
					
					<div className={style.ChatRoomEntry__caption} style={{ marginTop: "70px" }} > ACCIO: (주)와들이 GPT-3.5를 튜닝하여 개발한 상품 추천 챗봇입니다. 2023년 03월 27일 업데이트(1.1). 제휴 제안: waddle@waddlelab.com </div>
				</Stack>
			</form>
		</ThemeProvider>
    );
    
}

export default ChatRoomEntry;