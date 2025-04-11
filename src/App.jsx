import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TabList from './components/TabList.jsx';

const Dashboard = () => <div className="page-content">Dashboard Content</div>;
const Banking = () => <div className="page-content">Banking Content</div>;
const Timeline = () => <div className="page-content">Timeline Content</div>;
const Accounting = () => <div className="page-content">Accounting Content</div>;
const Manual = () => <div className="page-content">Manual Content</div>;
const Statistics = () => <div className="page-content">Statistics Content</div>;
const BankOffice = () => <div className="page-content">Bank Office Content</div>;
const Administration = () => <div className="page-content">Administration Content</div>;
const Help = () => <div className="page-content">Help Content</div>;
const Wertpapierhandel = () => <div className="page-content">Wertpapierhandel Content</div>;
const Ausschuttungen = () => <div className="page-content">Ausschüttungen Content</div>;
const Finanzl = () => <div className="page-content">Finanzl Content</div>;
const Search = () => <div className="page-content">Search Content</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <TabList />
        <div className="content-area">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/banking" element={<Banking />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/manual" element={<Manual />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/bank-office" element={<BankOffice />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/help" element={<Help />} />
            <Route path="/wertpapierhandel" element={<Wertpapierhandel />} />
            <Route path="/ausschuttungen" element={<Ausschuttungen />} />
            <Route path="/finanzl" element={<Finanzl />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/analytics" element={<div>Analytics</div>} />
            <Route path="/clients" element={<div>Clients</div>} />
            <Route path="/invoices" element={<div>Invoices</div>} />
            <Route path="/calendar" element={<div>Calendar</div>} />
            <Route path="/messages" element={<div>Messages</div>} />
            <Route path="/reports" element={<div>Reports</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
