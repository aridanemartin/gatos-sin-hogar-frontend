import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { VaccineEditPage } from './pages/DashboardPage/VaccineEditPage/VaccineEditPage';
import { VolunteerEditPage } from './pages/DashboardPage/VolunteerEditPage/VolunteerEditPage';
import { CatEditPage } from './pages/DashboardPage/CatEditPage/CatEditPage';
import { TaskEditPage } from './pages/DashboardPage/TaskEditPage/TaskEditPage';
import { HomePage } from './pages/HomePage/HomePage';
import { AdoptPage } from './pages/Adopt/Adopt';
import './styles/global.scss';
import './styles/globals.css';
import { CatEditFormContextProvider } from '@contexts/CatFormContext';
import MainLayout from './layouts/MainLayout';
import { AuthContext } from '@contexts/auth/AuthContext';
import { ErrorScreen } from './components/ErrorScreen/ErrorScreen';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const { userData, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return userData?.user ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard">
            <Route
              index
              element={
                <ErrorScreen
                  errorMessage="La página que estás buscando no existe"
                  errorCode="404"
                  button={
                    <button
                      className="errorScreen__button"
                      onClick={handleGoHome}
                    >
                      Volver al inicio
                    </button>
                  }
                />
              }
            />

            <Route
              path="gatos"
              element={
                <CatEditFormContextProvider>
                  <CatEditPage />
                </CatEditFormContextProvider>
              }
            />
            <Route
              path="gatos/:catId"
              element={
                <CatEditFormContextProvider>
                  <CatEditPage isEditPage />
                </CatEditFormContextProvider>
              }
            />

            <Route path="voluntarios" element={<VolunteerEditPage />} />
            <Route path="vacunas" element={<VaccineEditPage />} />
            <Route path="tareas" element={<TaskEditPage />} />
          </Route>
        </Route>

        <Route path="adopta" element={<AdoptPage />} />
        <Route
          path="*"
          element={
            <ErrorScreen
              errorMessage="La página que estás buscando no existe"
              errorCode="404"
              button={
                <button className="errorScreen__button" onClick={handleGoHome}>
                  Volver al inicio
                </button>
              }
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
