import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PlayerProvider } from './context/PlayerContext';
import PlayerBar from './components/PlayerBar';
import AppRoutes from './router';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <PlayerProvider>
            <AppRoutes />
            <PlayerBar />
          </PlayerProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
