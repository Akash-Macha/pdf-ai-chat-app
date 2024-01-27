import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import ChatScreen from './components/ChatScreen/ChatScreen.jsx';
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
     
  },
  {
    path: "/chat-with-pdf",
    element: <ChatScreen />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
