// WibeStore - Mock Data
// All prices in UZS (Uzbek Sum)

export const games = [
    {
        id: 'pubg-mobile',
        name: 'PUBG Mobile',
        icon: 'рџЋЇ',
        image: '/img/icons/Pubg-icon.webp',
        accountCount: 547,
        color: '#F7B32B'
    },
    {
        id: 'steam',
        name: 'Steam Account',
        icon: 'рџЋ®',
        image: '/img/icons/steam.png',
        accountCount: 1203,
        color: '#1B2838'
    },
    {
        id: 'free-fire',
        name: 'Free Fire',
        icon: 'рџ”Ґ',
        image: '/img/icons/free.webp',  
        accountCount: 389,
        color: '#FF5722'
    },
    {
        id: 'standoff2',
        name: 'Standoff 2',
        icon: 'рџ”«',
        image: '/img/icons/st.webp',
        accountCount: 256,
        color: '#E91E63'
    },
    {
        id: 'mobile-legends',
        name: 'Mobile Legends',
        icon: 'вљ”пёЏ',
        image: '/img/icons/ml.webp',
        accountCount: 478,
        color: '#00BCD4'
    },
    {
        id: 'clash-of-clans',
        name: 'Clash of Clans',
        icon: 'рџЏ°',
        image: '/img/icons/cc.webp',
        accountCount: 312,
        color: '#8BC34A'
    },
    {
        id: 'codm',
        name: 'Call of Duty Mobile',
        icon: 'рџЋ–пёЏ',
        image: '/img/icons/cal.webp',
        accountCount: 289,
        color: '#4CAF50'
    },
    {
        id: 'roblox',
        name: 'Roblox',
        icon: 'рџ§±',
        image: '/img/icons/roblox.webp',
        accountCount: 634,
        color: '#E2231A'
    }
];

