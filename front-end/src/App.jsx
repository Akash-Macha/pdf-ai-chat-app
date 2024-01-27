import { Suspense, lazy } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import './App.css'
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
    errorElement: <p>Not Found</p>,
  },
  {
    path: "/chat-with-pdf",
    element: <Suspense fallback={<RingLoader color="#36d7b7" />}><ChatScreen /></Suspense>,
    errorElement: <p>Not Found</p>,
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
