import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './store/auth-context';
import Register from './pages/Register';
import AuthGuard from './components/AuthGuard';
import Login from './pages/Login';
import ptBR from 'antd/locale/pt_BR';
import { ConfigProvider } from 'antd';
import SharedPage from './pages/Shared';


export default function App() {
  return (
		<ConfigProvider locale={ptBR}>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Navigate to="/login" replace />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/home"
							element={
								<AuthGuard allowedRoles={['user']}>
									<SharedPage />
								</AuthGuard>
							}
						/>
						<Route path="*" element={<Navigate to="/login" replace />} />
					</Routes>
				</BrowserRouter>
    	</AuthProvider>
		</ConfigProvider>
    
  );
}