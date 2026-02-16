import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, Lock, Bell, Globe, CreditCard, Shield, Trash2, Camera, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage, languages as langList } from '../context/LanguageContext';

const SettingsPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, updateProfile, logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sales: true,
        messages: true,
        updates: false
    });

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    const tabs = [
        { id: 'profile', label: t('settings.profile'), icon: User },
        { id: 'security', label: t('settings.security'), icon: Lock },
        { id: 'notifications', label: t('settings.notifications'), icon: Bell },
        { id: 'language', label: t('settings.language'), icon: Globe },
        { id: 'wallet', label: t('settings.wallet'), icon: CreditCard },
    ];

    const handleProfileSave = async () => {
        setIsSaving(true);
        setMessage({ type: '', text: '' });

        await new Promise(resolve => setTimeout(resolve, 1000));

        updateProfile(profileData);
        setMessage({ type: 'success', text: t('settings.profile_updated') });
        setIsSaving(false);
    };

    const handlePasswordChange = async () => {
        setMessage({ type: '', text: '' });

        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setMessage({ type: 'error', text: t('settings.fill_all') });
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: t('settings.passwords_mismatch') });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({ type: 'error', text: t('settings.password_short') });
            return;
        }

        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setMessage({ type: 'success', text: t('settings.password_changed') });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsSaving(false);
    };

    const handleDeleteAccount = () => {
        if (window.confirm(t('settings.delete_confirm'))) {
            logout();
            navigate('/');
        }
    };

    const notificationItems = [
        { key: 'email', label: t('settings.email_notif'), desc: t('settings.email_notif_desc') },
        { key: 'push', label: t('settings.push_notif'), desc: t('settings.push_notif_desc') },
        { key: 'sales', label: t('settings.sales_notif'), desc: t('settings.sales_notif_desc') },
        { key: 'messages', label: t('settings.messages_notif'), desc: t('settings.messages_notif_desc') },
        { key: 'updates', label: t('settings.updates_notif'), desc: t('settings.updates_notif_desc') },
    ];

    return (
        <div className="min-h-screen" style={{ paddingTop: '140px', paddingBottom: '64px' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <Settings className="w-7 h-7 text-blue-500" />
                        {t('settings.title')}
                    </h1>
                    <p className="text-gray-500 mt-1">{t('settings.subtitle')}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setMessage({ type: '', text: '' });
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-500 hover:bg-slate-50 hover:text-gray-800'
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm">
                            {/* Message */}
                            {message.text && (
                                <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${message.type === 'success'
                                    ? 'bg-green-50 border border-green-200 text-green-600'
                                    : 'bg-red-50 border border-red-200 text-red-500'
                                    }`}>
                                    {message.type === 'success' ? (
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    )}
                                    <span>{message.text}</span>
                                </div>
                            )}

                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-800">{t('settings.profile_info')}</h2>

                                    {/* Avatar */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ color: '#ffffff' }}>
                                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                                                <Camera className="w-4 h-4" style={{ color: '#ffffff' }} />
                                            </button>
                                        </div>
                                        <div>
                                            <p className="text-gray-800 font-medium">{user?.name}</p>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('settings.name')}</label>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('settings.email')}</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('settings.phone')}</label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                placeholder="+998 90 123 45 67"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('settings.bio')}</label>
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                placeholder={t('settings.bio_placeholder')}
                                                rows={3}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleProfileSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                                        style={{ color: '#ffffff' }}
                                    >
                                        <Save className="w-4 h-4" />
                                        {isSaving ? t('settings.saving') : t('settings.save')}
                                    </button>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-800">{t('settings.security')}</h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('settings.current_password')}</label>
                                            <input
                                                type="password"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('settings.new_password')}</label>
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('settings.confirm_password')}</label>
                                            <input
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePasswordChange}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                                        style={{ color: '#ffffff' }}
                                    >
                                        <Lock className="w-4 h-4" />
                                        {isSaving ? t('settings.changing_password') : t('settings.change_password')}
                                    </button>

                                    {/* 2FA */}
                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-gray-800 font-medium">{t('settings.twofa')}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{t('settings.twofa_desc')}</p>
                                            </div>
                                            <button className="px-4 py-2 bg-slate-100 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                {t('settings.enable')}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Delete Account */}
                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <h3 className="text-red-500 font-medium mb-2">{t('settings.danger_zone')}</h3>
                                        <p className="text-sm text-gray-500 mb-4">{t('settings.delete_warning')}</p>
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-red-500 hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            {t('settings.delete_account')}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Notifications Tab */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-800">{t('settings.notifications')}</h2>

                                    <div className="space-y-4">
                                        {notificationItems.map((item) => (
                                            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <div>
                                                    <p className="text-gray-800 font-medium">{item.label}</p>
                                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                                </div>
                                                <button
                                                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                                    className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key] ? 'bg-blue-500' : 'bg-gray-300'
                                                        }`}
                                                >
                                                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                                                        }`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Language Tab */}
                            {activeTab === 'language' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-800">{t('settings.choose_language')}</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {langList.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => setLanguage(lang.code)}
                                                className={`p-4 rounded-xl border-2 transition-all ${language === lang.code
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-slate-200 hover:border-blue-300'
                                                    }`}
                                            >
                                                <div className="text-3xl mb-2">{lang.flag}</div>
                                                <p className="text-gray-800 font-medium">{lang.name}</p>
                                            </button>
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-500">{t('settings.language_note')}</p>
                                </div>
                            )}

                            {/* Wallet Tab */}
                            {activeTab === 'wallet' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-800">{t('settings.wallet')}</h2>

                                    {/* Balance */}
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg shadow-blue-500/20">
                                        <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{t('settings.balance')}</p>
                                        <p className="text-3xl font-bold" style={{ color: '#ffffff' }}>{t('settings.balance_amount')}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="p-4 bg-slate-50 rounded-xl text-center hover:bg-blue-50 transition-colors border border-slate-200">
                                            <CreditCard className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                            <p className="text-gray-800 font-medium">{t('settings.add_money')}</p>
                                        </button>
                                        <button className="p-4 bg-slate-50 rounded-xl text-center hover:bg-blue-50 transition-colors border border-slate-200">
                                            <Shield className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                            <p className="text-gray-800 font-medium">{t('settings.withdraw')}</p>
                                        </button>
                                    </div>

                                    {/* Cards */}
                                    <div>
                                        <h3 className="text-gray-800 font-medium mb-3">{t('settings.linked_cards')}</h3>
                                        <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200">
                                            <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500">{t('settings.no_cards')}</p>
                                            <button className="mt-3 text-blue-500 text-sm hover:underline">
                                                {t('settings.add_card')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
