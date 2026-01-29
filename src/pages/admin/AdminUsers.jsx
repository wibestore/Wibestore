import { useState } from 'react';
import { Search, Crown, Ban, Eye, Mail, MoreVertical, Shield, UserCheck, UserX } from 'lucide-react';

const AdminUsers = () => {
    const [selectedRole, setSelectedRole] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const users = [
        { id: 1, name: 'ProGamer_UZ', email: 'progamer@mail.uz', role: 'seller', isPremium: true, status: 'active', sales: 156, joined: '2023-06-15' },
        { id: 2, name: 'GameStore_TJ', email: 'gamestore@mail.tj', role: 'seller', isPremium: true, status: 'active', sales: 89, joined: '2023-08-20' },
        { id: 3, name: 'Buyer123', email: 'buyer123@gmail.com', role: 'buyer', isPremium: false, status: 'active', purchases: 12, joined: '2024-01-10' },
        { id: 4, name: 'FFKing_UZ', email: 'ffking@mail.uz', role: 'seller', isPremium: false, status: 'active', sales: 234, joined: '2023-05-01' },
        { id: 5, name: 'ScammerX', email: 'scammer@fake.com', role: 'seller', isPremium: false, status: 'blocked', sales: 5, joined: '2024-01-20' },
        { id: 6, name: 'NormalUser', email: 'normal@mail.uz', role: 'buyer', isPremium: false, status: 'active', purchases: 3, joined: '2024-01-15' },
        { id: 7, name: 'MLBB_Pro', email: 'mlbbpro@mail.uz', role: 'seller', isPremium: true, status: 'active', sales: 167, joined: '2023-09-10' },
    ];

    const roleFilters = [
        { value: 'all', label: 'Barchasi' },
        { value: 'seller', label: 'Sotuvchilar' },
        { value: 'buyer', label: 'Xaridorlar' },
        { value: 'premium', label: 'Premium' },
        { value: 'blocked', label: 'Bloklangan' },
    ];

    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-green-500/20 text-green-400',
            blocked: 'bg-red-500/20 text-red-400',
        };
        const labels = {
            active: 'Faol',
            blocked: 'Bloklangan',
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const getRoleBadge = (role, isPremium) => {
        if (isPremium) {
            return (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                    <Crown className="w-3 h-3" />
                    Premium {role === 'seller' ? 'Sotuvchi' : 'Xaridor'}
                </span>
            );
        }
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${role === 'seller' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                {role === 'seller' ? 'Sotuvchi' : 'Xaridor'}
            </span>
        );
    };

    const filteredUsers = users.filter(user => {
        let matchesRole = selectedRole === 'all';
        if (selectedRole === 'seller') matchesRole = user.role === 'seller';
        if (selectedRole === 'buyer') matchesRole = user.role === 'buyer';
        if (selectedRole === 'premium') matchesRole = user.isPremium;
        if (selectedRole === 'blocked') matchesRole = user.status === 'blocked';

        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Foydalanuvchilar</h1>
                    <p className="text-gray-400 text-sm">Barcha foydalanuvchilarni boshqaring</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                        {users.filter(u => u.role === 'seller').length} ta sotuvchi
                    </span>
                    <span className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                        {users.filter(u => u.isPremium).length} ta premium
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ism yoki email qidirish..."
                        className="w-full pl-12 pr-4 py-3 bg-[#1e1e32] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                    {roleFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setSelectedRole(filter.value)}
                            className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedRole === filter.value
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'bg-[#1e1e32] text-gray-300 hover:bg-[#25253a]'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#1e1e32] rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Foydalanuvchi</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Email</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Rol</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Faoliyat</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Status</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Qo'shilgan</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="font-medium text-white text-sm">{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm">{user.email}</td>
                                    <td className="p-4">
                                        {getRoleBadge(user.role, user.isPremium)}
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm">
                                        {user.role === 'seller'
                                            ? `${user.sales} ta sotuvlar`
                                            : `${user.purchases} ta xaridlar`
                                        }
                                    </td>
                                    <td className="p-4">
                                        {getStatusBadge(user.status)}
                                    </td>
                                    <td className="p-4 text-gray-500 text-sm">{user.joined}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Ko'rish">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors" title="Email yuborish">
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            {user.status === 'active' ? (
                                                <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Bloklash">
                                                    <Ban className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors" title="Blokdan chiqarish">
                                                    <UserCheck className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-white/5">
                    <div className="text-sm text-gray-500">
                        {filteredUsers.length} ta foydalanuvchi topildi
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-[#25253a] text-gray-400 rounded-lg hover:text-white transition-colors">
                            Oldingi
                        </button>
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
                            1
                        </button>
                        <button className="px-4 py-2 bg-[#25253a] text-gray-400 rounded-lg hover:text-white transition-colors">
                            Keyingi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
