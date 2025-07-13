import { useEffect, useState } from 'react'
import { Chatbot } from 'supersimpledev'

import ChatMessages from './components/ChatMessages'//extension .jsx adds automatically
import ChatInput from './components/ChatInput' 

import './App.css'

function App() {
    //chatMessages - the first return of React.useState - data
    //setChatMessages - the second return of React.useState - updater function
    const [chatMessages, setChatMessages] = useState(
        JSON.parse(localStorage.getItem('messages')) || []
    );

    useEffect(() => {
        Chatbot.addResponses({
            'goodbye': 'Goodbye. Have a great day!',
            'give me a unique id': function() {
                return `Sure! Here's a unique ID: ${
                    crypto.randomUUID()
                }`;
            },
            'wish me good luck': 'Sure! Good luck, whatever it is it\'ll be okay!',
            'love you': 'So do I!',
            'hi': 'Hellooooo! Nice to see you here. What are you up for?'
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(chatMessages))
    }, [chatMessages])

    return (
        <div className="app-container">
            {chatMessages.length === 0 && (
                <p className="welcome-message">
                    Welcome to the chatbot project! Send a message using the textbox below.
                </p>
            )}
            <ChatMessages 
                chatMessages={chatMessages} // через атрибут передаємо інформацію (список) в функцію компонента
            />
            <ChatInput 
                chatMessages={chatMessages} // через атрибут передаємо інформацію (список) в функцію компонента
                setChatMessages={setChatMessages} // через атрибут передаємо updater в функцію компонента
            />
        </div>
    );
}

export default App
