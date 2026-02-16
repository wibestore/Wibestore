import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowLeft, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { Link } from 'react-router-dom';

const ChatWidget = () => {
    const { user, isAuthenticated } = useAuth();
    const {
        conversations,
        activeChat,
        isOpen,
        sendMessage,
        closeChat,
        openChat,
        setActiveChat,
        getUnreadCount
    } = useChat();

    const [messageText, setMessageText] = useState('');
    const messagesEndRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeChat?.messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!messageText.trim() || !activeChat) return;
        sendMessage(activeChat.id, messageText);
        setMessageText('');
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    };

    const unreadCount = getUnreadCount();

    // Don't show if not on public pages
    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => openChat()}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 transition-all z-50"
                >
                    <MessageCircle className="w-6 h-6 text-white" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                            {unreadCount}
                        </span>
                    )}
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl shadow-black/20 border border-slate-200 flex flex-col z-50 overflow-hidden">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-slate-200 flex items-center justify-between">
                        {activeChat ? (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setActiveChat(null)}
                                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                                </button>
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-sm">{activeChat.sellerName}</h3>
                                    <p className="text-xs text-gray-400">{activeChat.accountTitle}</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="font-semibold text-gray-800">Xabarlar</h3>
                                <p className="text-xs text-gray-400">{conversations.length} suhbat</p>
                            </div>
                        )}
                        <button
                            onClick={closeChat}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        {activeChat ? (
                            // Messages View
                            <div className="p-4 space-y-3">
                                {/* Account Info */}
                                <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3 mb-4">
                                    <img
                                        src={activeChat.accountImage || '/placeholder.jpg'}
                                        alt=""
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-800 truncate">{activeChat.accountTitle}</p>
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span className="text-xs">{activeChat.sellerRating}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Messages */}
                                {activeChat.messages.length === 0 ? (
                                    <div className="text-center py-8">
                                        <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400 text-sm">Xabar yo'q</p>
                                        <p className="text-gray-500 text-xs mt-1">Suhbatni boshlang!</p>
                                    </div>
                                ) : (
                                    activeChat.messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.senderId === user.id
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
                                                : 'bg-slate-100 text-gray-800 rounded-bl-sm'
                                                }`}>
                                                <p className="text-sm">{msg.text}</p>
                                                <p className={`text-xs mt-1 ${msg.senderId === user.id ? 'text-white/70' : 'text-gray-500'
                                                    }`}>
                                                    {formatTime(msg.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        ) : (
                            // Conversations List
                            <div className="p-2">
                                {conversations.length === 0 ? (
                                    <div className="text-center py-12">
                                        <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                        <p className="text-gray-400">Suhbatlar yo'q</p>
                                        <p className="text-gray-500 text-sm mt-2">
                                            Akkaunt sahifasidan sotuvchi bilan <br />bog'laning
                                        </p>
                                    </div>
                                ) : (
                                    conversations.map((conv) => (
                                        <button
                                            key={conv.id}
                                            onClick={() => setActiveChat(conv)}
                                            className="w-full p-3 flex items-center gap-3 hover:bg-white/5 rounded-xl transition-colors"
                                        >
                                            <img
                                                src={conv.accountImage || '/placeholder.jpg'}
                                                alt=""
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div className="flex-1 min-w-0 text-left">
                                                <p className="text-sm font-medium text-gray-800 truncate">{conv.sellerName}</p>
                                                <p className="text-xs text-gray-400 truncate">{conv.accountTitle}</p>
                                                {conv.lastMessage && (
                                                    <p className="text-xs text-gray-500 truncate mt-0.5">
                                                        {conv.lastMessage.text}
                                                    </p>
                                                )}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Input (only when in chat) */}
                    {activeChat && (
                        <form onSubmit={handleSend} className="p-4 border-t border-slate-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Xabar yozing..."
                                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50"
                                />
                                <button
                                    type="submit"
                                    disabled={!messageText.trim()}
                                    className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatWidget;
