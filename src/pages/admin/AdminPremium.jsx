import { useState, useEffect } from 'react';
import { Search, Crown, User, Check, X, Clock, Shield, Star } from 'lucide-react';

const AdminPremium = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [premiumType, setPremiumType] = useState('premium');
    const [premiumDays, setPremiumDays] = useState(30);
    const [message, setMessage] = useState({ type: '', text: '' });

    const loadUsers = () => {
        const savedUsers = localStorage.getItem('wibeUsers');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        } else {
            // Demo users
            const demoUsers = [
                { id: '1', name: 'Sardor', email: 'sardor@test.com', isPremium: false, premiumType: null, premiumExpiry: null },
                { id: '2', name: 'Jasur', email: 'jasur@test.com', isPremium: true, premiumType: 'premium', premiumExpiry: '2026-02-28' },
                { id: '3', name: 'Anvar', email: 'anvar@test.com', isPremium: true, premiumType: 'pro', premiumExpiry: '2026-03-15' },
            ];
            localStorage.setItem('wibeUsers', JSON.stringify(demoUsers));
            setUsers(demoUsers);
        }
    };

    // Load users from localStorage
    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleGrantPremium = () => {
        if (!selectedUser) return;

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + premiumDays);

        const updatedUsers = users.map(user => {
            if (user.id === selectedUser.id) {
                return {
                    ...user,
                    isPremium: true,
                    premiumType: premiumType,
                    premiumExpiry: expiryDate.toISOString().split('T')[0]
                };
            }
            return user;
        });

        localStorage.setItem('wibeUsers', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setShowConfirmModal(false);
        setSelectedUser(null);
        setMessage({ type: 'success', text: `${selectedUser.name} ga ${premiumType} berildi!` });

        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleRevokePremium = (user) => {
        if (!window.confirm(`${user.name} dan premiumni olib tashlamoqchimisiz?`)) return;

        const updatedUsers = users.map(u => {
            if (u.id === user.id) {
                return {
                    ...u,
                    isPremium: false,
                    premiumType: null,
                    premiumExpiry: null
                };
            }
            return u;
        });

        localStorage.setItem('wibeUsers', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setMessage({ type: 'success', text: `${user.name} dan premium olib tashlandi!` });

        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const getPremiumBadge = (user) => {
        if (!user.isPremium) return null;

        if (user.premiumType === 'pro') {
            return (
                <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium rounded-full">
                    <Star className="w-3 h-3" />
                    Pro
                </span>
            );
        }
        return (
            <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-medium rounded-full">
                <Crown className="w-3 h-3" />
                Premium
            </span>
        );
    };

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Crown className="w-8 h-8 text-yellow-400" />
                            Premium boshqaruvi
                        </h1>
                        <p className="text-gray-400 mt-1">Foydalanuvchilarga premium tarif berish</p>
                    </div>
                </div>

                {/* Success/Error Message */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
                        }`}>
                        {message.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                        {message.text}
                    </div>
                )}

                {/* Search */}
                <div className="bg-[#1e1e32] rounded-2xl p-6 border border-white/5 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Foydalanuvchi qidirish</h2>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ism yoki email bo'yicha qidiring..."
                            className="w-full pl-12 pr-4 py-4 bg-[#25253a] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        />
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-[#1e1e32] rounded-2xl border border-white/5 overflow-hidden">
                    <div className="p-4 border-b border-white/5">
                        <h2 className="text-lg font-semibold text-white">Foydalanuvchilar ({filteredUsers.length})</h2>
                    </div>

                    <div className="divide-y divide-white/5">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div key={user.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {user.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-medium">{user.name}</span>
                                                {getPremiumBadge(user)}
                                            </div>
                                            <p className="text-sm text-gray-400">{user.email}</p>
                                            {user.isPremium && user.premiumExpiry && (
                                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                    <Clock className="w-3 h-3" />
                                                    Tugash: {user.premiumExpiry}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {user.isPremium ? (
                                            <button
                                                onClick={() => handleRevokePremium(user)}
                                                className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                                            >
                                                Bekor qilish
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowConfirmModal(true);
                                                }}
                                                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                                            >
                                                <Crown className="w-4 h-4" />
                                                Premium berish
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">Foydalanuvchi topilmadi</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Premium Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-[#1e1e32] rounded-xl p-6 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <User className="w-6 h-6 text-gray-400" />
                            <span className="text-gray-400">Jami foydalanuvchilar</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{users.length}</p>
                    </div>
                    <div className="bg-[#1e1e32] rounded-xl p-6 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <Crown className="w-6 h-6 text-yellow-400" />
                            <span className="text-gray-400">Premium</span>
                        </div>
                        <p className="text-3xl font-bold text-white">
                            {users.filter(u => u.isPremium && u.premiumType === 'premium').length}
                        </p>
                    </div>
                    <div className="bg-[#1e1e32] rounded-xl p-6 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <Star className="w-6 h-6 text-cyan-400" />
                            <span className="text-gray-400">Pro</span>
                        </div>
                        <p className="text-3xl font-bold text-white">
                            {users.filter(u => u.isPremium && u.premiumType === 'pro').length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Grant Premium Modal */}
            {showConfirmModal && selectedUser && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#1e1e32] rounded-2xl p-6 w-full max-w-md border border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                                <Crown className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Premium berish</h3>
                                <p className="text-gray-400">{selectedUser.name}</p>
                            </div>
                        </div>

                        {/* Premium Type */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Tarif turi</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setPremiumType('premium')}
                                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${premiumType === 'premium'
                                        ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <Crown className="w-6 h-6" />
                                    Premium
                                </button>
                                <button
                                    onClick={() => setPremiumType('pro')}
                                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${premiumType === 'pro'
                                        ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <Star className="w-6 h-6" />
                                    Pro
                                </button>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Muddat (kun)</label>
                            <select
                                value={premiumDays}
                                onChange={(e) => setPremiumDays(Number(e.target.value))}
                                className="w-full px-4 py-3 bg-[#25253a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                            >
                                <option value={7}>7 kun</option>
                                <option value={30}>1 oy (30 kun)</option>
                                <option value={90}>3 oy (90 kun)</option>
                                <option value={180}>6 oy (180 kun)</option>
                                <option value={365}>1 yil (365 kun)</option>
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    setSelectedUser(null);
                                }}
                                className="flex-1 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleGrantPremium}
                                className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <Check className="w-5 h-5" />
                                Tasdiqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPremium;
