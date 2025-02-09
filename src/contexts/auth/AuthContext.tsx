import type React from "react";
import { createContext, useState, useEffect } from "react";
import type { AuthContextType } from "./AuthContext.types";

export const AuthContext = createContext<AuthContextType>({
	userData: null,
	loading: true,
	setUserData: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	const checkAuth = async () => {
		try {
			const response = await fetch("http://localhost:7000/auth/me", {
				credentials: "include",
			});
			const data = await response.json();
			setUserData(data);
		} catch (error) {
			setUserData(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ userData, loading, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
};
