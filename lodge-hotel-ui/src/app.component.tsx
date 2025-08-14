import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Cabins, Login } from "@pages";
import { AppLayout } from "@ui/layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "@features/authentication";
import { AuthProvider } from "@contexts";
import { ROUTES } from "@utils/constants";

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
              <ProtectedRoute matchRole="ROLE_USER">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to={ROUTES.cabins} />} />
            <Route path={ROUTES.cabins} element={<Cabins />} />
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
