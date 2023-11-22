import { BrowserRouter } from "react-router-dom";
import "./App.css";
import SideBarLayout from "./layout/sidebar/SideBarLayout";
import AppRouter from "./routes/AppRouter";
import SnackbarProvider from "./providers/SnackBarProvider";
import UserProvider from "./users/providers/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <UserProvider>
          <SideBarLayout>
            <AppRouter />
          </SideBarLayout>
        </UserProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
