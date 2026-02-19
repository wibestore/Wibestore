import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { formatPrice } from '../../data/mockData';

const AdminFinance = () => {
    const stats = [
        { label: 'Umumiy daromad', value: formatPrice(45800000), icon: DollarSign, color: 'var(--color-accent-green)', change: '+12%' },
        { label: 'Bu oydagi savdo', value: formatPrice(8500000), icon: TrendingUp, color: 'var(--color-accent-blue)', change: '+8%' },
        { label: 'Komissiya daromadi', value: formatPrice(4580000), icon: CreditCard, color: 'var(--color-accent-purple)', change: '+15%' },
        { label: "To'lovlar", value: formatPrice(3200000), icon: TrendingDown, color: 'var(--color-accent-orange)', change: '-3%' },
    ];

    const transactions = [
        { id: 1, type: 'sale', user: 'ProGamer_UZ', amount: 2500000, commission: 250000, date: '2026-02-18', status: 'completed' },
        { id: 2, type: 'sale', user: 'GameStore_TJ', amount: 3800000, commission: 380000, date: '2026-02-17', status: 'completed' },
        { id: 3, type: 'withdrawal', user: 'FFKing_UZ', amount: 1080000, commission: 0, date: '2026-02-17', status: 'pending' },
        { id: 4, type: 'sale', user: 'SO2Master', amount: 1800000, commission: 180000, date: '2026-02-16', status: 'completed' },
        { id: 5, type: 'withdrawal', user: 'ProGamer_UZ', amount: 2250000, commission: 0, date: '2026-02-15', status: 'completed' },
    ];

    const typeLabels = {
        sale: { label: 'Sotish', color: 'var(--color-accent-green)' },
        withdrawal: { label: "Pul yechish", color: 'var(--color-accent-orange)' },
    };

    return (
        <div>
            <h1 style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
            }}>
                Moliya
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '16px', marginBottom: '24px' }}>
                {stats.map((stat, i) => (
                    <div key={i} style={{
                        padding: '20px',
                        borderRadius: 'var(--radius-xl)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border-default)',
                    }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                borderRadius: 'var(--radius-lg)',
                                backgroundColor: stat.color + '1a',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <stat.icon style={{ width: '20px', height: '20px', color: stat.color }} />
                            </div>
                            <span style={{
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: stat.change.startsWith('+') ? 'var(--color-accent-green)' : 'var(--color-accent-red)',
                            }}>
                                {stat.change}
                            </span>
                        </div>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: '4px' }}>{stat.label}</p>
                        <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Transactions Table */}
            <div style={{
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-default)',
                overflow: 'hidden',
            }}>
                <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--color-border-muted)',
                }}>
                    <h2 style={{
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text-primary)',
                    }}>
                        So'nggi tranzaksiyalar
                    </h2>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border-muted)' }}>
                                {['Turi', 'Foydalanuvchi', 'Summa', 'Komissiya', 'Sana', 'Holati'].map(header => (
                                    <th key={header} style={{
                                        padding: '12px 16px',
                                        textAlign: 'left',
                                        fontSize: 'var(--font-size-xs)',
                                        fontWeight: 'var(--font-weight-medium)',
                                        color: 'var(--color-text-muted)',
                                        textTransform: 'uppercase',
                                    }}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => {
                                const typeInfo = typeLabels[tx.type];
                                return (
                                    <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border-muted)' }}>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{
                                                padding: '2px 10px',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: 'var(--font-size-xs)',
                                                fontWeight: 'var(--font-weight-medium)',
                                                backgroundColor: typeInfo.color + '1a',
                                                color: typeInfo.color,
                                            }}>
                                                {typeInfo.label}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>
                                            {tx.user}
                                        </td>
                                        <td style={{ padding: '12px 16px', color: 'var(--color-text-primary)' }}>
                                            {formatPrice(tx.amount)}
                                        </td>
                                        <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>
                                            {tx.commission > 0 ? formatPrice(tx.commission) : '—'}
                                        </td>
                                        <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                            {tx.date}
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{
                                                padding: '2px 10px',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: 'var(--font-size-xs)',
                                                fontWeight: 'var(--font-weight-medium)',
                                                backgroundColor: tx.status === 'completed' ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
                                                color: tx.status === 'completed' ? 'var(--color-success-text)' : 'var(--color-warning-text)',
                                            }}>
                                                {tx.status === 'completed' ? 'Bajarildi' : 'Kutilmoqda'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminFinance;
