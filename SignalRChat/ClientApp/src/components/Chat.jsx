import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr'

function Chat() {
    const [chatState, setChatState] = useState({
        nick: '',
        message: '',
        hubConnection: null
    })
    //state to hold messages.
    const [messages, setMessages] = useState([]);

    //Send a message to the SignalR Hub on the server
    const sendMessage = () => {
        chatState.hubConnection
            .invoke('sendToAll', chatState.nick, chatState.message)
            .catch(err => console.error(err));

        setChatState({ ...chatState, message: ''})
    }

    //function used to set the message when the input changes.
    const setMessageOnChange = (e) => {
        const value = e.target.value;
        setChatState({ ...chatState, message: value })
    }
    //Runs when the component first loads.
    useEffect(() => {
        const nick = window.prompt('Your name: ', 'John');
        //create hub connection to the local server which has the SignalR hub
        const hubConnection = new HubConnectionBuilder()
            .withUrl('chathub')
            .configureLogging(LogLevel.Information)
            .build();
        //set the chatstate then run a function once its been set to initiate the connection and 
        //  start receiving messages from the server.
        setChatState({ ...chatState, nick: nick, hubConnection: hubConnection  })
    }, [])

    // This useEffect runs when the hubConnection is no longer null
    useEffect(() => {
        if (chatState.hubConnection !== null) {
            chatState.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log(`Error while establishing connection: ${err}`));

            chatState.hubConnection.on('sendToAll', (nick, receivedMessage) => {
                const text = `${nick}: ${receivedMessage}`;
                setMessages(prev => {
                    return [...prev, text];
                });
            })
        }
    }, [chatState.hubConnection])

    return (
        <div>
            <br />
            <input type="text" value={chatState.message} onChange={setMessageOnChange} />
            <button onClick={sendMessage}>Send</button>
            <div>
                {messages.map((message, index) => (
                    <span style={{ display: 'block' }} key={index}> {message} </span>
                ))}
            </div>
        </div>
    )
}

export { Chat }