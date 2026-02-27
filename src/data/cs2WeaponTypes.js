/**
 * CS2 / Steam bozorida ishlatiladigan qurol turlari (skinlar uchun).
 * Slug: API va filtrlarda ishlatiladi.
 */

export const CS2_WEAPON_TYPES = [
    { id: 'rifle', nameUz: "Avtomat", nameEn: "Rifle", nameRu: "Винтовка" },
    { id: 'pistol', nameUz: "Pistolet", nameEn: "Pistol", nameRu: "Пистолет" },
    { id: 'smg', nameUz: "Pistolet-pulemyot", nameEn: "SMG", nameRu: "ПП" },
    { id: 'heavy', nameUz: "Og'ir qurol", nameEn: "Heavy", nameRu: "Тяжёлое" },
    { id: 'knife', nameUz: "Pichoq", nameEn: "Knife", nameRu: "Нож" },
    { id: 'gloves', nameUz: "Qo'lqoplar", nameEn: "Gloves", nameRu: "Перчатки" },
    { id: 'agent', nameUz: "Agent", nameEn: "Agent", nameRu: "Агент" },
];

/** CS2 hisoblangan o'yin slug'lari */
export const CS2_GAME_SLUGS = ['counter-strike-2', 'counter-strike-go', 'cs2', 'csgo'];

export function isCs2Game(gameId) {
    if (!gameId) return false;
    const slug = String(gameId).toLowerCase();
    return CS2_GAME_SLUGS.some(s => slug === s || slug.includes('counter-strike') || slug.includes('cs2') || slug.includes('csgo'));
}

export function getWeaponName(weaponId, lang = 'uz') {
    const w = CS2_WEAPON_TYPES.find(x => x.id === weaponId);
    if (!w) return weaponId || '';
    if (lang === 'ru') return w.nameRu;
    if (lang === 'en') return w.nameEn;
    return w.nameUz;
}
