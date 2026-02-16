import { Client, Account } from 'appwrite';

// Appwrite configuration from environment variables
const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);

// Google OAuth login
export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(
            'google',
            window.location.origin + '/', // Success redirect
            window.location.origin + '/login' // Failure redirect
        );
    } catch (err) {
        console.error('Google OAuth error:', err);
        throw err;
    }
};

// Get current session
export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch {
        return null;
    }
};

// Logout
export const logoutAppwrite = async () => {
    try {
        await account.deleteSession('current');
    } catch (err) {
        console.error('Logout error:', err);
    }
};

export default client;
