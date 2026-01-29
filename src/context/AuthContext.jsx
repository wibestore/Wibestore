import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock users database
const MOCK_USERS = [
    {
        id: 1,
        name: 'Aziz Karimov',
        email: 'aziz@email.com',
        phone: '+998901234567',
        password: '123456',
        avatar: null,
        rating: 4.8,
        sales: 45,
        purchases: 12,
        createdAt: '2024-01-01'
    },
    {
        id: 2,
        name: 'Jasur Rahimov',
        email: 'jasur@email.com',
        phone: '+998909876543',
        password: '123456',
        avatar: null,
        rating: 4.9,
        sales: 156,
        purchases: 5,
        createdAt: '2023-06-15'
    }
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('wibeUser');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('wibeUser');
            }
        }
        setIsLoading(false);
    }, []);

    // Login function
    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Check mock users
                const foundUser = MOCK_USERS.find(
                    u => u.email === email && u.password === password
                );

                if (foundUser) {
                    const userData = { ...foundUser };
                    delete userData.password;
                    setUser(userData);
                    localStorage.setItem('wibeUser', JSON.stringify(userData));
                    resolve(userData);
                } else {
                    // Check localStorage for registered users
                    const registeredUsers = JSON.parse(localStorage.getItem('wibeRegisteredUsers') || '[]');
                    const regUser = registeredUsers.find(
                        u => u.email === email && u.password === password
                    );

                    if (regUser) {
                        const userData = { ...regUser };
                        delete userData.password;
                        setUser(userData);
                        localStorage.setItem('wibeUser', JSON.stringify(userData));
                        resolve(userData);
                    } else {
                        reject(new Error('Email yoki parol noto\'g\'ri'));
                    }
                }
            }, 800);
        });
    };

    // Register function
    const register = (userData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const registeredUsers = JSON.parse(localStorage.getItem('wibeRegisteredUsers') || '[]');

                // Check if email already exists
                if (registeredUsers.some(u => u.email === userData.email) ||
                    MOCK_USERS.some(u => u.email === userData.email)) {
                    reject(new Error('Bu email allaqachon ro\'yxatdan o\'tgan'));
                    return;
                }

                const newUser = {
                    id: Date.now(),
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    password: userData.password,
                    avatar: null,
                    rating: 5.0,
                    sales: 0,
                    purchases: 0,
                    createdAt: new Date().toISOString().split('T')[0]
                };

                registeredUsers.push(newUser);
                localStorage.setItem('wibeRegisteredUsers', JSON.stringify(registeredUsers));

                const userDataWithoutPassword = { ...newUser };
                delete userDataWithoutPassword.password;
                setUser(userDataWithoutPassword);
                localStorage.setItem('wibeUser', JSON.stringify(userDataWithoutPassword));

                resolve(userDataWithoutPassword);
            }, 800);
        });
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('wibeUser');
    };

    // Update user profile
    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('wibeUser', JSON.stringify(updatedUser));
        return updatedUser;
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
