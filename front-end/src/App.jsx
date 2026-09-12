import { Suspense, lazy } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import './App.css'
import NotFound from './components/NotFound/NotFound';
import RequireAuth from './components/RequireAuth';
import AppLayout from './components/Layout/AppLayout';
import PdfUploadScreen from './components/PdfUploadScreen/PdfUploadScreen';
const LandingPage = lazy(() => import('./components/LandingPage'))
const ChatScreen = lazy(() => import('./components/ChatScreen/ChatScreen'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    }
  }
});

const PageFallback = () => (
  <Center style={{ flex: 1 }}>
    <Loader />
  </Center>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Suspense fallback={<PageFallback />}><LandingPage /></Suspense>
      </AppLayout>
    ),
    errorElement: <AppLayout><NotFound /></AppLayout>,
  },
  {
    path: "/pdf-upload",
    element: (
      <AppLayout>
        <RequireAuth><PdfUploadScreen /></RequireAuth>
      </AppLayout>
    ),
    errorElement: <AppLayout><NotFound /></AppLayout>,
  },
  {
    path: "/chat-with-pdf",
    element: (
      <AppLayout>
        <RequireAuth>
          <Suspense fallback={<PageFallback />}><ChatScreen /></Suspense>
        </RequireAuth>
      </AppLayout>
    ),
    errorElement: <AppLayout><NotFound /></AppLayout>,
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
