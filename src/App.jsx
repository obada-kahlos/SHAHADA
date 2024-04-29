import { createBrowserRouter } from "react-router-dom";
import { Root } from "./routes/root";
import { ErrorPage } from "./error-page/error-page";
import { AppProvider } from "./contexts/AppContext";
import { ShahadaPage } from "./page/Shahada";
import { ReadyPage } from "./page/Ready";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <Root />
      </AppProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ReadyPage />,
      },
      {
        path: "/Shahada",
        element: <ShahadaPage />,
      },
    ],
  },
]);
