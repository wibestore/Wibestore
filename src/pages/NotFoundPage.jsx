import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Gamepad2 } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center page-enter">
            <div className="max-w-2xl mx-auto px-4 text-center">
                {/* 404 Animation */}
                <div className="relative mb-8">
                    <div className="text-[150px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 leading-none select-none animate-pulse">
                        404
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-blue-400/20 rounded-full blur-2xl animate-pulse" />
                    </div>
                </div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-2xl flex items-center justify-center border border-slate-200">
                    <Gamepad2 className="w-10 h-10 text-purple-400" />
                </div>

                {/* Text */}
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    Sahifa topilmadi
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    Kechirasiz, siz izlayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    >
                        <Home className="w-5 h-5" />
                        Bosh sahifa
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-gray-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-200 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Orqaga qaytish
                    </button>
                </div>

                {/* Search suggestion */}
                <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <Search className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-400">Quyidagi sahifalarni ko'rishingiz mumkin:</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Link to="/products" className="px-4 py-2 bg-slate-100 text-gray-600 rounded-lg hover:bg-slate-200 transition-colors">
                            Mahsulotlar
                        </Link>
                        <Link to="/premium" className="px-4 py-2 bg-slate-100 text-gray-600 rounded-lg hover:bg-slate-200 transition-colors">
                            Premium
                        </Link>
                        <Link to="/top" className="px-4 py-2 bg-slate-100 text-gray-600 rounded-lg hover:bg-slate-200 transition-colors">
                            Top akkauntlar
                        </Link>
                        <Link to="/faq" className="px-4 py-2 bg-slate-100 text-gray-600 rounded-lg hover:bg-slate-200 transition-colors">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
