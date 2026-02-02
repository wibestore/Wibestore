import { Shield, AlertTriangle, CreditCard, Users, Lock, FileText, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium mb-6">
                        <FileText className="w-4 h-4" />
                        Huquqiy hujjatlar
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        Foydalanish shartlari
                    </h1>
                    <p className="text-gray-400">
                        Oxirgi yangilanish: 29 yanvar 2026
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {/* Introduction */}
                    <section className="bg-[#1e1e32] rounded-2xl p-6 lg:p-8 border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <FileText className="w-6 h-6 text-purple-400" />
                            1. Umumiy qoidalar
                        </h2>
                        <div className="text-gray-300 space-y-4">
                            <p>
                                WibeStore.com — bu o'yin akkauntlari va raqamli mahsulotlarni xavfsiz sotib olish va sotish platformasi. Saytdan foydalanish orqali siz quyidagi shartlarga rozilik bildirasiz.
                            </p>
                            <p>
                                Bizning maqsadimiz — xaridorlar va sotuvchilar o'rtasida xavfsiz, ishonchli va shaffof savdo muhitini yaratish.
                            </p>
                        </div>
                    </section>

                    {/* User Requirements */}
                    <section className="bg-[#1e1e32] rounded-2xl p-6 lg:p-8 border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <Users className="w-6 h-6 text-cyan-400" />
                            2. Foydalanuvchi talablari
                        </h2>
                        <div className="text-gray-300 space-y-4">
                            <p>Platformadan foydalanish uchun:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>Kamida 16 yoshda bo'lishingiz kerak</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>Haqiqiy va to'g'ri ma'lumotlar bilan ro'yxatdan o'tishingiz kerak</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>Bitta shaxsga bitta hisob — ko'p hisoblar taqiqlanadi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>O'zbekiston Respublikasi qonunlariga rioya qilishingiz kerak</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Commission */}
                    <section className="bg-[#1e1e32] rounded-2xl p-6 lg:p-8 border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <CreditCard className="w-6 h-6 text-green-400" />
                            3. Komissiya va to'lovlar
                        </h2>
                        <div className="text-gray-300 space-y-4">
                            <div className="bg-[#25253a] rounded-xl p-4">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-3 text-gray-400 font-medium">Reja</th>
                                            <th className="text-left py-3 text-gray-400 font-medium">Komissiya</th>
                                            <th className="text-left py-3 text-gray-400 font-medium">Izoh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/5">
                                            <td className="py-3 text-white">Free</td>
                                            <td className="py-3 text-yellow-400 font-bold">10%</td>
                                            <td className="py-3 text-gray-400">Har bir sotuvdan</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-3 text-white">Premium</td>
                                            <td className="py-3 text-yellow-400 font-bold">10%</td>
                                            <td className="py-3 text-gray-400">+ Yuqori ko'rinish</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-white">Pro</td>
                                            <td className="py-3 text-green-400 font-bold">0%</td>
                                            <td className="py-3 text-gray-400">Komissiyasiz</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-gray-400">
                                * Komissiya faqat muvaffaqiyatli sotuvlardan olinadi. Bekor qilingan yoki qaytarilgan sotuvlardan komissiya olinmaydi.
                            </p>
                        </div>
                    </section>

                    {/* Anti-Scam */}
                    <section className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-6 lg:p-8 border border-red-500/20">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                            4. Firibgarlikka qarshi qoidalar
                        </h2>
                        <div className="text-gray-300 space-y-4">
                            <p className="text-red-300 font-medium">Quyidagi harakatlar qat'iyan taqiqlanadi:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Soxta akkauntlar sotish</strong> — mavjud bo'lmagan yoki o'g'irlangan akkauntlarni sotish</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Noto'g'ri ma'lumotlar</strong> — akkaunt haqida yolg'on ma'lumot berish</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Platformadan tashqari savdo</strong> — to'lovlarni saytdan tashqarida amalga oshirish</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Akkauntni qaytarib olish</strong> — sotilgan akkauntni qaytarib olish urinishi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Ko'p hisoblar</strong> — bir nechta hisoblar yaratish va ulardan foydalanish</span>
                                </li>
                            </ul>
                            <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                                <p className="text-red-300 font-semibold">⚠️ Ogohlantirish:</p>
                                <p className="text-gray-300 mt-2">
                                    Firibgarlik aniqlansa, foydalanuvchi hisobi darhol bloklanadi, barcha mablag'lar muzlatiladi va tegishli huquqiy choralar ko'riladi.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section className="bg-[#1e1e32] rounded-2xl p-6 lg:p-8 border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-green-400" />
                            5. Xavfsizlik kafolati
                        </h2>
                        <div className="text-gray-300 space-y-4">
                            <p>WibeStore xaridorlar va sotuvchilarni himoya qilish uchun quyidagi choralarni ko'radi:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Escrow tizimi</strong> — pul xaridor tasdiqlagunga qadar saytda saqlanadi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Akkaunt tekshiruvi</strong> — sotuvchilar akkauntlarni tasdiqlashdan o'tkazishi kerak</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>48 soatlik kafolat</strong> — xarid qilingan akkaunt 48 soat ichida tekshiriladi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>To'liq qaytarish</strong> — muammo bo'lsa, pul to'liq qaytariladi</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Transaction Process */}
                    <section className="bg-[#1e1e32] rounded-2xl p-6 lg:p-8 border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <CreditCard className="w-6 h-6 text-purple-400" />
                            6. Savdo jarayoni
                        </h2>
                        <div className="text-gray-300 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#25253a] rounded-xl p-4">
                                    <h3 className="text-white font-semibold mb-3">Xaridor uchun:</h3>
                                    <ol className="space-y-2 text-sm">
                                        <li>1. Akkauntni tanlang va to'lang</li>
                                        <li>2. Akkaunt ma'lumotlarini oling</li>
                                        <li>3. 48 soat ichida tekshiring</li>
                                        <li>4. Tasdiqlang yoki muammo bildiring</li>
                                    </ol>
                                </div>
                                <div className="bg-[#25253a] rounded-xl p-4">
                                    <h3 className="text-white font-semibold mb-3">Sotuvchi uchun:</h3>
                                    <ol className="space-y-2 text-sm">
                                        <li>1. Akkauntni e'lon qiling</li>
                                        <li>2. Xaridor topilganda ma'lumot bering</li>
                                        <li>3. Xaridor tasdiqlaguncha kuting</li>
                                        <li>4. Pulni oling (1-3 ish kuni)</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Privacy */}
                    <section className="bg-[#1e1e32] rounded-2xl p-6 lg:p-8 border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <Lock className="w-6 h-6 text-yellow-400" />
                            7. Maxfiylik siyosati
                        </h2>
                        <div className="text-gray-300 space-y-4">
                            <p>Biz quyidagi ma'lumotlarni yig'amiz va xavfsiz saqlaymiz:</p>
                            <ul className="space-y-2">
                                <li>• Ism, email, telefon raqami</li>
                                <li>• IP manzil va qurilma ma'lumotlari</li>
                                <li>• To'lov tarixi va savdo ma'lumotlari</li>
                            </ul>
                            <p className="mt-4">
                                Sizning ma'lumotlaringiz uchinchi shaxslarga sotilmaydi yoki almashtirilmaydi. Faqat qonun talabiga binoan huquq-tartibot organlariga berilishi mumkin.
                            </p>
                        </div>
                    </section>

                    {/* Disputes */}
                    <section className="bg-[#1e1e32] rounded-2xl p-6 lg:p-8 border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <MessageCircle className="w-6 h-6 text-cyan-400" />
                            8. Nizolarni hal qilish
                        </h2>
                        <div className="text-gray-300 space-y-4">
                            <p>Muammo yuz berganda:</p>
                            <ol className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                                    <span>Avval sotuvchi/xaridor bilan muloqot qiling</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                                    <span>Hal bo'lmasa, "Shikoyat qilish" tugmasini bosing</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                                    <span>Bizning moderatorlar 24 soat ichida tekshiradi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</span>
                                    <span>Adolatli qaror qabul qilinadi</span>
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* Changes */}
                    <section className="bg-[#1e1e32] rounded-2xl p-6 lg:p-8 border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4">9. Shartlarni o'zgartirish</h2>
                        <div className="text-gray-300 space-y-4">
                            <p>
                                WibeStore ushbu shartlarni istalgan vaqtda o'zgartirishga haqli. O'zgarishlar haqida email orqali xabar beriladi. O'zgarishlardan keyin saytdan foydalanishni davom ettirsangiz, yangi shartlarga rozilik bildirgan hisoblanasiz.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 lg:p-8 border border-purple-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">Aloqa</h2>
                        <div className="text-gray-300 space-y-4">
                            <p>Savollar yoki takliflar uchun biz bilan bog'laning:</p>
                            <div className="flex flex-wrap gap-4">
                                <a href="mailto:support@wibestore.uz" className="px-4 py-2 bg-[#25253a] rounded-xl text-purple-400 hover:bg-purple-500/20 transition-colors">
                                    📧 support@wibestore.uz
                                </a>
                                <a href="https://t.me/wibestore" className="px-4 py-2 bg-[#25253a] rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                                    💬 Telegram: @wibestore
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Accept */}
                    <div className="text-center py-8">
                        <p className="text-gray-400 mb-6">
                            WibeStore platformasidan foydalanish orqali siz yuqoridagi barcha shartlarga rozilik bildirasiz.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
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
