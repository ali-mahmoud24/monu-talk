import Layout from './components/Layout/Layout';

import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MuseumsPage from './pages/MuseumsPage';
import ArtifactsPage from './pages/ArtifactsPage';
import NewMuseumPage from './pages/NewMuseumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import {
  SignedInProtectedRoute,
  ProtectedRoute,
} from './shared/utils/auth-routes';
import ImageModelPage from './pages/ImageModelPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<HomePage />} />

        <Route
          path="/login"
          element={
            <SignedInProtectedRoute>
              <LoginPage />
            </SignedInProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <SignedInProtectedRoute>
              <RegisterPage />
            </SignedInProtectedRoute>
          }
        />

        <Route path="/museums" element={<MuseumsPage />} />

        <Route path="/model" element={<ImageModelPage />} />

        <Route
          path="/new-museum"
          element={
            <ProtectedRoute>
              <NewMuseumPage />
            </ProtectedRoute>
          }
        />

        <Route path="/artifacts/:museumId" element={<ArtifactsPage />} />

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
