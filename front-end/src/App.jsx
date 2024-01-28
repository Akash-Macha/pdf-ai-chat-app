import { Suspense, lazy } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import './App.css'
import NotFound from './components/NotFound/NotFound';
const LandingPage = lazy(() => import('./components/LandingPage'))
const ChatScreen = lazy(() => import('./components/ChatScreen/ChatScreen'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    }
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<RingLoader color="#36d7b7" />}><LandingPage /></Suspense>,
    errorElement: <NotFound />,
  },
  {
    path: "/chat-with-pdf",
    element: <Suspense fallback={<RingLoader color="#36d7b7" />}><ChatScreen /></Suspense>,
    errorElement: <NotFound />,
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
};

export default App
