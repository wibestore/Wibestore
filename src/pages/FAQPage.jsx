import { useState } from 'react';
import { HelpCircle, ChevronDown, Search, ShoppingBag, CreditCard, Shield, User, MessageCircle } from 'lucide-react';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: 'Barchasi', icon: HelpCircle },
        { id: 'buying', label: 'Xarid qilish', icon: ShoppingBag },
        { id: 'selling', label: 'Sotish', icon: CreditCard },
        { id: 'security', label: 'Xavfsizlik', icon: Shield },
        { id: 'account', label: 'Hisob', icon: User },
    ];

    const faqs = [
        {
            category: 'buying',
            question: 'Akkauntni qanday sotib olaman?',
            answer: 'Akkauntni tanlang, "Sotib olish" tugmasini bosing, to\'lov usulini tanlang va to\'lovni amalga oshiring. To\'lov tasdiqlangandan so\'ng akkaunt ma\'lumotlari sizga yuboriladi.'
        },
        {
            category: 'buying',
            question: 'To\'lov qanday amalga oshiriladi?',
            answer: 'Biz Payme, Click, Paynet, Uzcard va Humo orqali to\'lovlarni qabul qilamiz. Barcha to\'lovlar xavfsiz va shifrlangan.'
        },
        {
            category: 'buying',
            question: 'Akkaunt ishlamasa nima qilaman?',
            answer: '48 soat ichida "Shikoyat qilish" tugmasini bosing. Bizning moderatorlar tekshiradi va muammo tasdiqlansa, pul to\'liq qaytariladi.'
        },
        {
            category: 'buying',
            question: 'Akkauntni tekshirish uchun qancha vaqt bor?',
            answer: 'Xarid qilganidan keyin 48 soat ichida akkauntni tekshirishingiz va tasdiqlashingiz kerak. Bu vaqt ichida muammo bo\'lsa, pul qaytariladi.'
        },
        {
            category: 'selling',
            question: 'Akkauntimni qanday sotaman?',
            answer: 'Profilingizga kiring, "Sotish" sahifasiga o\'ting, akkaunt haqida ma\'lumotlarni to\'ldiring va e\'lon joylashtiring. Moderatsiyadan o\'tgandan keyin akkauntingiz saytda paydo bo\'ladi.'
        },
        {
            category: 'selling',
            question: 'Komissiya qancha?',
            answer: 'Free rejada 10%, Premium rejada 8%, Pro rejada 5% komissiya. Pro reja eng foydali variant!'
        },
        {
            category: 'selling',
            question: 'Pulni qachon olaman?',
            answer: 'Xaridor akkauntni tasdiqlaganidan keyin 1-3 ish kuni ichida pul sizning hamyoningizga o\'tkaziladi. Keyin bank kartangizga yechib olishingiz mumkin.'
        },
        {
            category: 'selling',
            question: 'E\'lonim nima uchun rad etildi?',
            answer: 'E\'lon qoidalarga mos kelmasa rad etiladi: noto\'g\'ri ma\'lumotlar, sifatsiz rasmlar, taqiqlangan kontent. Xatolikni tuzatib qayta yuborishingiz mumkin.'
        },
        {
            category: 'security',
            question: 'Escrow tizimi nima?',
            answer: 'Escrow - bu xavfsiz to\'lov tizimi. Xaridor to\'laganda pul bizda saqlanadi. Faqat xaridor akkauntni tasdiqlaganidan keyin pul sotuvchiga o\'tkaziladi.'
        },
        {
            category: 'security',
            question: 'Firibgarlikdan qanday himoyalanaman?',
            answer: 'Faqat platforma orqali savdo qiling, hech qachon platformadan tashqarida to\'lov qilmang. Shubhali e\'lonlarni xabar bering. Bizning moderatorlar 24/7 ishlaydi.'
        },
        {
            category: 'security',
            question: 'Ma\'lumotlarim xavfsizmi?',
            answer: 'Ha, biz SSL shifrlash va xavfsiz serverlardan foydalanamiz. Akkaunt ma\'lumotlari faqat xarid tasdiqlangandan keyin xaridorga ko\'rsatiladi.'
        },
        {
            category: 'account',
            question: 'Parolimni unutdim, nima qilaman?',
            answer: 'Login sahifasida "Parolni unutdingizmi?" havolasini bosing. Email manzilingizga parolni tiklash havolasi yuboriladi.'
        },
        {
            category: 'account',
            question: 'Hisobimni qanday o\'chiraman?',
            answer: 'Sozlamalar sahifasida "Hisobni o\'chirish" bo\'limiga o\'ting. Eslatma: o\'chirilgan hisobni tiklash mumkin emas.'
        },
        {
            category: 'account',
            question: 'Premium obunani qanday bekor qilaman?',
            answer: 'Sozlamalar > Obuna bo\'limiga o\'ting va "Bekor qilish" tugmasini bosing. Obuna davri oxirigacha Premium imkoniyatlardan foydalanishingiz mumkin.'
        },
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen" style={{ paddingTop: '140px', paddingBottom: '64px' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col items-center mb-14">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-6">
                        <HelpCircle className="w-4 h-4" />
                        Yordam markazi
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-5" style={{ textAlign: 'center' }}>
                        Ko&apos;p beriladigan savollar
                    </h1>
                    <p className="text-gray-500 text-lg" style={{ textAlign: 'center' }}>
                        Savolingizga javob toping yoki biz bilan bog&apos;laning
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-10">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Savol qidiring..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm"
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${activeCategory === cat.id
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25'
                                : 'bg-white text-gray-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                            style={activeCategory === cat.id ? { color: '#ffffff' } : {}}
                        >
                            <cat.icon className="w-4 h-4" />
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                        }`} />
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-6 text-gray-600 border-t border-slate-100 pt-4 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">Hech narsa topilmadi</p>
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div className="mt-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-10 text-center shadow-lg shadow-blue-500/20">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#ffffff' }} />
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>Javob topmadingizmi?</h3>
                    <p className="mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>Bizning qo&apos;llab-quvvatlash jamoamiz sizga yordam beradi</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://t.me/wibestoreuz"
                            className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                        >
                            💬 Telegram orqali
                        </a>
                        <a
                            href="mailto:support@wibestore.uz"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium border-2 transition-colors"
                            style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}
                        >
                            📧 Email orqali
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
