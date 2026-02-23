/**
 * EmailJS Service - Centralized email functionality
 * All EmailJS credentials are loaded from environment variables
 */

import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key from environment
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
}

/**
 * Send welcome email to new user
 * @param {string} toEmail - Recipient email
 * @param {string} userName - User's name
 * @returns {Promise<object>} EmailJS response
 */
export const sendWelcomeEmail = async (toEmail, userName) => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn('[EmailJS] Not configured. Skipping welcome email.');
        return { status: 'skipped', message: 'EmailJS not configured' };
    }

    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: toEmail,
            to_name: userName,
            message: 'Xush kelibsiz! WibeStore platformasiga xush kelibsiz.',
        });
        return response;
    } catch (error) {
        console.error('[EmailJS] Welcome email failed:', error);
        throw error;
    }
};

/**
 * Send password reset email
 * @param {string} toEmail - Recipient email
 * @param {string} userName - User's name
 * @param {string} resetLink - Password reset link
 * @returns {Promise<object>} EmailJS response
 */
export const sendPasswordResetEmail = async (toEmail, userName, resetLink) => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn('[EmailJS] Not configured. Skipping password reset email.');
        return { status: 'skipped', message: 'EmailJS not configured' };
    }

    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: toEmail,
            to_name: userName,
            reset_link: resetLink,
        });
        return response;
    } catch (error) {
        console.error('[EmailJS] Password reset email failed:', error);
        throw error;
    }
};

/**
 * Send contact/support email
 * @param {string} toEmail - Recipient email
 * @param {string} userName - User's name
 * @param {string} message - Message content
 * @returns {Promise<object>} EmailJS response
 */
export const sendContactEmail = async (toEmail, userName, message) => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn('[EmailJS] Not configured. Skipping contact email.');
        return { status: 'skipped', message: 'EmailJS not configured' };
    }

    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: toEmail,
            to_name: userName,
            message: message,
        });
        return response;
    } catch (error) {
        console.error('[EmailJS] Contact email failed:', error);
        throw error;
    }
};

/**
 * Check if EmailJS is configured
 * @returns {boolean} True if EmailJS is configured
 */
export const isEmailJSConfigured = () => {
    return !!(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
};

export default {
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendContactEmail,
    isEmailJSConfigured,
};
