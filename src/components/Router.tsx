import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Pages
import HomePage from '@/components/pages/HomePage';
import ProfilePage from '@/components/pages/ProfilePage';
import CommunitiesPage from '@/components/pages/CommunitiesPage';
import CommunityFeedPage from '@/components/pages/CommunityFeedPage';
import PetMapPage from '@/components/pages/PetMapPage';
import GalleryPage from '@/components/pages/GalleryPage';
import ResourcesPage from '@/components/pages/ResourcesPage';
import VetsPage from '@/components/pages/VetsPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import TermsPage from '@/components/pages/TermsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />, // MIXED ROUTE: Shows different content for authenticated vs anonymous users
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view and manage your profile">
            <ProfilePage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'profile',
        },
      },
      {
        path: "communities",
        element: <CommunitiesPage />,
        routeMetadata: {
          pageIdentifier: 'communities',
        },
      },
      {
        path: "community/:communityId",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to join the community and interact with other pet owners">
            <CommunityFeedPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'community-feed',
        },
      },
      {
        path: "pet-map",
        element: <PetMapPage />,
        routeMetadata: {
          pageIdentifier: 'pet-map',
        },
      },
      {
        path: "gallery",
        element: <GalleryPage />,
        routeMetadata: {
          pageIdentifier: 'gallery',
        },
      },
      {
        path: "resources",
        element: <ResourcesPage />,
        routeMetadata: {
          pageIdentifier: 'resources',
        },
      },
      {
        path: "vets",
        element: <VetsPage />,
        routeMetadata: {
          pageIdentifier: 'vets',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
        routeMetadata: {
          pageIdentifier: 'privacy',
        },
      },
      {
        path: "terms",
        element: <TermsPage />,
        routeMetadata: {
          pageIdentifier: 'terms',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
