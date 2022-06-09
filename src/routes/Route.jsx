import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
// import MathTunes from '../components/MathTunes';
import Login from '../pages/LoginPage';
import AlbumPage from '../pages/AlbumPage';
import FavoritePage from '../pages/FavoritePage';
import ProfilePage from '../pages/ProfilePage';
import ProfileEditPage from '../pages/ProfileEditPage';
import NotFoundPage from '../pages/NotFoundPage';
import SearchPage from '../pages/SearchPage';

export default class Content extends Component {
  constructor() {
    super();

    this.state = {
      isLogged: localStorage.getItem('user') !== null,
    };
  }

  render() {
    const { isLogged } = this.state;
    return (
      <>
        { isLogged
          ? (
            <Header />) : ''}
        <main className={ isLogged ? '' : 'login-page' }>
          <Switch>
            <Route exact path="/">
              { isLogged
                ? <Redirect to="/search" />
                : <Login handleSubmit={ () => { this.setState({ isLogged: true }); } } />}
            </Route>
            <Route path="/search" component={ SearchPage } />
            <Route path="/album/:id" component={ AlbumPage } />
            <Route path="/favorites" component={ FavoritePage } />
            <Route exact path="/profile" component={ ProfilePage } />
            <Route path="/profile/edit" component={ ProfileEditPage } />
            <Route path="*" component={ NotFoundPage } />
          </Switch>
        </main>
      </>
    );
  }
}
