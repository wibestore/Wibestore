/**
 * SkeletonLoader - Premium loading placeholder component
 * Uses design system tokens for consistent styling
 */

const Skeleton = ({ width, height, borderRadius = 'var(--radius-md)', style = {} }) => (
    <div
        className="skeleton"
        style={{
            width: width || '100%',
            height: height || '16px',
            borderRadius,
            ...style,
        }}
    />
);

const SkeletonCard = () => (
    <div
        style={{
            backgroundColor: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
        }}
    >
        {/* Image placeholder */}
        <Skeleton height="164px" borderRadius="0" />

        {/* Content */}
        <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Skeleton width="60%" height="14px" />
                <Skeleton width="24px" height="14px" borderRadius="var(--radius-full)" />
            </div>
            <Skeleton width="80%" height="18px" style={{ marginBottom: '8px' }} />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <Skeleton width="60px" height="20px" borderRadius="var(--radius-full)" />
                <Skeleton width="60px" height="20px" borderRadius="var(--radius-full)" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width="40%" height="20px" />
                <Skeleton width="80px" height="32px" borderRadius="var(--radius-md)" />
            </div>
        </div>
    </div>
);

const SkeletonRow = () => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            borderBottom: '1px solid var(--color-border-muted)',
        }}
    >
        <Skeleton width="40px" height="40px" borderRadius="var(--radius-full)" />
        <div style={{ flex: 1 }}>
            <Skeleton width="60%" height="14px" style={{ marginBottom: '6px' }} />
            <Skeleton width="40%" height="12px" />
        </div>
        <Skeleton width="80px" height="24px" borderRadius="var(--radius-full)" />
    </div>
);

const SkeletonText = ({ lines = 3, width = '100%' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width }}>
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                width={i === lines - 1 ? '70%' : '100%'}
                height="14px"
            />
        ))}
    </div>
);

const SkeletonGrid = ({ count = 8 }) => (
    <div className="grid-auto-fill-280">
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
        ))}
    </div>
);

export { Skeleton, SkeletonCard, SkeletonRow, SkeletonText, SkeletonGrid };
export default Skeleton;
