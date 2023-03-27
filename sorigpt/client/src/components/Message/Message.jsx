import React from 'react';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Linkify from 'react-linkify';

import style from './Message.module.scss';
import otherUserIcon from './penguin.png';

const Message = ({userId, text, showName, myId}) => {
    const isMyMessage = userId === myId;
	
	const linkDecorator = (href, text, key) => (
	<a href={href} key={key} target="_blank" rel="noopener noreferrer">
	  {text}
	</a>
	);
	
	const userInitial = userId.charAt(0).toUpperCase();

	return (
		<ListItem className={isMyMessage ? style.Message__my : style.Message__other} style={{ display: 'flex', alignItems: 'flex-start' }}>
			{isMyMessage ? (
				<div className={`${style.Message__icon} ${isMyMessage ? style.Message__my_icon : ''}`}>
				  	{userInitial}
				</div>
			) : (
				<img
				    src={otherUserIcon}
				    alt="Other user"
				    className={style.Message__icon}
				    style={{ objectFit: 'cover' }}
				/>
			)}
			<div className={`${style.Message__content} ${isMyMessage ? style.Message__my_content : ''}`}>
				{showName && <div style={{ display: 'none' }}>{userId}</div>}
				<div className={`${style.Message__text} ${isMyMessage ? style.Message__my__text : ''}`}>
				    <Linkify componentDecorator={linkDecorator}>{text}</Linkify>
				</div>
			</div>
		</ListItem>
	);
};

export default Message;