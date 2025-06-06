
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdProvider } from "@/contexts/AdContext";
import { AffiliateProvider } from "@/contexts/AffiliateContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { GemsProvider } from "@/contexts/GemsContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Artists from "./pages/Artists";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistSignup from "./pages/ArtistSignup";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import Booking from "./pages/Booking";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import References from "./pages/References";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AffiliateProvider>
        <CurrencyProvider>
          <GemsProvider>
            <AdProvider>
              <TooltipProvider>
                <Toaster />
                <BrowserRouter>
                  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/artists" element={<Artists />} />
                      <Route path="/artist/:id" element={<ArtistProfile />} />
                      <Route path="/artist-signup" element={<ArtistSignup />} />
                      <Route path="/profile/:id" element={<Profile />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/booking" element={<Booking />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogDetail />} />
                      <Route path="/references" element={<References />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </AdProvider>
          </GemsProvider>
        </CurrencyProvider>
      </AffiliateProvider>
    </QueryClientProvider>
  );
}

export default App;
