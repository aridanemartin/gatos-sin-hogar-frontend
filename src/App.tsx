import { Routes, Route } from 'react-router-dom';
import { VaccineEditPage } from './pages/DashboardPage/VaccineEditPage/VaccineEditPage';
import { VolunteerEditPage } from './pages/DashboardPage/VolunteerEditPage/VolunteerEditPage';
import { CatEditPage } from './pages/DashboardPage/CatEditPage/CatEditPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { TaskEditPage } from './pages/DashboardPage/TaskEditPage/TaskEditPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { AdoptPage } from './pages/Adopt/Adopt';
import './styles/global.scss';
import './styles/globals.css';
import { CatEditFormContextProvider } from '@contexts/CatFormContext';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="dashboard">
        <Route index element={<DashboardPage />} />

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

      <Route path="adopta" element={<AdoptPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
