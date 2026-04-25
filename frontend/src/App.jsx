import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import RootLayout from "./components/layout/RootLayout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Explore from "./pages/Explore";
import Web3Apps from "./pages/Web3Apps";
import CoinbaseAdvanced from "./pages/CoinbaseAdvanced";
import DarkLayout from "./components/layout/DarkLayout";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/web3" element={<Web3Apps />} />
            <Route path="/learn" element={<Learn />} />
          </Route>
          <Route element={<DarkLayout />}>
            <Route path="/advanced-trade" element={<CoinbaseAdvanced />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
