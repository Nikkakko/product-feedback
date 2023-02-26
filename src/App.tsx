import styled, { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import { defaultTheme } from './styles/defaultTheme';
import { GlobalStyles } from './styles/globalStyles';

import {
  Outlet,
  RouterProvider,
  ReactRouter,
  Route,
  RootRoute,
} from '@tanstack/react-router';
import { FeedbackDetail, NewFeedback, RoadmapPage } from './pages';

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const detailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/detail/$id',
  component: FeedbackDetail,
});

const createFeedbackRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/new-feedback',
  component: NewFeedback,
});

const editFeedbackRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/edit-feedback/$id',
  component: NewFeedback,
});

const RoadmapRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/roadmap',
  component: RoadmapPage,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  detailRoute,
  createFeedbackRoute,
  RoadmapRoute,
  editFeedbackRoute,
]);

// Create the router using your route tree
const router = new ReactRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function Root() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Main>
        <Outlet />
      </Main>
    </ThemeProvider>
  );
}

const App = () => {
  return <RouterProvider router={router} />;
};

const Main = styled.div`
  width: 100%;
  min-height: 100vh;
`;
export default App;
