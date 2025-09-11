import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Bookings, Cabins, Dashboard, Login, Settings, Users } from "@pages";
import { AppLayout } from "@ui/layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "@features/authentication";
import { AuthProvider } from "@contexts";
import { ROLE, ROUTES } from "@utils/constants";
import Booking from "./pages/booking.component";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // Amount of time the data will be on cache
      staleTime: 0, // Amount of time the data will be on cache
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            element={
              <ProtectedRoute matchRole={[ROLE.MANAGER, ROLE.STAFF]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to={ROUTES.dashboard} />} />
            <Route path={ROUTES.dashboard} element={<Dashboard />} />
            <Route path={ROUTES.cabins} element={<Cabins />} />
            <Route path={ROUTES.bookings} element={<Bookings />} />
            <Route path={ROUTES.bookingId_path} element={<Booking />} />
            <Route path={ROUTES.users} element={<Users />} />
            <Route path={ROUTES.settings} element={<Settings />} />
          </Route>
          <Route path={ROUTES.login} element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        },
      }}
    />
  </QueryClientProvider>
);

export default App;
