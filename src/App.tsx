import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { VaccineEditPage } from "./pages/DashboardPage/VaccineEditPage/VaccineEditPage";
import { VolunteerEditPage } from "./pages/DashboardPage/VolunteerEditPage/VolunteerEditPage";
import { CatEditPage } from "./pages/DashboardPage/CatEditPage/CatEditPage";
import { TaskEditPage } from "./pages/DashboardPage/TaskEditPage/TaskEditPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { AdoptPage } from "./pages/Adopt/Adopt";
import "./styles/global.scss";
import "./styles/globals.css";
import { CatEditFormContextProvider } from "@contexts/CatFormContext";
import MainLayout from "./layouts/MainLayout";
import { AuthContext } from "@contexts/auth/AuthContext";
import { ErrorScreen } from "./components/ErrorScreen/ErrorScreen";
import { VolunteerPage } from "./pages/VolunteerPage/VolunteerPage";

const ProtectedRoute = () => {
	const { userData, loading } = useContext(AuthContext);

	if (loading) {
		return <div>Loading...</div>;
	}

	return userData?.user ? <Outlet /> : <Navigate to="/" />;
};

function App() {
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
								/>
							}
						/>

						<Route
							path="gatos/create"
							element={
								<CatEditFormContextProvider>
									<CatEditPage />
								</CatEditFormContextProvider>
							}
						/>
						<Route
							path="gatos/:catId/edit"
							element={
								<CatEditFormContextProvider>
									<CatEditPage isEditPage />
								</CatEditFormContextProvider>
							}
						/>
						<Route
							path="voluntariado/:volunteerId/edit"
							element={<VolunteerEditPage />}
						/>
						<Route path="vacunas" element={<VaccineEditPage />} />
						<Route path="tareas" element={<TaskEditPage />} />
					</Route>
				</Route>
				<Route path="voluntariado" element={<VolunteerPage />} />

				<Route path="adopta" element={<AdoptPage />} />
				<Route
					path="*"
					element={
						<ErrorScreen
							errorMessage="La página que estás buscando no existe"
							errorCode="404"
						/>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
