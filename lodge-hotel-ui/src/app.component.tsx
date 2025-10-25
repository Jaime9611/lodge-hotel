import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {
  About,
  Bookings,
  Cabins,
  Checkin,
  Dashboard,
  Landing,
  LandingCabins,
  Login,
  Settings,
  Users,
} from "@pages";
import { AppLayout, LandingLayout, AccountLayout } from "@ui/layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "@features/authentication";
import { AuthProvider, CartProvider } from "@contexts";
import { ROLE, ROUTES } from "@utils/constants";
import Booking from "./pages/booking.component";
import CabinDetail from "@features/cabins/cabin-detail.component";
import { CabinUserDetail } from "@features/cabins";

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
        <CartProvider>
          <Routes>
            <Route path={ROUTES.login} element={<Login />} />
            <Route path="/" element={<LandingLayout />}>
              <Route index element={<Landing />} />
              <Route path={ROUTES.user_cabins} element={<LandingCabins />} />
              <Route
                path={ROUTES.user_cabinId_path}
                element={<CabinUserDetail />}
              />
              <Route path={ROUTES.about} element={<About />} />
              <Route path={ROUTES.user_account} element={<AccountLayout />}>
                <Route
                  path={ROUTES.user_profile}
                  element={<h1>Your profile</h1>}
                />
                <Route
                  path={ROUTES.user_reservations}
                  element={<h1>Your reservations</h1>}
                />
              </Route>
            </Route>
            <Route
              element={
                <ProtectedRoute matchRole={[ROLE.MANAGER, ROLE.STAFF]}>
                  <AppLayout />
                </ProtectedRoute>
              }
              path={ROUTES.dashboard}
            >
              {/* <Route
                index
                element={<Navigate replace to={ROUTES.dashboard} />}
              /> */}
              <Route index element={<Dashboard />} />
              <Route path={ROUTES.cabins} element={<Cabins />} />
              <Route path={ROUTES.cabinId_path} element={<CabinDetail />} />
              <Route path={ROUTES.bookings} element={<Bookings />} />
              <Route path={ROUTES.bookingId_path} element={<Booking />} />
              <Route path={ROUTES.booking_checkin} element={<Checkin />} />
              <Route path={ROUTES.users} element={<Users />} />
            </Route>
          </Routes>
        </CartProvider>
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
