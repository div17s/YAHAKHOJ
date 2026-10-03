/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Pyq } from './pages/Pyq';
import { Rooms } from './pages/Rooms';
import { Roommates } from './pages/Roommates';
import { Seniors } from './pages/Seniors';
import { Internships } from './pages/Internships';
import { Events } from './pages/Events';
import { Roadmaps } from './pages/Roadmaps';
import { Support } from './pages/Support';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { Onboarding } from './pages/Onboarding';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { UserProvider, useUser } from './contexts/UserContext';
import { GateScreen } from './components/GateScreen';
import { useLocation } from 'react-router-dom';

function GatedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const location = useLocation();
  
  if (user && !user.onboardingCompleted) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }
  
  if (!user) {
    return <GateScreen />;
  }
  
  return <>{children}</>;
}

function HomeSelector() {
  const { user } = useUser();
  if (user && user.onboardingCompleted) {
    return <Navigate to="/dashboard" />;
  }
  return <Landing />;
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomeSelector />} />
            <Route path="dashboard" element={<GatedRoute><Dashboard /></GatedRoute>} />
            <Route path="pyq" element={<GatedRoute><Pyq /></GatedRoute>} />
            <Route path="rooms" element={<GatedRoute><Rooms /></GatedRoute>} />
            <Route path="roommates" element={<GatedRoute><Roommates /></GatedRoute>} />
            <Route path="seniors" element={<GatedRoute><Seniors /></GatedRoute>} />
            <Route path="internships" element={<GatedRoute><Internships /></GatedRoute>} />
            <Route path="events" element={<GatedRoute><Events /></GatedRoute>} />
            <Route path="roadmaps" element={<GatedRoute><Roadmaps /></GatedRoute>} />
            <Route path="support" element={<Support />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="admin" element={<GatedRoute><Admin /></GatedRoute>} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="profile" element={<GatedRoute><Profile /></GatedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}



