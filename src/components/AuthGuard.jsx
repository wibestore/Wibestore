import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

/**
 * AuthGuard - Защищенный маршрут для авторизованных пользователей
 * 
 * Usage:
 * <AuthGuard>
 *   <ProfilePage />
 * </AuthGuard>
 */
const AuthGuard = ({ children }) => {
    const { user, isLoading, isInitialized } = useAuth();
    const location = useLocation();

    // Пока идет загрузка - показываем loading
    if (isLoading || !isInitialized) {
        return (
            <div
                style={{
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            </div>
        );
    }

    // Если пользователь не авторизован - редирект на login
    if (!user) {
        return <Navigate to="/login" state={{ from: location, redirect: location.pathname }} replace />;
    }

    return children;
};

/**
 * AdminGuard - Защищенный маршрут для администраторов
 * 
 * Usage:
 * <AdminGuard>
 *   <AdminDashboard />
 * </AdminGuard>
 */
export const AdminGuard = ({ children }) => {
    const { user, isLoading, isInitialized } = useAuth();
    const location = useLocation();

    if (isLoading || !isInitialized) {
        return (
            <div
                style={{
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (!user.is_staff) {
        return <Navigate to="/" replace />;
    }

    return children;
};

/**
 * GuestGuard - Маршрут только для неавторизованных (login, signup)
 * Редиректит на главную если пользователь уже авторизован
 */
export const GuestGuard = ({ children }) => {
    const { user, isLoading, isInitialized } = useAuth();

    if (isLoading || !isInitialized) {
        return (
            <div
                style={{
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            </div>
        );
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthGuard;
