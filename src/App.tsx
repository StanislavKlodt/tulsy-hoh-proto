import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Layout } from "@/components/layout/Layout";
import HomePage from "./pages/HomePage";
import { HomePageV2 } from "./pages/HomePageV2";
import CatalogPage from "./pages/CatalogPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import QuizPage from "./pages/QuizPage";
import ProjectsPage, { ProjectDetailPage } from "./pages/ProjectsPage";
import BlogPage, { BlogPostPage } from "./pages/BlogPage";
import ShowroomPage from "./pages/ShowroomPage";
import ProductionPage from "./pages/ProductionPage";
import DeliveryPage from "./pages/DeliveryPage";
import ContactsPage from "./pages/ContactsPage";
import NotFound from "./pages/NotFound";
import ProductPageV2 from "./pages/ProductPageV2";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mainV2" element={<HomePageV2 />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:slug" element={<CatalogPage />} />
              <Route path="/catalog/:slug/:subcategory" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductPageV2 />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/showroom" element={<ShowroomPage />} />
              <Route path="/production" element={<ProductionPage />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
