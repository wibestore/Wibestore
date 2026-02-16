import {
    TrendingUp, TrendingDown, Users, Package, DollarSign,
    AlertTriangle, Star, Clock, Eye, Check, X
} from 'lucide-react';
import { formatPrice } from '../../data/mockData';

const AdminDashboard = () => {
    const stats = [
        {
            label: 'Jami akkauntlar',
            value: '12,450',
            change: '+12%',
            trend: 'up',
            icon: Package,
            color: 'from-blue-500 to-blue-600'
        },
        {
            label: 'Bugun sotildi',
            value: '156',
            change: '+8%',
            trend: 'up',
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-500'
        },
        {
            label: 'Kutilgan moderatsiya',
            value: '45',
            change: '-5%',
            trend: 'down',
            icon: Clock,
            color: 'from-yellow-500 to-orange-500'
        },
        {
            label: 'Shikoyatlar',
            value: '12',
            change: '+2',
            trend: 'up',
            icon: AlertTriangle,
            color: 'from-red-500 to-pink-500'
        },
    ];

    const recentAccounts = [
        { id: 1, title: 'PUBG Mobile Conqueror', game: 'PUBG Mobile', price: 2500000, status: 'pending', seller: 'ProGamer_UZ' },
        { id: 2, title: 'Steam 150+ Games', game: 'Steam', price: 3800000, status: 'active', seller: 'GameStore_TJ' },
        { id: 3, title: 'Free Fire Heroic', game: 'Free Fire', price: 1200000, status: 'pending', seller: 'FFKing_UZ' },
        { id: 4, title: 'Standoff 2 Elite', game: 'Standoff 2', price: 1800000, status: 'blocked', seller: 'SO2Master' },
        { id: 5, title: 'Mobile Legends Mythic', game: 'Mobile Legends', price: 2100000, status: 'active', seller: 'MLBB_Pro' },
    ];

    const recentReports = [
        { id: 1, type: 'Scam', account: 'PUBG Account #123', reporter: 'user123', status: 'pending' },
        { id: 2, type: 'Yolg\'on ma\'lumot', account: 'Steam Account #456', reporter: 'buyer456', status: 'investigating' },
        { id: 3, type: 'Akkaunt ishlamaydi', account: 'FF Account #789', reporter: 'player789', status: 'resolved' },
    ];

    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-green-500/20 text-green-400',
            pending: 'bg-yellow-500/20 text-yellow-400',
            blocked: 'bg-red-500/20 text-red-400',
            investigating: 'bg-blue-500/20 text-blue-400',
            resolved: 'bg-gray-500/20 text-gray-400'
        };
        const labels = {
            active: 'Faol',
            pending: 'Kutilmoqda',
            blocked: 'Bloklangan',
            investigating: 'Tekshirilmoqda',
            resolved: 'Hal qilindi'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
                <p className="text-gray-500">Xush kelibsiz, Admin!</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                {stat.trend === 'up' ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Accounts */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-lg font-semibold text-gray-800">So'nggi akkauntlar</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left text-xs text-gray-500 font-medium p-4">Akkaunt</th>
                                    <th className="text-left text-xs text-gray-500 font-medium p-4">Narx</th>
                                    <th className="text-left text-xs text-gray-500 font-medium p-4">Status</th>
                                    <th className="text-left text-xs text-gray-500 font-medium p-4">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentAccounts.map((account) => (
                                    <tr key={account.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-medium text-gray-800 text-sm">{account.title}</div>
                                            <div className="text-xs text-gray-400 mt-0.5">{account.seller}</div>
                                        </td>
                                        <td className="p-4 text-blue-600 text-sm font-medium">
                                            {formatPrice(account.price)}
                                        </td>
                                        <td className="p-4">
                                            {getStatusBadge(account.status)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {account.status === 'pending' && (
                                                    <>
                                                        <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-lg font-semibold text-gray-800">So'nggi shikoyatlar</h2>
                    </div>
                    <div className="p-5 space-y-4">
                        {recentReports.map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                        <span className="font-medium text-gray-800 text-sm">{report.type}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 ml-7">{report.account}</div>
                                    <div className="text-xs text-gray-400 ml-7 mt-0.5">Reporter: {report.reporter}</div>
                                </div>
                                {getStatusBadge(report.status)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-4 mb-4">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                            <div className="text-2xl font-bold text-gray-800">5,234</div>
                            <div className="text-sm text-gray-500">Jami foydalanuvchilar</div>
                        </div>
                    </div>
                    <div className="text-sm text-blue-600 font-medium">Bugun +45 ta yangi</div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                    <div className="flex items-center gap-4 mb-4">
                        <Star className="w-8 h-8 text-yellow-500" />
                        <div>
                            <div className="text-2xl font-bold text-gray-800">342</div>
                            <div className="text-sm text-gray-500">Premium obunalar</div>
                        </div>
                    </div>
                    <div className="text-sm text-yellow-600 font-medium">Oylik: {formatPrice(33858000)}</div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center gap-4 mb-4">
                        <DollarSign className="w-8 h-8 text-green-600" />
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{formatPrice(156000000)}</div>
                            <div className="text-sm text-gray-500">Oylik daromad</div>
                        </div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">Komissiyadan: {formatPrice(15600000)}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
