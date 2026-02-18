import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, Gift, Clock, ShoppingBag, TrendingUp, HelpCircle, ChevronRight, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCoins } from '../context/CoinContext';

const CoinsPage = () => {
    const { user, isAuthenticated } = useAuth();
    const { balance, monthlyEarned, monthlyTransactions, history, COINS_PER_TRANSACTION, MAX_MONTHLY_TRANSACTIONS, PREMIUM_COST_IN_COINS, getVoucherDiscount } = useCoins();
    const [activeTab, setActiveTab] = useState('about');

    const vouchers = [
        { id: 1, type: 'premium', discount: 50, expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), status: 'active' },
        { id: 2, type: 'pro', discount: 20, expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), status: 'active' },
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getDaysLeft = (dateString) => {
        const diff = new Date(dateString) - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const cardStyle = {
        backgroundColor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
    };

    if (!isAuthenticated) {
        return (
            <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '64px' }}>
                <div className="text-center" style={{ maxWidth: '400px', padding: '0 16px' }}>
                    <div style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, var(--color-premium-gold), var(--color-premium-gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', opacity: 0.8 }}>
                        <Coins style={{ width: '36px', height: '36px', color: '#fff' }} />
                    </div>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Kirish talab etiladi</h1>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>Coinlar va vaucherlarni ko'rish uchun tizimga kiring</p>
                    <Link to="/login" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>Kirish</Link>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'about', label: 'Qanday ishlaydi?', icon: HelpCircle },
        { id: 'vouchers', label: 'Vaucherlarim', icon: Gift },
        { id: 'history', label: 'Tarix', icon: Clock },
    ];

    return (
        <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '64px' }}>
            <div className="gh-container" style={{ maxWidth: '960px' }}>
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <Link to="/">Home</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">Coinlar</span>
                </div>

                {/* Header */}
                <div className="text-center" style={{ paddingTop: '24px', marginBottom: '32px' }}>
                    <div className="badge badge-yellow inline-flex items-center gap-2" style={{ padding: '6px 14px', marginBottom: '16px', fontSize: '13px' }}>
                        <Coins className="w-3.5 h-3.5" />
                        <span>Coin Tizimi</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: '10px' }}>
                        🪙 Coinlar va Vaucherlar
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                        Akkaunt sotib oling yoki soting — coin yig'ing va chegirmalar oling!
                    </p>
                </div>

                {/* Balance Card */}
                <div style={{
                    ...cardStyle,
                    padding: '24px',
                    marginBottom: '24px',
                    background: 'linear-gradient(135deg, rgba(212,167,44,0.08) 0%, rgba(255,152,0,0.08) 100%)',
                    border: '1px solid rgba(212,167,44,0.2)',
                }}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between" style={{ gap: '20px' }}>
                        <div className="flex items-center gap-4">
                            <div style={{
                                width: '56px', height: '56px',
                                background: 'linear-gradient(135deg, var(--color-premium-gold), var(--color-premium-gold-light))',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Coins style={{ width: '28px', height: '28px', color: '#fff' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Sizning balansingiz</p>
                                <p style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
                                    {balance} <span style={{ color: 'var(--color-premium-gold-light)' }}>Coin</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap" style={{ gap: '12px' }}>
                            <div style={{ padding: '10px 16px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-muted)' }}>
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Bu oy yig'ildi</p>
                                <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent-green)' }}>+{monthlyEarned} coin</p>
                            </div>
                            <div style={{ padding: '10px 16px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-muted)' }}>
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Tranzaksiyalar</p>
                                <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>{monthlyTransactions}/{MAX_MONTHLY_TRANSACTIONS}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs" style={{ marginBottom: '20px' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div style={cardStyle}>
                    {activeTab === 'about' && (
                        <div>
                            {/* How to earn */}
                            <div style={{ marginBottom: '28px' }}>
                                <h3 className="flex items-center gap-2" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
                                    <TrendingUp className="w-5 h-5" style={{ color: 'var(--color-accent-green)' }} />
                                    Coin qanday yig'iladi?
                                </h3>
                                <div className="grid md:grid-cols-2" style={{ gap: '12px' }}>
                                    <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-muted)' }}>
                                        <div className="flex items-center gap-3" style={{ marginBottom: '10px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ShoppingBag className="w-4 h-4" style={{ color: 'var(--color-accent-green)' }} />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>Akkaunt sotish</p>
                                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Har bir sotuv uchun</p>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-premium-gold-light)' }}>+{COINS_PER_TRANSACTION} coin</p>
                                    </div>
                                    <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-muted)' }}>
                                        <div className="flex items-center gap-3" style={{ marginBottom: '10px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-info-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ShoppingBag className="w-4 h-4" style={{ color: 'var(--color-accent-blue)' }} />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>Akkaunt sotib olish</p>
                                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Har bir xarid uchun</p>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-premium-gold-light)' }}>+{COINS_PER_TRANSACTION} coin</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2" style={{ marginTop: '12px', padding: '12px 16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warning-bg)', border: '1px solid var(--color-accent-orange)' }}>
                                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent-orange)' }} />
                                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                        <strong>Muhim:</strong> Oyiga faqat birinchi <strong>{MAX_MONTHLY_TRANSACTIONS} ta</strong> tranzaksiya uchun coin beriladi
                                        Maksimum <strong>{MAX_MONTHLY_TRANSACTIONS * COINS_PER_TRANSACTION} coin</strong> oyiga.
                                    </p>
                                </div>
                            </div>

                            {/* How to use */}
                            <div style={{ marginBottom: '28px' }}>
                                <h3 className="flex items-center gap-2" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
                                    <Gift className="w-5 h-5" style={{ color: 'var(--color-accent-blue)' }} />
                                    Coinni qanday ishlatish mumkin?
                                </h3>
                                <div className="flex items-center gap-4" style={{ padding: '16px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, var(--color-info-bg) 0%, rgba(137,87,229,0.06) 100%)', border: '1px solid var(--color-accent-blue)' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--color-accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Star style={{ width: '24px', height: '24px', color: '#fff' }} />
                                    </div>
                                    <div className="flex-1">
                                        <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>Premium obuna BEPUL</p>
                                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>100 coin sarflab Premium obunani bepul oling</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-premium-gold-light)' }}>{PREMIUM_COST_IN_COINS}</p>
                                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>coin</p>
                                    </div>
                                </div>
                            </div>

                            {/* Voucher Info */}
                            <div>
                                <h3 className="flex items-center gap-2" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
                                    <Clock className="w-5 h-5" style={{ color: 'var(--color-accent-orange)' }} />
                                    Voucher haqida
                                </h3>
                                <div className="grid md:grid-cols-2" style={{ gap: '12px', marginBottom: '12px' }}>
                                    <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-muted)' }}>
                                        <p style={{ color: 'var(--color-accent-blue)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '8px' }}>Premium obunachi</p>
                                        <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>50% <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)' }}>chegirma</span></p>
                                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Premium obunaga avtomatik voucher</p>
                                    </div>
                                    <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-muted)' }}>
                                        <p style={{ color: 'var(--color-accent-purple)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '8px' }}>Pro obunachi</p>
                                        <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>20% <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)' }}>chegirma</span></p>
                                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Pro obunaga avtomatik voucher</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2" style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warning-bg)', border: '1px solid var(--color-accent-orange)' }}>
                                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent-orange)' }} />
                                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                        <strong>Eslatma:</strong> Vaucherlar <strong>3 oy</strong> davomida amal qiladi. 3 oydan keyin ishlatilmagan vaucherlar o'chirib tashlanadi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'vouchers' && (
                        <div>
                            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>Sizning vaucherlaringiz</h3>
                            {vouchers.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {vouchers.map(voucher => (
                                        <div key={voucher.id} className="flex items-center gap-4" style={{ padding: '14px 16px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-muted)' }}>
                                            <div style={{
                                                width: '48px', height: '48px', borderRadius: 'var(--radius-xl)',
                                                background: voucher.type === 'premium' ? 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))' : 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-green))',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                            }}>
                                                <Gift style={{ width: '24px', height: '24px', color: '#fff' }} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{voucher.discount}% chegirma</p>
                                                    <span className={`badge ${voucher.type === 'premium' ? 'badge-purple' : 'badge-blue'}`}>
                                                        {voucher.type === 'premium' ? 'Premium' : 'Pro'}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Amal qiladi: {formatDate(voucher.expiresAt)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: getDaysLeft(voucher.expiresAt) < 30 ? 'var(--color-accent-orange)' : 'var(--color-accent-green)' }}>
                                                    {getDaysLeft(voucher.expiresAt)} kun qoldi
                                                </p>
                                                <Link to="/premium" className="flex items-center gap-1 justify-end" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-accent)', marginTop: '4px', textDecoration: 'none' }}>
                                                    Ishlatish <ChevronRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <Gift className="empty-state-icon" />
                                    <p className="empty-state-title">Hozircha vaucherlar yo'q</p>
                                    <p className="empty-state-description">Premium yoki Pro obunaga o'ting va voucher oling!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>Coin tarixi</h3>
                            {history.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {history.slice().reverse().map(item => (
                                        <div key={item.id} className="flex items-center gap-3" style={{ padding: '10px 14px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-secondary)' }}>
                                            <div style={{
                                                width: '36px', height: '36px', borderRadius: 'var(--radius-md)',
                                                backgroundColor: item.type === 'earned' ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                            }}>
                                                {item.type === 'earned' ? (
                                                    <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-accent-green)' }} />
                                                ) : (
                                                    <ShoppingBag className="w-4 h-4" style={{ color: 'var(--color-error)' }} />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>{item.reason}</p>
                                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{formatDate(item.date)}</p>
                                            </div>
                                            <p style={{ fontWeight: 'var(--font-weight-bold)', color: item.amount > 0 ? 'var(--color-accent-green)' : 'var(--color-error)' }}>
                                                {item.amount > 0 ? '+' : ''}{item.amount} coin
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <Clock className="empty-state-icon" />
                                    <p className="empty-state-title">Tarix bo'sh</p>
                                    <p className="empty-state-description">Akkaunt sotib oling yoki soting — coin yig'ing!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* CTA */}
                {balance >= PREMIUM_COST_IN_COINS && (
                    <div className="text-center" style={{
                        marginTop: '24px', padding: '28px',
                        borderRadius: 'var(--radius-xl)',
                        background: 'linear-gradient(135deg, var(--color-info-bg) 0%, rgba(137,87,229,0.06) 100%)',
                        border: '1px solid var(--color-accent-blue)',
                    }}>
                        <CheckCircle style={{ width: '48px', height: '48px', color: 'var(--color-accent-green)', margin: '0 auto 16px' }} />
                        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Tabriklaymiz! 🎉</h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>Sizda {balance} coin bor — Premium obunani BEPUL olishingiz mumkin!</p>
                        <Link to="/premium" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
                            Premium olish <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoinsPage;
