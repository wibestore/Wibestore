import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <Link
            to={`/game/${game.id}`}
            className="group relative bg-gradient-to-b from-[#1e1e32] to-[#25253a] border border-white/5 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 overflow-hidden"
        >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Game Icon */}
            <div className="w-20 h-20 mx-auto mb-4 bg-[#25253a] rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden">
                {game.image ? (
                    <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                ) : (
                    <span>{game.icon}</span>
                )}
            </div>

            {/* Game Name */}
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {game.name}
            </h3>

            {/* Account Count */}
            <p className="text-sm text-gray-500">
                <span className="text-cyan-400 font-semibold">{game.accountCount}+</span> akkauntlar
            </p>

            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Link>
    );
};

export default GameCard;