export const accounts = [
    {
        id: 1,
        gameId: 'pubg-mobile',
        gameName: 'PUBG Mobile',
        title: 'Conqueror Account - Season 25',
        description: 'Level 75, 200+ skins, M416 Glacier, AWM Dragon, Kar98 Dragon',
        price: 2500000,
        image: '/img/FireFree/fire.jpg',
        seller: {
            id: 1,
            name: 'ProGamer_UZ',
            rating: 4.9,
            sales: 156,
            isPremium: true
        },
        isPremium: true,
        status: 'active',
        createdAt: '2024-01-28'
    },
    {
        id: 2,
        gameId: 'steam',
        gameName: 'Steam Account',
        title: 'Steam Account - 150+ Games',
        description: 'GTA V, CS2, Rust, PUBG, Dota 2, FIFA 24 va boshqalar',
        price: 3800000,
        image: '/img/Steam/st.jpg',
        seller: {
            id: 2,
            name: 'GameStore_TJ',
            rating: 4.7,
            sales: 89,
            isPremium: true
        },
        isPremium: true,
        status: 'active',
        createdAt: '2024-01-27'
    },
    {
        id: 3,
        gameId: 'free-fire',
        gameName: 'Free Fire',
        title: 'Heroic Account - 50+ Characters',
        description: 'Chrono, Alok, K, Skyler. 100+ skins, Elite Pass Season 1-50',
        price: 1200000,
        image: '/img/Pubg/pg.jpg',
        seller: {
            id: 3,
            name: 'FFKing_UZ',
            rating: 4.8,
            sales: 234,
            isPremium: false
        },
        isPremium: false,
        status: 'active',
        createdAt: '2024-01-28'
    },
    {
        id: 4,
        gameId: 'standoff2',
        name: 'Standoff 2',
        title: 'Elite Account - Rare Knives',
        description: 'Karambit Fade, M4A4 Howl, AK-47 Fire Serpent',
        price: 1800000,
        image: '/img/Pubg/pg.jpg',
        seller: {
            id: 4,
            name: 'SO2Master',
            rating: 4.6,
            sales: 78,
            isPremium: true
        },
        isPremium: true,
        status: 'active',
        createdAt: '2024-01-26'
    },
    {
        id: 5,
        gameId: 'mobile-legends',
        gameName: 'Mobile Legends',
        title: 'Mythic Glory - All Heroes',
        description: '115+ heroes, 200+ skins, Legendary skins, Collector skins',
        price: 2100000,
        image: '/img/FireFree/fire.jpg',
        seller: {
            id: 5,
            name: 'MLBB_Pro',
            rating: 4.9,
            sales: 167,
            isPremium: true
        },
        isPremium: true,
        status: 'active',
        createdAt: '2024-01-28'
    },
    {
        id: 6,
        gameId: 'clash-of-clans',
        gameName: 'Clash of Clans',
        title: 'TH14 Max Account',
        description: 'Fully maxed TH14, 6 builders, all heroes 80+',
        price: 4500000,
        image: '/img/Pubg/pg.jpg',
        seller: {
            id: 6,
            name: 'ClashKing',
            rating: 4.8,
            sales: 45,
            isPremium: false
        },
        isPremium: false,
        status: 'active',
        createdAt: '2024-01-25'
    },
    {
        id: 7,
        gameId: 'codm',
        gameName: 'Call of Duty Mobile',
        title: 'Legendary Account - All Guns',
        description: 'Legendary rank, 50+ legendary skins, Damascus camo',
        price: 1900000,
        image: '/img/Pubg/pg.jpg',
        seller: {
            id: 1,
            name: 'ProGamer_UZ',
            rating: 4.9,
            sales: 156,
            isPremium: true
        },
        isPremium: true,
        status: 'active',
        createdAt: '2024-01-28'
    },
    {
        id: 8,
        gameId: 'roblox',
        gameName: 'Roblox',
        title: 'Rich Account - 10K Robux',
        description: '10,000 Robux, Premium membership, rare limiteds',
        price: 850000,
        image: '/img/FireFree/fire.jpg',
        seller: {
            id: 7,
            name: 'RobloxMaster',
            rating: 4.5,
            sales: 312,
            isPremium: false
        },
        isPremium: false,
        status: 'active',
        createdAt: '2024-01-27'
    },
    {
        id: 9,
        gameId: 'pubg-mobile',
        gameName: 'PUBG Mobile',
        title: 'ACE Account - 150 Skins',
        description: 'Level 68, 150 skins, multiple mythics, maxed RP',
        price: 1500000,
        image: '/img/FireFree/fire.jpg',
        seller: {
            id: 8,
            name: 'PUBGTrader',
            rating: 4.7,
            sales: 98,
            isPremium: false
        },
        isPremium: false,
        status: 'active',
        createdAt: '2024-01-26'
    },
    {
        id: 10,
        gameId: 'steam',
        gameName: 'Steam Account',
        title: 'CS2 Account - Global Elite',
        description: 'Global Elite, 15k hours, Knife Karambit Doppler',
        price: 2800000,
        image: '/accounts/steam2.jpg',
        seller: {
            id: 2,
            name: 'GameStore_TJ',
            rating: 4.7,
            sales: 89,
            isPremium: true
        },
        isPremium: true,
        status: 'active',
        createdAt: '2024-01-28'
    }
];

export const premiumPlans = [
    {
        id: 'premium',
        name: 'Premium',
        price: 99000, // UZS per month
        icon: 'в­ђ',
        features: [
            "Tavsiyalarda 3x ko'proq chiqish",
            'Premium badge',
            "Bosh sahifada ko'rinish",
            "Qidiruvda yuqori pozitsiya",
            'Maxsus support'
        ],
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 249000, // UZS per month
        icon: 'рџ’Ћ',
        features: [
            'Barcha Premium afzalliklari',
            'VIP golden badge',
            'Eng yuqori pozitsiya',
            "0% komissiya (standart 10%)",
            'Tezkor to\'lov (24 soat)',
            'Shaxsiy manager'
        ],
        color: 'from-yellow-400 to-orange-500',
        popular: true
    }
];

export const paymentMethods = [
    {
        id: 'payme',
        name: 'Payme',
        icon: 'рџ’і',
        logo: '/payments/payme.png'
    },
    {
        id: 'click',
        name: 'Click',
        icon: 'рџ“±',
        logo: '/payments/click.png'
    },
    {
        id: 'paynet',
        name: 'Paynet',
        icon: 'рџЏ¦',
        logo: '/payments/paynet.png'
    }
];

// Commission rate - 10% for all sellers
export const COMMISSION_RATE = 0.10;

// Format price in UZS
export const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ', {
        style: 'decimal',
        minimumFractionDigits: 0
    }).format(price) + " so'm";
};

// Calculate commission
export const calculateCommission = (price) => {
    return price * COMMISSION_RATE;
};

// Calculate seller earnings
export const calculateSellerEarnings = (price) => {
    return price - calculateCommission(price);
};
