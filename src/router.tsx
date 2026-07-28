import { Route, Routes } from 'react-router-dom';
import GuestRoute from './components/GuestRoute';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import AlbumPage from './pages/AlbumPage';
import FavoritePage from './pages/FavoritePage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import NotFoundPage from './pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={ (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ) }
      />
      <Route
        path="/search"
        element={ (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ) }
      />
      <Route
        path="/album/:id"
        element={ (
          <ProtectedRoute>
            <AlbumPage />
          </ProtectedRoute>
        ) }
      />
      <Route
        path="/favorites"
        element={ (
          <ProtectedRoute>
            <FavoritePage />
          </ProtectedRoute>
        ) }
      />
      <Route
        path="/profile"
        element={ (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ) }
      />
      <Route
        path="/profile/edit"
        element={ (
          <ProtectedRoute>
            <ProfileEditPage />
          </ProtectedRoute>
        ) }
      />
      <Route path="*" element={ <NotFoundPage /> } />
    </Routes>
  );
}
