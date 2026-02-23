import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

/**
 * Google orqali kirish tugmasi.
 * Faqat VITE_GOOGLE_CLIENT_ID o'rnatilganda render qilinadi (useGoogleAuthEnabled),
 * shunda useGoogleLogin faqat GoogleOAuthProvider ichida chaqiriladi.
 */
export function GoogleLoginButton({ onSuccess, onError, from, children, className, style }) {
    const { loginWithGoogle } = useAuth();
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                await loginWithGoogle(tokenResponse.access_token);
                if (onSuccess) onSuccess();
            } catch (err) {
                const msg = err?.message || "Google orqali kirish amalga oshmadi.";
                if (onError) onError(msg);
            }
        },
        onError: (err) => {
            const msg = err?.message || '';
            const isInvalidClient = msg.includes('invalid client') || msg.includes('401') || msg.includes('OAuth client was not found');
            if (onError) {
                onError(isInvalidClient
                    ? "Google kirish hozircha sozlanmagan. Iltimos email va parol bilan kiring yoki sayt administratoriga murojaat qiling."
                    : (msg || "Google orqali kirish xatolik berdi"));
            }
        },
    });

    return (
        <button
            type="button"
            onClick={() => googleLogin()}
            className={className}
            style={style}
        >
            {children}
        </button>
    );
}

export default GoogleLoginButton;
