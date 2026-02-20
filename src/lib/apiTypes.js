/**
 * API Types для WibeStore
 * JSDoc типы для JavaScript проекта (вместо TypeScript)
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} full_name
 * @property {string|null} avatar
 * @property {number} rating
 * @property {number} total_sales
 * @property {number} total_purchases
 * @property {string} balance
 * @property {boolean} is_staff
 * @property {boolean} is_premium
 */

/**
 * @typedef {Object} Tokens
 * @property {string} access
 * @property {string} refresh
 */

/**
 * @typedef {Object} Game
 * @property {string} slug
 * @property {string} name
 * @property {string} description
 * @property {string|null} icon
 * @property {string|null} banner
 * @property {number} listings_count
 */

/**
 * @typedef {Object} Listing
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} price
 * @property {string|null} original_price
 * @property {string} status
 * @property {boolean} is_premium
 * @property {number} views_count
 * @property {number} favorites_count
 * @property {Game} game
 * @property {User} seller
 * @property {ListingImage[]} images
 * @property {string} created_at
 */

/**
 * @typedef {Object} ListingImage
 * @property {number} id
 * @property {string} image
 * @property {boolean} is_primary
 * @property {number} sort_order
 */

/**
 * @typedef {Object} Review
 * @property {number} id
 * @property {number} rating
 * @property {string} comment
 * @property {User} author
 * @property {Listing|null} listing
 * @property {string} created_at
 */

/**
 * @typedef {Object} Chat
 * @property {number} id
 * @property {User[]} participants
 * @property {Message|null} last_message
 * @property {number} unread_count
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Message
 * @property {number} id
 * @property {number} chat_id
 * @property {User} sender
 * @property {string} text
 * @property {boolean} is_read
 * @property {string} created_at
 */

/**
 * @typedef {Object} Notification
 * @property {number} id
 * @property {string} type
 * @property {string} title
 * @property {string} message
 * @property {boolean} is_read
 * @property {string} created_at
 */

/**
 * @typedef {Object} Transaction
 * @property {number} id
 * @property {string} type
 * @property {string} amount
 * @property {string} status
 * @property {string} payment_method
 * @property {string} created_at
 */

/**
 * @typedef {Object} Subscription
 * @property {string} plan
 * @property {string} status
 * @property {string|null} expires_at
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {any[]} results
 * @property {number} count
 * @property {string|null} next
 * @property {string|null} previous
 */

/**
 * @typedef {Object} ApiError
 * @property {string} message
 * @property {number} status
 * @property {any} details
 */

/**
 * @typedef {Object} ValidationError
 * @property {string} field
 * @property {string[]} errors
 */

// API Response типы
export const ApiTypes = {
  User: /** @type {User} */ ({}),
  Tokens: /** @type {Tokens} */ ({}),
  Game: /** @type {Game} */ ({}),
  Listing: /** @type {Listing} */ ({}),
  Review: /** @type {Review} */ ({}),
  Chat: /** @type {Chat} */ ({}),
  Message: /** @type {Message} */ ({}),
  Notification: /** @type {Notification} */ ({}),
  Transaction: /** @type {Transaction} */ ({}),
  Subscription: /** @type {Subscription} */ ({}),
};

export default ApiTypes;
