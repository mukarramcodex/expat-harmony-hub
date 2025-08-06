import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminsOperators from "./pages/users/AdminsOperators";
import Agents from "./pages/users/Agents";
import ClinicStaff from "./pages/users/ClinicStaff";
import TrainingCenters from "./pages/users/TrainingCenters";
import WorkerRegistration from "./pages/workers/WorkerRegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/users/admins" element={
            <MainLayout>
              <AdminsOperators />
            </MainLayout>
          } />
          <Route path="/users/agents" element={
            <MainLayout>
              <Agents />
            </MainLayout>
          } />
          <Route path="/users/clinics" element={
            <MainLayout>
              <ClinicStaff />
            </MainLayout>
          } />
          <Route path="/users/training" element={
            <MainLayout>
              <TrainingCenters />
            </MainLayout>
          } />
          <Route path="/workers/register" element={
            <MainLayout>
              <WorkerRegistration />
            </MainLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
