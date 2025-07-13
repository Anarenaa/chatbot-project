import dayjs from 'dayjs'
import RoborProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import './ChatMessage.css';

export default function ChatMessage({ message, sender, time }) {
    return (
        <div className={ sender === "user" ? "chat-message-user" : "chat-message-robot" }>
            {sender == 'robot' && (
                <img src={RoborProfileImage} className="chat-message-profile" />
            )}

            <div className="chat-message-text">
                {message}
                {time && (
                    <div className='chat-message-time'>
                        {dayjs(time).format('HH:mm')}
                    </div>
                )}
            </div>
            
            {sender == 'user' && (
                <img src={UserProfileImage} className="chat-message-profile" />
            )}
        </div>
    );
}