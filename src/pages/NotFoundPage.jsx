import React, { Component } from 'react';
import '../styles/NotFound.css';

class NotFoundPage extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <h1 className="not-found">Página não encontrada</h1>
      </div>
    );
  }
}

export default NotFoundPage;
