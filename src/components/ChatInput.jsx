import { useState } from 'react'
import dayjs from 'dayjs';
import {Chatbot} from 'supersimpledev'
import './ChatInput.css'

export default function ChatInput({chatMessages, setChatMessages}) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event){
        setInputText(event.target.value)
    }

    async function sendMessage() {
        if(isLoading || inputText == ''){
            return;
        }

        setInputText('');
        setIsLoading(true);

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ];
        setChatMessages(newChatMessages);
        setChatMessages([
            ...newChatMessages,
            {
                message: 'Loading...',
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);
        
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }]
        );

        setIsLoading(false);
    }

    function clearMessages(){
        setChatMessages([]);
    }

    function handleKeyDowm(event){
        if(event.key == 'Enter'){
            sendMessage();
        } else if(event.key == 'Escape'){
            setInputText('');
        }
    }

    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                placeholder="Send a message to Chatbot" 
                size="30"
                onChange={saveInputText}
                onKeyDown={handleKeyDowm}
                value={inputText} // Controlled Input
                autoFocus
            />
            <button 
                className="send-button"
                onClick={sendMessage}
            >
                Send
            </button>
            <button 
                className="clear-button"
                onClick={clearMessages}
            >
                Clear
            </button>
        </div>
    );
}