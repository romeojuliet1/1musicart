
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { GemsProvider } from "./contexts/GemsContext";
import { AffiliateProvider } from "./contexts/AffiliateContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Artists from "./pages/Artists";
import Dashboard from "./pages/Dashboard";
import ArtistProfile from "./pages/ArtistProfile";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Booking from "./pages/Booking";
import References from "./pages/References";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <GemsProvider>
          <AffiliateProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <div className="min-h-screen bg-black text-white">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/artist/:id" element={<ArtistProfile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/references" element={<References />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </AffiliateProvider>
        </GemsProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
