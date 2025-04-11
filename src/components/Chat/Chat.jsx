import { useEffect, useRef, useMemo } from "react";
import Markdown from "react-markdown";
import styles from "./Chat.module.css";

const WELCOME_MESSAGE_GROUP = [
    {
        role: "assistant",
        content: "Hello! I'm an AI chatbot. How can I assist you today?",
    }
];

export function Chat({ messages }) {
    const messagesEndRef = useRef(null);
    const messagesGroup = useMemo(() => messages.reduce((groups, message) => {
        if(message.role === 'user') groups.push([]);
        groups[groups.length - 1].push(message);
        return groups;
    }, []), [messages]);

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];

        if(lastMessage?.role === 'user') {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); 

    return (
        <div className={ styles.Chat }>
            {[WELCOME_MESSAGE_GROUP, ...messagesGroup].map((messages, groupIndex) => (
                // Group
                <div key={ groupIndex } className={ styles.Group }>
                    {messages.map(({ role, content }, index) => (
                        // Message
                        <div key={ index } className={ styles.Message } data-role={ role }>
                            <Markdown>{ content }</Markdown>
                        </div>
                    ))}
                </div>
            ))}
            <div ref={ messagesEndRef } />
        </div>
    );
}
