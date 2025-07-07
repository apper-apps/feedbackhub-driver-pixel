import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from '@/components/organisms/Sidebar';
import Dashboard from '@/components/pages/Dashboard';
import Ideas from '@/components/pages/Ideas';
import Roadmap from '@/components/pages/Roadmap';
import Changelog from '@/components/pages/Changelog';
import Reviews from '@/components/pages/Reviews';
import Settings from '@/components/pages/Settings';

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
      />
    </div>
  );
}

export default App;