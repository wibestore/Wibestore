import emailjs from '@emailjs/browser';

// EmailJS credentials from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Login email yuborish
export const sendLoginEmail = (user) => {
    const loginTime = new Date().toLocaleString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tashkent'
    });

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        user_name: user.name || 'Foydalanuvchi',
        user_email: user.email,
        login_time: loginTime
    }, EMAILJS_PUBLIC_KEY)
        .then(() => console.log('Login email yuborildi!'))
        .catch((err) => console.error('Email xatosi:', err));
};

// Xush kelibsiz email yuborish
export const sendWelcomeEmail = (user) => {
    const registerTime = new Date().toLocaleString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tashkent'
    });

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        user_name: user.name,
        user_email: user.email,
        login_time: registerTime + " (Ro'yxatdan o'tish)"
    }, EMAILJS_PUBLIC_KEY)
        .then(() => console.log('Welcome email yuborildi!'))
        .catch((err) => console.error('Email xatosi:', err));
};
