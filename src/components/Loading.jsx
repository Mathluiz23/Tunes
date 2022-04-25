import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Loading extends Component {
  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <span className="loading">Carregando...</span>
      );
    }
    return '';
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
