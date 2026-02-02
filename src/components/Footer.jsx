import { Link } from 'react-router-dom';
import { Gamepad2, Mail, Phone, MapPin, Send, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        marketplace: [
            { label: 'Barcha o\'yinlar', to: '/products' },
            { label: 'Top akkauntlar', to: '/top' },
            { label: 'Premium sotuvchilar', to: '/premium' },
            { label: 'Yangi akkauntlar', to: '/' },
        ],
        support: [
            { label: 'Yordam markazi', to: '/help' },
            { label: 'Xavfsizlik', to: '/security' },
            { label: 'Shikoyat qilish', to: '/report' },
            { label: 'FAQ', to: '/faq' },
        ],
        legal: [
            { label: 'Foydalanish shartlari', to: '/terms' },
            { label: 'Maxfiylik siyosati', to: '/privacy' },
            { label: 'Qaytarish siyosati', to: '/refund' },
        ],
    };

    return (
        <footer className="bb bg-[#1a1a2e] border-t border-white/5 mt-15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                wibestore.uz
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 max-w-sm">
                            O'zbekistondagi eng ishonchli o'yin akkauntlari va raqamli mahsulotlar marketplace'i.
                            Xavfsiz savdo, tez yetkazib berish.
                        </p>
                        <div className="space-y-2">
                            <a href="mailto:support@wibestore.uz" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                                <Mail className="w-4 h-4" />
                                support@wibestore.uz
                            </a>
                            <a href="tel:+998901234567" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                                <Phone className="w-4 h-4" />
                                +998 90 123 45 67
                            </a>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <MapPin className="w-4 h-4" />
                                Toshkent, O'zbekiston
                            </div>
                        </div>
                    </div>

                    {/* Marketplace Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Marketplace</h3>
                        <ul className="space-y-2">
                            {footerLinks.marketplace.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Yordam</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Huquqiy</h3>
                        <ul className="space-y-2 mb-6">
                            {footerLinks.legal.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} WibeStore. Barcha huquqlar himoyalangan.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://t.me/wibestore"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-[#25253a] hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                        >
                            <Send className="w-5 h-5" />
                        </a>
                        <a
                            href="https://instagram.com/wibestore"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-[#25253a] hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="https://facebook.com/wibestore"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-[#25253a] hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Payment Methods */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm mr-2">To'lov usullari:</span>
                        <div className="flex items-center gap-2">
                            <div className="px-3 py-1.5 bg-[#25253a] rounded-lg text-xs font-medium text-gray-300">
                                Payme
                            </div>
                            <div className="px-3 py-1.5 bg-[#25253a] rounded-lg text-xs font-medium text-gray-300">
                                Click
                            </div>
                            <div className="px-3 py-1.5 bg-[#25253a] rounded-lg text-xs font-medium text-gray-300">
                                Paynet
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
