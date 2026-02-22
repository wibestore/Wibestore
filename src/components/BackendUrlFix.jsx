import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { getEffectiveBaseURL, isApiUrlLikelyWrong } from '../lib/apiClient';

/**
 * 405 yoki "backend sozlanmagan" bo'lganda ko'rsatiladi.
 * Foydalanuvchi backend URL ni kiriting, Saqlash → sahifa qayta yuklanadi va API shu URL ga boradi.
 */
export function BackendUrlFix({ showFor405 = false, compact = false }) {
    const [url, setUrl] = useState(() => {
        try {
            const stored = localStorage.getItem('wibe_api_base_url');
            return stored && stored.startsWith('http') ? stored : '';
        } catch {
            return '';
        }
    });
    const [saving, setSaving] = useState(false);
    const [localError, setLocalError] = useState('');

    const shouldShow = showFor405 || isApiUrlLikelyWrong();
    if (!shouldShow) return null;

    const handleSave = (e) => {
        e.preventDefault();
        setLocalError('');
        const raw = url.trim();
        if (!raw) {
            setLocalError("URL kiriting (masalan https://backend.railway.app/api/v1)");
            return;
        }
        let normalized = raw;
        if (!normalized.startsWith('http')) normalized = 'https://' + normalized;
        try {
            new URL(normalized);
        } catch {
            setLocalError("Noto'g'ri URL");
            return;
        }
        if (!normalized.includes('/api/v1') && !normalized.endsWith('/api/v1')) {
            normalized = normalized.replace(/\/?$/, '') + '/api/v1';
        }
        setSaving(true);
        try {
            localStorage.setItem('wibe_api_base_url', normalized);
            window.location.reload();
        } catch (err) {
            setLocalError('Saqlash amalga oshmadi');
            setSaving(false);
        }
    };

    const clearStored = () => {
        localStorage.removeItem('wibe_api_base_url');
        setUrl('');
        window.location.reload();
    };

    const currentBase = typeof window !== 'undefined' ? getEffectiveBaseURL() : '';

    if (compact) {
        return (
            <div
                style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-warning-bg, rgba(234,179,8,0.1))',
                    border: '1px solid var(--color-border-muted)',
                    marginBottom: '16px',
                }}
            >
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                    Backend manzili sozlanmagan (405). Quyida backend API manzilingizni kiriting:
                </p>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://sizning-backend.railway.app/api/v1"
                        className="input input-md"
                        style={{ width: '100%' }}
                        autoComplete="url"
                    />
                    {localError && <p style={{ fontSize: '12px', color: 'var(--color-error)' }}>{localError}</p>}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button type="submit" className="btn btn-primary btn-md" disabled={saving}>
                            {saving ? '...' : "Saqlash va qayta yuklash"}
                        </button>
                        {currentBase.startsWith('http') && (
                            <button type="button" className="btn btn-secondary btn-md" onClick={clearStored}>
                                Saqlangan URL ni o'chirish
                            </button>
                        )}
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-info-bg, rgba(59,130,246,0.08))',
                border: '1px solid var(--color-border-default)',
                marginBottom: '20px',
            }}
        >
            <div className="flex items-center gap-2" style={{ marginBottom: '12px' }}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-warning)' }} />
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Backend manzili sozlanmagan (405)
                </span>
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                Railway dashboarddan backend service ning URL ini nusxalang (masalan{' '}
                <code style={{ fontSize: '12px' }}>https://...-backend.railway.app</code>) va quyida <strong>/api/v1</strong> bilan
                kiriting. Saqlash tugmasidan keyin sahifa qayta yuklanadi va Google kirish ishlashi kerak.
            </p>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://sizning-backend.railway.app/api/v1"
                    className="input input-md"
                    style={{ width: '100%' }}
                    autoComplete="url"
                />
                {localError && (
                    <p style={{ fontSize: '12px', color: 'var(--color-error)' }}>{localError}</p>
                )}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button type="submit" className="btn btn-primary btn-md" disabled={saving}>
                        {saving ? 'Saqlanmoqda...' : "Saqlash va qayta yuklash"}
                    </button>
                    {currentBase.startsWith('http') && (
                        <button type="button" className="btn btn-secondary btn-md" onClick={clearStored}>
                            Saqlangan URL ni o'chirish
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default BackendUrlFix;
