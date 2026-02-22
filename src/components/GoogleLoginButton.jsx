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
                if (onError) onError(err?.message || 'Google login failed');
            }
        },
        onError: () => {
            if (onError) onError('Google orqali kirish xatolik berdi');
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
