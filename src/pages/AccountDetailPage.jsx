import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Shield, Clock, MessageCircle, Crown, ChevronRight, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { accounts, formatPrice, calculateCommission, COMMISSION_RATE } from '../data/mockData';
import AccountCard from '../components/AccountCard';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const AccountDetailPage = () => {
    const { accountId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { startConversation } = useChat();
    const [selectedPayment, setSelectedPayment] = useState('payme');

    const account = accounts.find(acc => acc.id === parseInt(accountId));

    // Handle contact seller
    const handleContactSeller = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Create mock seller object with account's seller info
        const seller = {
            id: account.seller.id || 999,
            name: account.seller.name,
            rating: account.seller.rating
        };

        startConversation(seller, account);
    };

    const relatedAccounts = accounts
        .filter(acc => acc.gameId === account?.gameId && acc.id !== account?.id)
        .slice(0, 4);

    if (!account) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Akkaunt topilmadi</h1>
                    <Link to="/" className="text-purple-400 hover:underline">Bosh sahifaga qaytish</Link>
                </div>
            </div>
        );
    }

    const paymentMethods = [
        { id: 'payme', name: 'Payme', color: 'bg-[#00CCCC]' },
        { id: 'click', name: 'Click', color: 'bg-[#0095FF]' },
        { id: 'paynet', name: 'Paynet', color: 'bg-[#FFC107]' }
    ];

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Orqaga
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Image & Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image */}
                        <div className="relative aspect-video bg-[#1e1e32] rounded-2xl overflow-hidden">
                            {account.image ? (
                                <img src={account.image} alt={account.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-8xl opacity-50">🎮</div>
                            )}

                            {account.isPremium && (
                                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-sm font-bold text-black">
                                    <Crown className="w-4 h-4" />
                                    Premium Sotuvchi
                                </div>
                            )}
                        </div>

                        {/* Account Info */}
                        <div className="bg-[#1e1e32] rounded-2xl p-6 border border-white/5">
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                                <Link to={`/game/${account.gameId}`} className="hover:text-purple-400 transition-colors">
                                    {account.gameName}
                                </Link>
                                <ChevronRight className="w-4 h-4" />
                                <span>#{account.id}</span>
                            </div>

                            <h1 className="text-2xl font-bold text-white mb-4">{account.title}</h1>

                            <p className="text-gray-300 leading-relaxed mb-6">
                                {account.description}
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-[#25253a] rounded-xl">
                                    <Shield className="w-6 h-6 text-green-400" />
                                    <div>
                                        <div className="text-sm text-gray-400">Xavfsizlik</div>
                                        <div className="font-semibold text-white">Escrow kafolat</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-[#25253a] rounded-xl">
                                    <Clock className="w-6 h-6 text-cyan-400" />
                                    <div>
                                        <div className="text-sm text-gray-400">Yetkazish</div>
                                        <div className="font-semibold text-white">1-24 soat</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-[#25253a] rounded-xl">
                                    <MessageCircle className="w-6 h-6 text-purple-400" />
                                    <div>
                                        <div className="text-sm text-gray-400">Qo'llab-quvvatlash</div>
                                        <div className="font-semibold text-white">24/7</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seller Info */}
                        <div className="bg-[#1e1e32] rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4">Sotuvchi haqida</h3>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
                                    {account.seller.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-white">{account.seller.name}</span>
                                        {account.seller.isPremium && (
                                            <Crown className="w-4 h-4 text-yellow-400" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            {account.seller.rating}
                                        </span>
                                        <span>{account.seller.sales} ta sotuvlar</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleContactSeller}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-sm font-medium text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Bog'lanish
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Purchase */}
                    <div className="space-y-6">
                        {/* Price Card */}
                        <div className="bg-[#1e1e32] rounded-2xl p-6 border border-white/5 sticky top-24">
                            <div className="text-center mb-6">
                                <div className="text-sm text-gray-400 mb-1">Narxi</div>
                                <div className="text-3xl font-bold text-cyan-400">{formatPrice(account.price)}</div>
                            </div>

                            {/* Payment Methods */}
                            <div className="mb-6">
                                <div className="text-sm text-gray-400 mb-3">To'lov usulini tanlang</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedPayment(method.id)}
                                            className={`p-3 rounded-xl border-2 transition-all ${selectedPayment === method.id
                                                ? 'border-purple-500 bg-purple-500/10'
                                                : 'border-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 mx-auto rounded-lg ${method.color} mb-1`} />
                                            <div className="text-xs text-gray-300">{method.name}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Buy Button */}
                            <button className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-300">
                                Sotib olish
                            </button>

                            {/* Security Notice */}
                            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <div className="flex items-start gap-2">
                                    <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <div className="text-xs text-gray-300">
                                        <span className="text-green-400 font-medium">Xavfsiz xarid.</span> Pul faqat akkaunt tasdiqlangandan so'ng sotuvchiga o'tkaziladi.
                                    </div>
                                </div>
                            </div>

                            {/* Report */}
                            <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-sm text-gray-400 hover:text-red-400 transition-colors">
                                <AlertTriangle className="w-4 h-4" />
                                Shikoyat qilish
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Accounts */}
                {relatedAccounts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-white mb-6">O'xshash akkauntlar</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedAccounts.map((acc) => (
                                <AccountCard key={acc.id} account={acc} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountDetailPage;
