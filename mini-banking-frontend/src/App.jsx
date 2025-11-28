// ...existing code...
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import DepositPage from "./pages/DepositPage"
import WithdrawPage from "./pages/WithdrawPage"
import TransferPage from "./pages/TransferPage"
import TransactionHistoryPage from "./pages/TransactionHistoryPage"

export default function App() {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <div className="flex flex-col w-full">
                  <Navbar />
                  <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/deposit" element={<DepositPage />} />
                        <Route path="/withdraw" element={<WithdrawPage />} />
                        <Route path="/transfer" element={<TransferPage />} />
                        <Route path="/transactions" element={<TransactionHistoryPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  )
}
// ...existing code...