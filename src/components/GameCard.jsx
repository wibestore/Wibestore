import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <Link
            to={`/game/${game.id}`}
            className="group block card-hover-lift"
            style={{
                backgroundColor: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                textDecoration: 'none',
            }}
        >
            {/* Image */}
            <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                    height: '120px',
                    backgroundColor: 'var(--color-bg-tertiary)',
                }}
            >
                {game.image && !game.image.includes('placeholder') ? (
                    <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <span className="text-4xl opacity-40">{game.icon}</span>
                )}

                {/* Account count badge */}
                {game.accountCount > 0 && (
                    <div
                        className="absolute rounded-full"
                        style={{
                            bottom: '8px',
                            right: '8px',
                            padding: '2px 8px',
                            backgroundColor: 'var(--color-accent-blue)',
                            color: '#ffffff',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                        }}
                    >
                        {game.accountCount}
                    </div>
                )}
            </div>

            {/* Content */}
            <div
                className="flex items-center gap-3"
                style={{ padding: 'var(--space-3) var(--space-4)' }}
            >
                <span className="text-lg flex-shrink-0">{game.icon}</span>
                <div className="min-w-0">
                    <h3
                        className="font-semibold truncate"
                        style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-primary)',
                            lineHeight: 'var(--line-height-base)',
                        }}
                    >
                        {game.name}
                    </h3>
                    {game.accountCount > 0 && (
                        <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)',
                        }}>
                            {game.accountCount} accounts
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default GameCard;
