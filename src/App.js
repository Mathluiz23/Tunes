import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import Routes from './routes/Route';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
