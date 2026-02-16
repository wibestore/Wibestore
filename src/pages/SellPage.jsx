import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, DollarSign, Image, FileText, Tag, Shield, AlertCircle, CheckCircle, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { games } from '../data/mockData';

const SellPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showGameModal, setShowGameModal] = useState(false);
    const [modalGameSearch, setModalGameSearch] = useState('');

    // Filter modal games by search
    const filteredModalGames = modalGameSearch
        ? games.filter(g => g.name.toLowerCase().includes(modalGameSearch.toLowerCase()))
        : games;

    const [formData, setFormData] = useState({
        gameId: '',
        title: '',
        description: '',
        price: '',
        level: '',
        rank: '',
        skins: '',
        features: [],
        images: [],
        loginMethod: 'email',
        accountEmail: '',
        accountPassword: '',
        additionalInfo: ''
    });

    const [errors, setErrors] = useState({});

    // Redirect if not logged in
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    const featureOptions = [
        'Original email',
        'Email o\'zgartirish mumkin',
        'Telefon bog\'langan',
        'Google bog\'langan',
        'Ban yo\'q',
        'Hech qachon sotilmagan',
        'Premium/VIP',
        'Maxsus skinlar',
        '2FA yoqilgan',
        'Hamma qurollar ochiq'
    ];

    const validateStep = (stepNum) => {
        const newErrors = {};

        if (stepNum === 1) {
            if (!formData.gameId) newErrors.gameId = 'O\'yinni tanlang';
            if (!formData.title.trim()) newErrors.title = 'Sarlavha kiriting';
            if (!formData.price || formData.price <= 0) newErrors.price = 'Narxni kiriting';
        }

        if (stepNum === 2) {
            if (!formData.description.trim()) newErrors.description = 'Tavsif kiriting';
        }

        if (stepNum === 3) {
            if (!formData.accountEmail.trim()) newErrors.accountEmail = 'Akkaunt emailini kiriting';
            if (!formData.accountPassword.trim()) newErrors.accountPassword = 'Akkaunt parolini kiriting';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const toggleFeature = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const handleSubmit = async () => {
        if (!validateStep(3)) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save to localStorage for demo
        const listings = JSON.parse(localStorage.getItem('wibeListings') || '[]');
        const newListing = {
            id: crypto.randomUUID(),
            ...formData,
            sellerId: user.id,
            sellerName: user.name,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        listings.push(newListing);
        localStorage.setItem('wibeListings', JSON.stringify(listings));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen" style={{ paddingTop: '140px', paddingBottom: '64px' }}>
                <div className="text-center max-w-md px-4">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">E&apos;lon yuborildi!</h1>
                    <p className="text-gray-500 mb-8">
                        Sizning e'loningiz moderatsiyaga yuborildi. 24 soat ichida tekshiriladi va tasdiqlangandan keyin saytda paydo bo'ladi.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/profile')}
                            className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-600"
                        >
                            Profilga o'tish
                        </button>
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setStep(1);
                                setFormData({
                                    gameId: '',
                                    title: '',
                                    description: '',
                                    price: '',
                                    level: '',
                                    rank: '',
                                    skins: '',
                                    features: [],
                                    images: [],
                                    loginMethod: 'email',
                                    accountEmail: '',
                                    accountPassword: '',
                                    additionalInfo: ''
                                });
                            }}
                            className="w-full py-4 rounded-xl font-semibold text-gray-600 bg-slate-100 hover:bg-slate-200"
                        >
                            Yana e'lon berish
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Game Selection Modal */}
            {showGameModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => {
                            setShowGameModal(false);
                            setModalGameSearch('');
                        }}
                    />
                    <div className="relative bg-white rounded-2xl border border-slate-200 w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
                        {/* Modal Header */}
                        <div className="p-4 border-b border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">O&apos;yin tanlang</h3>
                                <button
                                    onClick={() => {
                                        setShowGameModal(false);
                                        setModalGameSearch('');
                                    }}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                            {/* Modal Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={modalGameSearch}
                                    onChange={(e) => setModalGameSearch(e.target.value)}
                                    placeholder="O'yin nomini qidiring..."
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Modal Games Grid */}
                        <div className="p-4 overflow-y-auto max-h-[50vh]">
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {filteredModalGames.map((game) => (
                                    <button
                                        key={game.id}
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, gameId: game.id });
                                            setShowGameModal(false);
                                            setModalGameSearch('');
                                        }}
                                        className={`p-3 rounded-xl border-2 transition-all ${formData.gameId === game.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        <img src={game.image} alt={game.name} className="w-12 h-12 rounded-lg mx-auto mb-2 object-cover" />
                                        <p className="text-xs text-center text-gray-600 truncate">{game.name}</p>
                                    </button>
                                ))}
                            </div>
                            {filteredModalGames.length === 0 && (
                                <p className="text-center text-gray-500 py-8">Hech narsa topilmadi</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen" style={{ paddingTop: '140px', paddingBottom: '64px' }}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Akkaunt sotish</h1>
                        <p className="text-gray-500">O&apos;yin akkauntingizni xavfsiz soting</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-8">
                        {[1, 2, 3].map((s, i) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                    : 'bg-slate-100 text-gray-500'
                                    }`}
                                    style={step >= s ? { color: '#ffffff' } : {}}
                                >
                                    {s}
                                </div>
                                {i < 2 && (
                                    <div className={`w-16 h-1 ${step > s ? 'bg-blue-500' : 'bg-slate-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm">
                        {/* Step 1: Basic Info */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-blue-500" />
                                    Asosiy ma'lumotlar
                                </h2>

                                {/* Game Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">O'yin *</label>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                        {games.slice(0, 8).map((game) => (
                                            <button
                                                key={game.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gameId: game.id })}
                                                className={`p-3 rounded-xl border-2 transition-all ${formData.gameId === game.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-slate-200 hover:border-blue-300'
                                                    }`}
                                            >
                                                <img src={game.image} alt={game.name} className="w-12 h-12 rounded-lg mx-auto mb-2 object-cover" />
                                                <p className="text-xs text-center text-gray-600 truncate">{game.name}</p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Show All Games Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowGameModal(true)}
                                        className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-slate-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Boshqa o'yinlarni ko'rish ({games.length} ta)
                                    </button>

                                    {errors.gameId && <p className="text-red-400 text-sm mt-1">{errors.gameId}</p>}
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Sarlavha *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Masalan: Level 50, 100+ skin, Maxsus qurollar"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Narx (so'm) *</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="500000"
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                    {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
                                    <p className="text-sm text-gray-500 mt-1">Komissiya: 10% (siz olasiz: {formData.price ? (formData.price * 0.9).toLocaleString() : 0} so'm)</p>
                                </div>

                                {/* Level & Rank */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Level</label>
                                        <input
                                            type="text"
                                            value={formData.level}
                                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                            placeholder="50"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Rank/Darajasi</label>
                                        <input
                                            type="text"
                                            value={formData.rank}
                                            onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                            placeholder="Diamond"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Details */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-500" />
                                    Batafsil ma'lumot
                                </h2>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Tavsif *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Akkaunt haqida batafsil ma'lumot: skinlar, qurollar, yutuqlar..."
                                        rows={5}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                                    />
                                    {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                                </div>

                                {/* Features */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Xususiyatlar</label>
                                    <div className="flex flex-wrap gap-2">
                                        {featureOptions.map((feature) => (
                                            <button
                                                key={feature}
                                                type="button"
                                                onClick={() => toggleFeature(feature)}
                                                className={`px-4 py-2 rounded-full text-sm transition-all ${formData.features.includes(feature)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-slate-100 text-gray-500 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {feature}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Skins count */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Skinlar soni</label>
                                    <input
                                        type="text"
                                        value={formData.skins}
                                        onChange={(e) => setFormData({ ...formData, skins: e.target.value })}
                                        placeholder="50+"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Images upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Rasmlar (max 5 ta)</label>

                                    {/* Image previews */}
                                    {formData.images.length > 0 && (
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                                            {formData.images.map((img, index) => (
                                                <div key={index} className="relative group aspect-square">
                                                    <img
                                                        src={img}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover rounded-xl border border-white/10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                images: prev.images.filter((_, i) => i !== index)
                                                            }));
                                                        }}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Upload button */}
                                    {formData.images.length < 5 && (
                                        <label className="block border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files);
                                                    const remainingSlots = 5 - formData.images.length;
                                                    const filesToAdd = files.slice(0, remainingSlots);

                                                    filesToAdd.forEach(file => {
                                                        if (file.size > 5 * 1024 * 1024) {
                                                            alert('Rasm hajmi 5MB dan oshmasligi kerak');
                                                            return;
                                                        }

                                                        const reader = new FileReader();
                                                        reader.onload = (event) => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                images: [...prev.images, event.target.result]
                                                            }));
                                                        };
                                                        reader.readAsDataURL(file);
                                                    });

                                                    e.target.value = '';
                                                }}
                                            />
                                            <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                                            <p className="text-gray-400">Rasmlarni yuklash uchun bosing</p>
                                            <p className="text-sm text-gray-500 mt-1">PNG, JPG (max 5MB, {5 - formData.images.length} ta qoldi)</p>
                                        </label>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Account Details */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-green-400" />
                                    Akkaunt ma'lumotlari
                                </h2>

                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        <div className="text-sm text-yellow-700">
                                            <p className="font-medium mb-1">Muhim!</p>
                                            <p className="text-yellow-600">Bu ma'lumotlar faqat xarid tasdiqlangandan keyin xaridorga ko'rsatiladi. Bizning escrow tizimimiz sizni himoya qiladi.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Login Method */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Kirish usuli</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['email', 'google', 'facebook'].map((method) => (
                                            <button
                                                key={method}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, loginMethod: method })}
                                                className={`p-3 rounded-xl border-2 transition-all capitalize ${formData.loginMethod === method
                                                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                                                    : 'border-slate-200 text-gray-600 hover:border-blue-300'
                                                    }`}
                                            >
                                                {method}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Account Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Akkaunt email/login *</label>
                                    <input
                                        type="text"
                                        value={formData.accountEmail}
                                        onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                                        placeholder="akkaunt@email.com"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                    {errors.accountEmail && <p className="text-red-400 text-sm mt-1">{errors.accountEmail}</p>}
                                </div>

                                {/* Account Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Akkaunt paroli *</label>
                                    <input
                                        type="password"
                                        value={formData.accountPassword}
                                        onChange={(e) => setFormData({ ...formData, accountPassword: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                    {errors.accountPassword && <p className="text-red-400 text-sm mt-1">{errors.accountPassword}</p>}
                                </div>

                                {/* Additional Info */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Qo'shimcha ma'lumot</label>
                                    <textarea
                                        value={formData.additionalInfo}
                                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                        placeholder="Masalan: email paroli, bog'langan telefon, va h.k."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                            {step > 1 ? (
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-3 rounded-xl font-medium text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                    Orqaga
                                </button>
                            ) : (
                                <div />
                            )}

                            {step < 3 ? (
                                <button
                                    onClick={nextStep}
                                    className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                                    style={{ color: '#ffffff' }}
                                >
                                    Keyingi
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Yuborilmoqda...' : 'E\'lonni yuborish'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                            <div className="text-sm text-gray-400">
                                <p className="text-gray-800 font-medium mb-1">Xavfsiz sotish</p>
                                <p>Escrow tizimi orqali pulingiz xavfsiz. Xaridor akkauntni tasdiqlaguncha pul saytda saqlanadi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellPage;
