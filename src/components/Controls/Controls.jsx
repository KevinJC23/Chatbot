import { useEffect, useState, useRef } from 'react';
import TextAreaAutosize from 'react-textarea-autosize';
import styles from './Controls.module.css';

export function Controls({ isDisabled = false, onSend }) {
    const textareaRef = useRef(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if(!isDisabled) {
            textareaRef.current.focus();
        }
    }, [isDisabled])

    function handleContentChange(event) {
        setContent(event.target.value);
    }

    function handleContentSend() {
        if(content.length > 0) {
            onSend(content);
            setContent("");
        }
    }

    function handleEnterPress(event) {
        if(event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleContentSend();
        }
    }

    return (
        <div className={ styles.Controls }>
            <div className={ styles.TextAreaContainer }>
                <TextAreaAutosize 
                    ref={ textareaRef }
                    className={ styles.TextArea } 
                    disabled={ isDisabled }
                    placeholder="Message AI Chatbot" 
                    value={ content }
                    minRows={1}
                    maxRows={4}
                    onChange={ handleContentChange }
                    onKeyDown={ handleEnterPress }
                />
            </div>
            <button className={ styles.Button } disabled={ isDisabled } onClick={ handleContentSend }>
                <SendIcon />
            </button>
        </div>
    );
}

function SendIcon() {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#e3e3e3"
        >
            <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
        </svg>
    );
}
