import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/user.context";
import Navbar from "./Ui/Navbar";
import { PageProvider } from "./context/Pages.context";
const App = () => {
  return (
    <div className="overflow-y-hidden">
        <UserProvider>
          <PageProvider>
            <AppRoutes />
          </PageProvider>
        </UserProvider>
    </div>
  );
};

export default App;
