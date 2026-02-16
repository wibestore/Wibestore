import { Link } from 'react-router-dom';
import { Gamepad2, Mail, Phone, MapPin, Send, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    const footerLinks = {
        marketplace: [
            { label: t('footer.all_products'), to: '/products' },
            { label: t('footer.top_accounts'), to: '/top' },
            { label: t('footer.premium_sub'), to: '/premium' },
        ],
        support: [
            { label: t('footer.faq'), to: '/faq' },
            { label: t('footer.terms'), to: '/terms' },
            { label: t('footer.privacy'), to: '/terms' },
        ],
    };

    return (
        <footer className="bb bg-white border-t border-blue-100 mt-15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6" style={{ color: '#ffffff' }} />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                wibestore.uz
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm mb-6 max-w-sm">
                            {t('footer.description')}
                        </p>
                        <div className="space-y-2">
                            <a href="mailto:support@wibestore.uz" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm transition-colors">
                                <Mail className="w-4 h-4" />
                                support@wibestore.uz
                            </a>
                            <a href="tel:+998901234567" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm transition-colors">
                                <Phone className="w-4 h-4" />
                                +998 90 123 45 67
                            </a>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <MapPin className="w-4 h-4" />
                                Toshkent, O'zbekiston
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-gray-800 font-semibold mb-4">{t('footer.quick_links')}</h3>
                        <ul className="space-y-2">
                            {footerLinks.marketplace.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.to} className="text-gray-500 hover:text-blue-500 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-gray-800 font-semibold mb-4">{t('footer.support')}</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.to} className="text-gray-500 hover:text-blue-500 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} WibeStore. {t('footer.rights')}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://t.me/wibestoreuz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-blue-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                        >
                            <Send className="w-5 h-5" />
                        </a>
                        <a
                            href="https://instagram.com/wibestoreuz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-blue-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="https://facebook.com/wibestoreuz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-blue-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Payment Methods */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <div className="px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-medium text-gray-600">
                                Payme
                            </div>
                            <div className="px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-medium text-gray-600">
                                Click
                            </div>
                            <div className="px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-medium text-gray-600">
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
