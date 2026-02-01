import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Gamepad2, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import emailjs from '@emailjs/browser';

// EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_eh6ud1l';
const EMAILJS_TEMPLATE_ID = 'template_hukqqt4';
const EMAILJS_PUBLIC_KEY = 'Fe_UI6pb3qY22XkZd';

// Xush kelibsiz emaili
const sendWelcomeEmail = (user) => {
    const registerTime = new Date().toLocaleString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tashkent'
    });

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        user_name: user.name,
        user_email: user.email,
        login_time: registerTime + " (Ro'yxatdan o'tish)"
    }, EMAILJS_PUBLIC_KEY)
        .then(() => console.log('Welcome email yuborildi!'))
        .catch((err) => console.error('Email xatosi:', err));
};
const SignupPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
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
            setError('Parollar mos kelmaydi');
            return;
        }

        if (formData.password.length < 6) {
            setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
            return;
        }

        if (!formData.agreeTerms) {
            setError('Foydalanish shartlariga rozilik bering');
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
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <Gamepad2 className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            wibestore.com
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2">Ro'yxatdan o'ting</h1>
                    <p className="text-gray-400">Akkaunt sotib oling va soting!</p>
                </div>

                {/* Features */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Sotib oling <span className="text-purple-400 font-medium">va</span> soting - bir hisob!</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm mt-2">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Faqat 10% komissiya (Premium: 0%)</span>
                    </div>
                </div>

                {/* Signup Form */}
                <div className="bg-[#1e1e32] rounded-2xl p-8 border border-white/5">
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
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                To'liq ism
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ismingiz"
                                    className="w-full pl-12 pr-4 py-3 bg-[#25253a] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@example.com"
                                    className="w-full pl-12 pr-4 py-3 bg-[#25253a] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Telefon raqam
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+998 90 123 45 67"
                                    className="w-full pl-12 pr-4 py-3 bg-[#25253a] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Parol
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Kamida 6 ta belgi"
                                    className="w-full pl-12 pr-12 py-3 bg-[#25253a] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Parolni tasdiqlang
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="Parolni qaytadan kiriting"
                                    className="w-full pl-12 pr-4 py-3 bg-[#25253a] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
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
                                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-[#25253a] text-purple-500 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-400">
                                <Link to="/terms" className="text-purple-400 hover:underline">Foydalanish shartlari</Link> va{' '}
                                <Link to="/privacy" className="text-purple-400 hover:underline">Maxfiylik siyosati</Link>ga roziman
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
                        </button>
                    </form>
                </div>

                {/* Login Link */}
                <p className="text-center mt-6 text-gray-400">
                    Hisobingiz bormi?{' '}
                    <Link to="/login" className="text-purple-400 hover:underline font-medium">
                        Kirish
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
