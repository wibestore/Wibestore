import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Gamepad2, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendWelcomeEmail } from '../lib/emailService';
import { useLanguage } from '../context/LanguageContext';

const SignupPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { t } = useLanguage();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError(t('signup.password_mismatch'));
            return;
        }

        if (formData.password.length < 6) {
            setError(t('signup.password_short'));
            return;
        }

        if (!formData.agreeTerms) {
            setError(t('signup.agree_terms'));
            return;
        }

        setIsLoading(true);

        try {
            const newUser = await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });
            sendWelcomeEmail(newUser);  // Xush kelibsiz emaili
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
            <div className="w-full max-w-md px-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Gamepad2 className="w-7 h-7" style={{ color: '#ffffff' }} />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                            wibestore.uz
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('signup.title')}</h1>
                    <p className="text-gray-500">{t('signup.subtitle')}</p>
                </div>

                {/* Features */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{t('signup.feature1')} <span className="text-blue-600 font-medium">{t('signup.feature1_and')}</span> {t('signup.feature1_end')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm mt-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{t('signup.feature2')}</span>
                    </div>
                </div>

                {/* Signup Form */}
                <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {t('signup.name')}
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder={t('signup.name_placeholder')}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
                                    style={{ paddingLeft: '52px' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {t('signup.email')}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder={t('signup.email_placeholder')}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
                                    style={{ paddingLeft: '52px' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {t('signup.phone')}
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder={t('signup.phone_placeholder')}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
                                    style={{ paddingLeft: '52px' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {t('signup.password')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder={t('signup.password_placeholder')}
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
                                    style={{ paddingLeft: '52px' }}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {t('signup.confirm_password')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder={t('signup.confirm_placeholder')}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
                                    style={{ paddingLeft: '52px' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.agreeTerms}
                                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                className="w-4 h-4 mt-0.5 rounded border-slate-300 bg-slate-50 text-blue-500 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-500">
                                <Link to="/terms" className="text-blue-500 hover:underline">{t('signup.terms')}</Link> va{' '}
                                <Link to="/terms" className="text-blue-500 hover:underline">{t('signup.privacy')}</Link>{t('signup.agree')}
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ color: '#ffffff' }}
                        >
                            {isLoading ? t('signup.loading') : t('signup.submit')}
                        </button>
                    </form>
                </div>

                {/* Login Link */}
                <p className="text-center mt-6 text-gray-400">
                    {t('signup.has_account')}{' '}
                    <Link to="/login" className="text-blue-500 hover:underline font-medium">
                        {t('signup.login_link')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
