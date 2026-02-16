import { Shield, AlertTriangle, CreditCard, Users, Lock, FileText, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
    return (
        <div className="min-h-screen w-full flex justify-center" style={{ paddingTop: '140px', paddingBottom: '64px' }}>
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-6">
                        <FileText className="w-4 h-4" />
                        Huquqiy hujjatlar
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                        Foydalanish shartlari
                    </h1>
                    <p className="text-gray-500">
                        Oxirgi yangilanish: 29 yanvar 2026
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-10">
                    {/* Introduction */}
                    <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <FileText className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-bold text-gray-800">1. Umumiy qoidalar</h2>
                        </div>
                        <div className="text-gray-600 space-y-5 leading-relaxed text-center">
                            <p>
                                WibeStore.com — bu o'yin akkauntlari va raqamli mahsulotlarni xavfsiz sotib olish va sotish platformasi. Saytdan foydalanish orqali siz quyidagi shartlarga rozilik bildirasiz.
                            </p>
                            <p>
                                Bizning maqsadimiz — xaridorlar va sotuvchilar o'rtasida xavfsiz, ishonchli va shaffof savdo muhitini yaratish.
                            </p>
                        </div>
                    </section>

                    {/* User Requirements */}
                    <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Users className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-bold text-gray-800">2. Foydalanuvchi talablari</h2>
                        </div>
                        <div className="text-gray-600 leading-relaxed">
                            <p className="text-center mb-5">Platformadan foydalanish uchun:</p>
                            <div className="flex justify-center">
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Kamida 16 yoshda bo'lishingiz kerak</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Haqiqiy va to'g'ri ma'lumotlar bilan ro'yxatdan o'tishingiz kerak</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Bitta shaxsga bitta hisob — ko'p hisoblar taqiqlanadi</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>O'zbekiston Respublikasi qonunlariga rioya qilishingiz kerak</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Commission */}
                    <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <CreditCard className="w-6 h-6 text-green-500" />
                            <h2 className="text-xl font-bold text-gray-800">3. Komissiya va to'lovlar</h2>
                        </div>
                        <div className="text-gray-600 space-y-5 leading-relaxed">
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="text-center py-3 text-gray-500 font-medium">Reja</th>
                                            <th className="text-center py-3 text-gray-500 font-medium">Komissiya</th>
                                            <th className="text-center py-3 text-gray-500 font-medium">Izoh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-slate-100">
                                            <td className="py-3 text-gray-700 text-center">Free</td>
                                            <td className="py-3 text-yellow-500 font-bold text-center">10%</td>
                                            <td className="py-3 text-gray-500 text-center">Har bir sotuvdan</td>
                                        </tr>
                                        <tr className="border-b border-slate-100">
                                            <td className="py-3 text-gray-700 text-center">Premium</td>
                                            <td className="py-3 text-yellow-500 font-bold text-center">10%</td>
                                            <td className="py-3 text-gray-500 text-center">+ Yuqori ko'rinish</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-700 text-center">Pro</td>
                                            <td className="py-3 text-green-500 font-bold text-center">0%</td>
                                            <td className="py-3 text-gray-500 text-center">Komissiyasiz</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                * Komissiya faqat muvaffaqiyatli sotuvlardan olinadi. Bekor qilingan yoki qaytarilgan sotuvlardan komissiya olinmaydi.
                            </p>
                        </div>
                    </section>

                    {/* Anti-Scam */}
                    <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 lg:p-10 border border-red-200">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                            <h2 className="text-xl font-bold text-gray-800">4. Firibgarlikka qarshi qoidalar</h2>
                        </div>
                        <div className="text-gray-600 leading-relaxed">
                            <p className="text-red-500 font-medium text-center mb-5">Quyidagi harakatlar qat'iyan taqiqlanadi:</p>
                            <div className="flex justify-center">
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span><strong>Soxta akkauntlar sotish</strong> — mavjud bo'lmagan yoki o'g'irlangan akkauntlarni sotish</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span><strong>Noto'g'ri ma'lumotlar</strong> — akkaunt haqida yolg'on ma'lumot berish</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span><strong>Platformadan tashqari savdo</strong> — to'lovlarni saytdan tashqarida amalga oshirish</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span><strong>Akkauntni qaytarib olish</strong> — sotilgan akkauntni qaytarib olish urinishi</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span><strong>Ko'p hisoblar</strong> — bir nechta hisoblar yaratish va ulardan foydalanish</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8 p-5 bg-red-50 rounded-xl border border-red-200 text-center">
                                <p className="text-red-500 font-semibold">⚠️ Ogohlantirish:</p>
                                <p className="text-gray-600 mt-3">
                                    Firibgarlik aniqlansa, foydalanuvchi hisobi darhol bloklanadi, barcha mablag'lar muzlatiladi va tegishli huquqiy choralar ko'riladi.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-green-500" />
                            <h2 className="text-xl font-bold text-gray-800">5. Xavfsizlik kafolati</h2>
                        </div>
                        <div className="text-gray-600 leading-relaxed">
                            <p className="text-center mb-5">WibeStore xaridorlar va sotuvchilarni himoya qilish uchun quyidagi choralarni ko'radi:</p>
                            <div className="flex justify-center">
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span><strong>Escrow tizimi</strong> — pul xaridor tasdiqlagunga qadar saytda saqlanadi</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span><strong>Akkaunt tekshiruvi</strong> — sotuvchilar akkauntlarni tasdiqlashdan o'tkazishi kerak</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span><strong>48 soatlik kafolat</strong> — xarid qilingan akkaunt 48 soat ichida tekshiriladi</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span><strong>To'liq qaytarish</strong> — muammo bo'lsa, pul to'liq qaytariladi</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Transaction Process */}
                    <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <CreditCard className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-bold text-gray-800">6. Savdo jarayoni</h2>
                        </div>
                        <div className="text-gray-600 leading-relaxed">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                    <h3 className="text-gray-800 font-semibold mb-4 text-center">Xaridor uchun:</h3>
                                    <div className="flex justify-center">
                                        <ol className="space-y-3 text-sm">
                                            <li>1. Akkauntni tanlang va to'lang</li>
                                            <li>2. Akkaunt ma'lumotlarini oling</li>
                                            <li>3. 48 soat ichida tekshiring</li>
                                            <li>4. Tasdiqlang yoki muammo bildiring</li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                    <h3 className="text-gray-800 font-semibold mb-4 text-center">Sotuvchi uchun:</h3>
                                    <div className="flex justify-center">
                                        <ol className="space-y-3 text-sm">
                                            <li>1. Akkauntni e'lon qiling</li>
                                            <li>2. Xaridor topilganda ma'lumot bering</li>
                                            <li>3. Xaridor tasdiqlaguncha kuting</li>
                                            <li>4. Pulni oling (1-3 ish kuni)</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Privacy */}
                    <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Lock className="w-6 h-6 text-yellow-500" />
                            <h2 className="text-xl font-bold text-gray-800">7. Maxfiylik siyosati</h2>
                        </div>
                        <div className="text-gray-600 leading-relaxed text-center">
                            <p className="mb-5">Biz quyidagi ma'lumotlarni yig'amiz va xavfsiz saqlaymiz:</p>
                            <div className="flex justify-center">
                                <ul className="space-y-3 text-left">
                                    <li>• Ism, email, telefon raqami</li>
                                    <li>• IP manzil va qurilma ma'lumotlari</li>
                                    <li>• To'lov tarixi va savdo ma'lumotlari</li>
                                </ul>
                            </div>
                            <p className="mt-5">
                                Sizning ma'lumotlaringiz uchinchi shaxslarga sotilmaydi yoki almashtirilmaydi. Faqat qonun talabiga binoan huquq-tartibot organlariga berilishi mumkin.
                            </p>
                        </div>
                    </section>

                    {/* Disputes */}
                    <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <MessageCircle className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-bold text-gray-800">8. Nizolarni hal qilish</h2>
                        </div>
                        <div className="text-gray-600 leading-relaxed">
                            <p className="text-center mb-5">Muammo yuz berganda:</p>
                            <div className="flex justify-center">
                                <ol className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ color: '#ffffff' }}>1</span>
                                        <span className="pt-0.5">Avval sotuvchi/xaridor bilan muloqot qiling</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ color: '#ffffff' }}>2</span>
                                        <span className="pt-0.5">Hal bo'lmasa, &quot;Shikoyat qilish&quot; tugmasini bosing</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ color: '#ffffff' }}>3</span>
                                        <span className="pt-0.5">Bizning moderatorlar 24 soat ichida tekshiradi</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ color: '#ffffff' }}>4</span>
                                        <span className="pt-0.5">Adolatli qaror qabul qilinadi</span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Changes */}
                    <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">9. Shartlarni o'zgartirish</h2>
                        <div className="text-gray-600 space-y-5 leading-relaxed">
                            <p>
                                WibeStore ushbu shartlarni istalgan vaqtda o'zgartirishga haqli. O'zgarishlar haqida email orqali xabar beriladi. O'zgarishlardan keyin saytdan foydalanishni davom ettirsangiz, yangi shartlarga rozilik bildirgan hisoblanasiz.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 lg:p-10 border border-blue-200 text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Aloqa</h2>
                        <div className="text-gray-600 space-y-5 leading-relaxed">
                            <p>Savollar yoki takliflar uchun biz bilan bog'laning:</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a href="mailto:support@wibestore.uz" className="px-5 py-3 bg-white rounded-xl text-blue-600 hover:bg-blue-50 transition-colors border border-blue-200 shadow-sm">
                                    📧 support@wibestore.uz
                                </a>
                                <a href="https://t.me/wibestoreuz" className="px-5 py-3 bg-white rounded-xl text-blue-600 hover:bg-blue-50 transition-colors border border-blue-200 shadow-sm">
                                    💬 Telegram: @wibestoreuz
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Accept */}
                    <div className="text-center py-10">
                        <p className="text-gray-500 mb-8">
                            WibeStore platformasidan foydalanish orqali siz yuqoridagi barcha shartlarga rozilik bildirasiz.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                            style={{ color: '#ffffff' }}
                        >
                            Bosh sahifaga qaytish
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
