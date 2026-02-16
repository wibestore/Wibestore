import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, Package, AlertTriangle, Star,
    DollarSign, Settings, LogOut, Menu, X, Gamepad2, Bell, Search
} from 'lucide-react';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    // Check authentication on mount
    useEffect(() => {
        const authData = localStorage.getItem('adminAuth');
        if (!authData) {
            navigate('/admin/login');
            return;
        }
        try {
            const { isAuthenticated } = JSON.parse(authData);
            if (!isAuthenticated) {
                navigate('/admin/login');
            }
        } catch {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
        { icon: Users, label: 'Foydalanuvchilar', to: '/admin/users' },
        { icon: Package, label: 'Akkauntlar', to: '/admin/accounts' },
        { icon: AlertTriangle, label: 'Shikoyatlar', to: '/admin/reports' },
        { icon: Star, label: 'Premium', to: '/admin/premium' },
        { icon: DollarSign, label: 'Moliya', to: '/admin/finance' },
        { icon: Settings, label: 'Sozlamalar', to: '/admin/settings' },
    ];

    // Get admin username
    const getAdminName = () => {
        try {
            const authData = localStorage.getItem('adminAuth');
            if (authData) {
                const { username } = JSON.parse(authData);
                return username || 'Admin';
            }
        } catch {
            return 'Admin';
        }
        return 'Admin';
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0f172a] border-r border-slate-700 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b border-slate-700">
                        <Link to="/admin" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-white">WibeStore</span>
                                <span className="block text-xs text-slate-400">Admin Panel</span>
                            </div>
                        </Link>
                    </div>

                    {/* Menu */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${location.pathname === item.to
                                    ? 'bg-blue-600/20 text-white border border-blue-500/30'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-slate-700">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            Chiqish
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 text-gray-500 hover:text-gray-800"
                        >
                            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        {/* Search */}
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Qidirish..."
                                className="w-64 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative p-2.5 text-gray-500 hover:text-gray-800 hover:bg-slate-100 rounded-xl transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>

                        {/* Admin Avatar */}
                        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {getAdminName().charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-sm font-medium text-gray-800">{getAdminName()}</div>
                                <div className="text-xs text-gray-500">Super Admin</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 lg:hidden z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
