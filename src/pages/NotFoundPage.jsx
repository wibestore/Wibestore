import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage = () => {
    const { t } = useLanguage();

    return (
        <div
            className="page-enter flex items-center justify-center"
            style={{ minHeight: 'calc(100vh - 64px)', padding: '32px 16px' }}
        >
            <div className="text-center" style={{ maxWidth: '500px' }}>
                {/* 404 */}
                <div
                    style={{
                        fontSize: 'clamp(100px, 20vw, 180px)',
                        fontWeight: 'var(--font-weight-bold)',
                        lineHeight: 1,
                        color: 'var(--color-text-muted)',
                        opacity: 0.2,
                        userSelect: 'none',
                        marginBottom: '16px',
                    }}
                >
                    404
                </div>

                {/* Icon */}
                <div
                    className="flex items-center justify-center mx-auto"
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: 'var(--radius-xl)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border-default)',
                        marginBottom: '24px',
                        marginTop: '-40px',
                    }}
                >
                    <Gamepad2 className="w-8 h-8" style={{ color: 'var(--color-text-muted)' }} />
                </div>

                {/* Text */}
                <h1
                    style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--color-text-primary)',
                        marginBottom: '8px',
                    }}
                >
                    {t('not_found.title') || 'Page not found'}
                </h1>
                <p
                    style={{
                        color: 'var(--color-text-secondary)',
                        marginBottom: '32px',
                        lineHeight: 'var(--line-height-lg)',
                    }}
                >
                    {t('not_found.description') || "Sorry, the page you're looking for doesn't exist or has been moved."}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3" style={{ marginBottom: '32px' }}>
                    <Link
                        to="/"
                        className="btn btn-primary btn-lg flex items-center gap-2"
                        style={{ textDecoration: 'none' }}
                    >
                        <Home className="w-4 h-4" />
                        {t('not_found.home') || 'Go home'}
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-secondary btn-lg flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('not_found.back') || 'Go back'}
                    </button>
                </div>

                {/* Suggested links */}
                <div
                    style={{
                        padding: '20px 24px',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border-default)',
                    }}
                >
                    <div className="flex items-center gap-2" style={{ marginBottom: '12px' }}>
                        <Search className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            {t('not_found.suggestions') || 'You might want to check:'}
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { to: '/products', label: t('nav.products') || 'Products' },
                            { to: '/premium', label: t('nav.premium') || 'Premium' },
                            { to: '/top', label: t('nav.top') || 'Top' },
                            { to: '/faq', label: 'FAQ' },
                        ].map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="btn btn-ghost btn-sm"
                                style={{
                                    textDecoration: 'none',
                                    border: '1px solid var(--color-border-default)',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
