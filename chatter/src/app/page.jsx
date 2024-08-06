
"use client"
import { useState } from 'react';
import { Alert } from 'flowbite-react';
import axios from 'axios';
import { AutoTextarea } from '@chatbotkit/react';

export default function Home() {
  const [thinking, setThinking] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const submit = async () => {
    setThinking(true);
    try {
      const response = await axios.post('/api/conversation/complete', { text });
      setMessages([...messages, { type: 'user', text }, { type: 'bot', text: response.data.message }]);
      setText('');
    } catch (error) {
      console.error('Error submitting text:', error);
    } finally {
      setThinking(false);
    }
  };

  function handleOnKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Mental Health Advisor&nbsp;
        </p>
        <Alert color="info">Alert! Site under Development</Alert>;
      </div>
      
      <div style={{ fontFamily: 'monospace', padding: '10px' }}>
        {messages.map(({ id, type, text }) => (
          <div key={id}>
            <strong>{type}:</strong> {text}
          </div>
        ))}
        {thinking && (
          <div key="thinking">
            <strong>bot:</strong> thinking...
          </div>
        )}
        <AutoTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleOnKeyDown}
          placeholder="Type something..."
          style={{
            border: 0,
            outline: 'none',
            resize: 'none',
            width: '100%',
            marginTop: '10px',
          }}
        />
      </div>
    </main>
  );
}
