import { useState } from 'react';
import { Search, Filter, ChevronDown, Eye, Ban, Check, X, Crown, Star, MoreVertical } from 'lucide-react';
import { formatPrice } from '../../data/mockData';

const AdminAccounts = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const accounts = [
        { id: 1, title: 'PUBG Mobile Conqueror', game: 'PUBG Mobile', price: 2500000, status: 'pending', seller: { name: 'ProGamer_UZ', isPremium: true }, createdAt: '2024-01-28' },
        { id: 2, title: 'Steam 150+ Games', game: 'Steam', price: 3800000, status: 'active', seller: { name: 'GameStore_TJ', isPremium: true }, createdAt: '2024-01-27' },
        { id: 3, title: 'Free Fire Heroic', game: 'Free Fire', price: 1200000, status: 'pending', seller: { name: 'FFKing_UZ', isPremium: false }, createdAt: '2024-01-28' },
        { id: 4, title: 'Standoff 2 Elite', game: 'Standoff 2', price: 1800000, status: 'blocked', seller: { name: 'SO2Master', isPremium: false }, createdAt: '2024-01-26' },
        { id: 5, title: 'Mobile Legends Mythic', game: 'Mobile Legends', price: 2100000, status: 'active', seller: { name: 'MLBB_Pro', isPremium: true }, createdAt: '2024-01-28' },
        { id: 6, title: 'CoC TH14 Max', game: 'Clash of Clans', price: 4500000, status: 'active', seller: { name: 'ClashKing', isPremium: false }, createdAt: '2024-01-25' },
        { id: 7, title: 'CODM Legendary', game: 'Call of Duty Mobile', price: 1900000, status: 'sold', seller: { name: 'ProGamer_UZ', isPremium: true }, createdAt: '2024-01-24' },
        { id: 8, title: 'Roblox Rich Account', game: 'Roblox', price: 850000, status: 'pending', seller: { name: 'RobloxMaster', isPremium: false }, createdAt: '2024-01-27' },
    ];

    const statusFilters = [
        { value: 'all', label: 'Barchasi' },
        { value: 'pending', label: 'Kutilmoqda' },
        { value: 'active', label: 'Faol' },
        { value: 'blocked', label: 'Bloklangan' },
        { value: 'sold', label: 'Sotilgan' },
    ];

    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-green-500/20 text-green-400',
            pending: 'bg-yellow-500/20 text-yellow-400',
            blocked: 'bg-red-500/20 text-red-400',
            sold: 'bg-blue-500/20 text-blue-400'
        };
        const labels = {
            active: 'Faol',
            pending: 'Kutilmoqda',
            blocked: 'Bloklangan',
            sold: 'Sotilgan'
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const filteredAccounts = accounts.filter(acc => {
        const matchesStatus = selectedStatus === 'all' || acc.status === selectedStatus;
        const matchesSearch = acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            acc.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Akkauntlar</h1>
                    <p className="text-gray-400 text-sm">Barcha akkauntlarni boshqaring</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                        {accounts.filter(a => a.status === 'pending').length} ta kutilmoqda
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
                        placeholder="Akkaunt yoki sotuvchi qidirish..."
                        className="w-full pl-12 pr-4 py-3 bg-[#1e1e32] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                    {statusFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setSelectedStatus(filter.value)}
                            className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedStatus === filter.value
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
                                <th className="text-left text-xs text-gray-500 font-medium p-4">ID</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Akkaunt</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">O'yin</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Sotuvchi</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Narx</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Status</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Sana</th>
                                <th className="text-left text-xs text-gray-500 font-medium p-4">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAccounts.map((account) => (
                                <tr key={account.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                    <td className="p-4 text-gray-500 text-sm">#{account.id}</td>
                                    <td className="p-4">
                                        <div className="font-medium text-white text-sm">{account.title}</div>
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm">{account.game}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-white">{account.seller.name}</span>
                                            {account.seller.isPremium && (
                                                <Crown className="w-4 h-4 text-yellow-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 text-cyan-400 text-sm font-medium">
                                        {formatPrice(account.price)}
                                    </td>
                                    <td className="p-4">
                                        {getStatusBadge(account.status)}
                                    </td>
                                    <td className="p-4 text-gray-500 text-sm">{account.createdAt}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Ko'rish">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {account.status === 'pending' && (
                                                <>
                                                    <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors" title="Tasdiqlash">
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Rad etish">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            {account.status === 'active' && (
                                                <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Bloklash">
                                                    <Ban className="w-4 h-4" />
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
                        {filteredAccounts.length} ta akkaunt topildi
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-[#25253a] text-gray-400 rounded-lg hover:text-white transition-colors">
                            Oldingi
                        </button>
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
                            1
                        </button>
                        <button className="px-4 py-2 bg-[#25253a] text-gray-400 rounded-lg hover:text-white transition-colors">
                            2
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

export default AdminAccounts;
