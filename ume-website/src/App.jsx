import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'; // ✅ បន្ថែម Outlet
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import VisitorTracker from './components/VisitorTracker';

// ============================================================
// PUBLIC PAGES
// ============================================================
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import StructurePage from './pages/StructurePage';
import BoardOfDirectorsPage from './pages/BoardOfDirectorsPage';
import ProgramsPage from './pages/ProgramsPage';
import Programdetailpage from './pages/Programdetailpage';
import AssociateDegreePage from './pages/AssociateDegreePage';
import MasterDegreePage from './pages/MasterDegreePage';
import AdmissionPage from './pages/AdmissionPage';
import CampusLifePage from './pages/CampusLifePage';
import AlumniPage from './pages/Alumnipage';
import NewsEventsPage from './pages/NewEventsPage';
import NewsEventDetail from './pages/Eventdetailpage';
import CareerPage from './pages/Careerpage';
import ResearchPage from './pages/Researchpage';
import FAQPage from './pages/FAQPage';
import RulesRegulationsPage from './pages/Rulesregulationspage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Faculty Pages
import FacultyManagement from './pages/FacultyManagement';
import FacultyLiterature from './pages/FacultyLiterature';
import FacultyScience from './pages/FacultyScience';
import FacultyLaw from './pages/FacultyLaw';
import FacultyAgriculture from './pages/FacultyAgriculture';

// ============================================================
// ADMIN PAGES
// ============================================================
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import BannerManager from './pages/admin/BannerManager';
import NewsManager from './pages/admin/NewsManager';
import NewsCategoryManager from './pages/admin/NewsCategoryManager';
import EventManager from './pages/admin/EventManager';
import GalleryManager from './pages/admin/GalleryManager';

// ============================================================
// PROTECTED ROUTE COMPONENT
// ============================================================
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-navy border-t-gold mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}

// ============================================================
// PUBLIC LAYOUT (Navbar + Content + Footer)
// ============================================================
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />  {/* ✅ ឥឡូវ Outlet ត្រូវបាន import រួចរាល់ */}
      </main>
      <Footer />
    </div>
  );
}

// ============================================================
// APP COMPONENT
// ============================================================
export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <VisitorTracker />
          <Routes>
            {/* ============================================ */}
            {/* ADMIN LOGIN — Public (No Admin Layout) */}
            {/* ============================================ */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* ============================================ */}
            {/* ADMIN ROUTES — Protected with AdminLayout */}
            {/* ============================================ */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="banners" element={<BannerManager />} />
              <Route path="news" element={<NewsManager />} />
              <Route path="news/new" element={<NewsManager />} />
              <Route path="news/edit/:slug" element={<NewsManager />} />
              <Route path="events" element={<EventManager />} />
              <Route path="categories" element={<NewsCategoryManager />} />
              <Route path="gallery" element={<GalleryManager />} />
            </Route>

            {/* ============================================ */}
            {/* PUBLIC ROUTES — With Navbar & Footer */}
            {/* ============================================ */}
            <Route element={<PublicLayout />}>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
              
              {/* About Section */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/structure" element={<StructurePage />} />
              <Route path="/board-of-directors" element={<BoardOfDirectorsPage />} />
              
              {/* Programs */}
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/programs/:id" element={<Programdetailpage />} />
              <Route path="/associate-degree" element={<AssociateDegreePage />} />
              <Route path="/master-degree" element={<MasterDegreePage />} />
              
              {/* Faculty Routes */}
              <Route path="/programs/management-tourism" element={<FacultyManagement />} />
              <Route path="/programs/literature-humanities" element={<FacultyLiterature />} />
              <Route path="/programs/science-technology" element={<FacultyScience />} />
              <Route path="/programs/law-economics" element={<FacultyLaw />} />
              <Route path="/programs/agriculture-rural-development" element={<FacultyAgriculture />} />
              
              {/* Admission */}
              <Route path="/admission" element={<AdmissionPage />} />
              
              {/* News & Events */}
              <Route path="/news-events" element={<NewsEventsPage />} />
              <Route path="/news-events/:slug" element={<NewsEventDetail />} />
              <Route path="/events/:slug" element={<NewsEventDetail />} />
              
              {/* Campus Life */}
              <Route path="/campus-life" element={<CampusLifePage />} />
              
              {/* Community */}
              <Route path="/alumni" element={<AlumniPage />} />
              <Route path="/career" element={<CareerPage />} />
              
              {/* Other Pages */}
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/rules" element={<RulesRegulationsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* 404 - Catch All */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}