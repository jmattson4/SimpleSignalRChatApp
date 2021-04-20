import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <h1>Signal R Chat Application w/ React</h1>
            <p>This application is built with ASP.NET Core with Signal R for realtime messaging.</p>
            <p>Navigate to the Chat route to begin messaging. This server will send messages to all those who are currently in the chat room.</p>
      </div>
    );
  }
}
