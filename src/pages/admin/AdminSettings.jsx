import { useState } from 'react';
import { Settings, Shield, Bell, Globe, Save, Check } from 'lucide-react';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        siteName: 'WibeStore',
        siteDescription: "O'yin akkauntlari savdo platformasi",
        commissionRate: 10,
        maxListingsPerUser: 20,
        autoApproveListings: false,
        maintenanceMode: false,
        emailNotifications: true,
        pushNotifications: true,
        securityAlerts: true,
    });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        localStorage.setItem('wibeAdminSettings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const Section = ({ title, icon: Icon, children }) => (
        <div style={{
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border-default)',
            marginBottom: '20px',
            overflow: 'hidden',
        }}>
            <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--color-border-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}>
                <Icon style={{ width: '18px', height: '18px', color: 'var(--color-text-muted)' }} />
                <h2 style={{
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-base)',
                }}>{title}</h2>
            </div>
            <div style={{ padding: '20px' }}>
                {children}
            </div>
        </div>
    );

    const Toggle = ({ label, desc, checked, onChange }) => (
        <div className="flex items-center justify-between" style={{
            padding: '12px 0',
            borderBottom: '1px solid var(--color-border-muted)',
        }}>
            <div>
                <p style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>{label}</p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{desc}</p>
            </div>
            <button
                onClick={() => onChange(!checked)}
                style={{
                    width: '44px', height: '24px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: checked ? 'var(--color-accent-blue)' : 'var(--color-bg-tertiary)',
                    border: `1px solid ${checked ? 'var(--color-accent-blue)' : 'var(--color-border-default)'}`,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                }}
            >
                <div style={{
                    width: '18px', height: '18px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#ffffff',
                    position: 'absolute', top: '2px',
                    left: checked ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: 'var(--shadow-xs)',
                }} />
            </button>
        </div>
    );

    return (
        <div>
            <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                <h1 style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                }}>
                    Sozlamalar
                </h1>
                <button
                    onClick={handleSave}
                    className="btn btn-primary btn-md"
                    style={{ gap: '8px' }}
                >
                    {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? 'Saqlandi!' : 'Saqlash'}
                </button>
            </div>

            {/* General Settings */}
            <Section title="Umumiy sozlamalar" icon={Settings}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label className="input-label">Sayt nomi</label>
                        <input
                            type="text"
                            value={settings.siteName}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            className="input input-md"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label className="input-label">Sayt tavsifi</label>
                        <input
                            type="text"
                            value={settings.siteDescription}
                            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                            className="input input-md"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                        <div>
                            <label className="input-label">Komissiya foizi (%)</label>
                            <input
                                type="number"
                                value={settings.commissionRate}
                                onChange={(e) => setSettings({ ...settings, commissionRate: Number(e.target.value) })}
                                className="input input-md"
                                style={{ width: '100%' }}
                                min={0} max={100}
                            />
                        </div>
                        <div>
                            <label className="input-label">Max e'lonlar soni (har bir user)</label>
                            <input
                                type="number"
                                value={settings.maxListingsPerUser}
                                onChange={(e) => setSettings({ ...settings, maxListingsPerUser: Number(e.target.value) })}
                                className="input input-md"
                                style={{ width: '100%' }}
                                min={1} max={100}
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Security */}
            <Section title="Xavfsizlik" icon={Shield}>
                <Toggle
                    label="E'lonlarni avtomatik tasdiqlash"
                    desc="Yangi e'lonlar avtomatik tasdiqlansin"
                    checked={settings.autoApproveListings}
                    onChange={(v) => setSettings({ ...settings, autoApproveListings: v })}
                />
                <Toggle
                    label="Maintenance rejimi"
                    desc="Saytni texnik ishlarga yopish"
                    checked={settings.maintenanceMode}
                    onChange={(v) => setSettings({ ...settings, maintenanceMode: v })}
                />
            </Section>

            {/* Notifications */}
            <Section title="Bildirishnomalar" icon={Bell}>
                <Toggle
                    label="Email bildirishnomalar"
                    desc="Muhim hodisalar haqida email olish"
                    checked={settings.emailNotifications}
                    onChange={(v) => setSettings({ ...settings, emailNotifications: v })}
                />
                <Toggle
                    label="Push bildirishnomalar"
                    desc="Brauzer push bildirishnomalari"
                    checked={settings.pushNotifications}
                    onChange={(v) => setSettings({ ...settings, pushNotifications: v })}
                />
                <Toggle
                    label="Xavfsizlik ogohlantirishlari"
                    desc="Shubhali faoliyat haqida xabar olish"
                    checked={settings.securityAlerts}
                    onChange={(v) => setSettings({ ...settings, securityAlerts: v })}
                />
            </Section>
        </div>
    );
};

export default AdminSettings;
