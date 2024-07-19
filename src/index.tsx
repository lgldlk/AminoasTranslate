import React from 'react';
import ReactDOM from 'react-dom/client';

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
