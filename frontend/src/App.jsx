import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import OwnerDashboard from './pages/OwnerDashboard.jsx';
import PGListPage from './pages/PGListPage.jsx';
import PGDetailsPage from './pages/PGDetailsPage.jsx';
import RoommateMatchesPage from './pages/RoommateMatchesPage.jsx';
import AddEditPGPage from './pages/AddEditPGPage.jsx';

const App = () => (
  <>
    <Navbar />
    <main className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/pgs" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pgs" element={<PGListPage />} />
        <Route path="/pgs/:id" element={<PGDetailsPage />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute roles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/matches"
          element={
            <ProtectedRoute roles={['student']}>
              <RoommateMatchesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner"
          element={
            <ProtectedRoute roles={['owner']}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/pg/new"
          element={
            <ProtectedRoute roles={['owner']}>
              <AddEditPGPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/pg/:id/edit"
          element={
            <ProtectedRoute roles={['owner']}>
              <AddEditPGPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  </>
);

export default App;
