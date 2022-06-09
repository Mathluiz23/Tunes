import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {
  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <span className="loading" />
      );
    }
    return '';
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
