import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TweetsContextProvider } from './Contexts/TweetsContext';
import { AuthContextProvider } from './Contexts/AuthContext';
import { OwnTweetsContextProvider } from './Contexts/OwnTweetsContext';
import { InterestsContextProvider } from './Contexts/InterestsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TweetsContextProvider>
        <OwnTweetsContextProvider>
          <InterestsContextProvider>
            <App />
          </InterestsContextProvider>
        </OwnTweetsContextProvider>
      </TweetsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
