import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Gamepad2, Flame, Star, LogIn, UserPlus, Package, User, LogOut, ChevronDown, Settings, PlusCircle, Sun, Moon, Coins, Trophy, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCoins } from '../context/CoinContext';
import { useLanguage, languages as langList } from '../context/LanguageContext';
import NotificationWidget from './NotificationWidget';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { balance } = useCoins();
    const { t, language, setLanguage } = useLanguage();
    const dropdownRef = useRef(null);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langRef = useRef(null);

    // Close user dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsUserMenuOpen(false);
            }
            if (langRef.current && !langRef.current.contains(e.target)) {
                setIsLangMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
        setIsLangMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const navLinks = [
        { to: '/products', icon: Package, label: t('nav.products') },
        { to: '/top', icon: Flame, label: t('nav.top') },
        { to: '/statistics', icon: Trophy, label: t('nav.statistics') },
        { to: '/premium', icon: Star, label: t('nav.premium'), premium: true },
    ];

    const currentLang = langList.find(l => l.code === language);

    return (
        <nav className={`fixed top-0 left-0 right-0 h-18 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-500/5'
            : 'bg-white/90 backdrop-blur-lg'
            } border-b border-blue-100`}>
            <div className="sl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse-glow group-hover:scale-105 transition-transform">
                            <Gamepad2 className="w-6 h-6" style={{ color: '#ffffff' }} />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                            wibestore.uz
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden group ${link.premium
                                    ? 'text-yellow-500 hover:bg-yellow-50'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                    } ${location.pathname === link.to ? 'bg-blue-50 text-blue-600' : ''}`}
                            >
                                <link.icon className={`w-4 h-4 ${link.premium ? 'text-yellow-500' : ''}`} />
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Language Switcher */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-sm font-medium text-gray-600"
                            >
                                <Globe className="w-4 h-4 text-blue-500" />
                                <span>{currentLang?.flag}</span>
                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isLangMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl border border-blue-100 shadow-xl overflow-hidden z-50">
                                    {langList.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { setLanguage(lang.code); setIsLangMenuOpen(false); }}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${language === lang.code
                                                ? 'bg-blue-50 text-blue-600 font-medium'
                                                : 'text-gray-600 hover:bg-blue-50'
                                                }`}
                                        >
                                            <span className="text-lg">{lang.flag}</span>
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-blue-500" />
                            )}
                        </button>

                        {isAuthenticated && user ? (
                            <>
                                {/* Coin Balance */}
                                <Link to="/coins" className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors">
                                    <Coins className="w-4 h-4 text-yellow-400" />
                                    <span className="text-sm font-semibold text-yellow-400">{balance}</span>
                                </Link>

                                {/* Sell Button */}
                                <Link
                                    to="/sell"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition-opacity"
                                    style={{ color: '#ffffff' }}
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    {t('nav.sell')}
                                </Link>

                                {/* Notifications */}
                                <NotificationWidget />

                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold" style={{ color: '#ffffff' }}>
                                            {user.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-gray-700 text-sm font-medium">{user.name?.split(' ')[0] || 'User'}</span>
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl border border-blue-100 shadow-xl overflow-hidden">
                                            <div className="p-4 border-b border-blue-100">
                                                <p className="text-gray-800 font-medium">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                            <div className="p-2">
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                                                >
                                                    <User className="w-4 h-4" />
                                                    {t('nav.profile')}
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    {t('nav.settings')}
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    {t('nav.logout')}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                                >
                                    <LogIn className="w-4 h-4" />
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    to="/signup"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200"
                                    style={{ color: '#ffffff' }}
                                >
                                    <UserPlus className="w-4 h-4" />
                                    {t('nav.signup')}
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-blue-100 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                <div className="p-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${link.premium ? 'text-yellow-500' : 'text-gray-600'
                                } hover:bg-blue-50`}
                        >
                            <link.icon className="w-5 h-5" />
                            {link.label}
                        </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-blue-100">
                        {isAuthenticated && user ? (
                            <>
                                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-lg font-bold" style={{ color: '#ffffff' }}>
                                        {user.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="text-gray-800 font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    {t('nav.logout')}
                                </button>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-gray-600 border border-blue-200 hover:bg-blue-50 transition-colors"
                                >
                                    <LogIn className="w-5 h-5" />
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500"
                                    style={{ color: '#ffffff' }}
                                >
                                    <UserPlus className="w-5 h-5" />
                                    {t('nav.signup')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
