import "@/app.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/routes";
import { AutoLogoutProvider } from "@/providers/AutoLogoutProvider";

function App() {
  return (
    <AutoLogoutProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AutoLogoutProvider>
  );
}

export default App;
