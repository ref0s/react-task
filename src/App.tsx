import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Toaster } from '@/components/ui/sonner'
import { DashboardPage } from '@/pages/DashboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { ProductCreatePage } from '@/pages/ProductCreatePage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { ProductEditPage } from '@/pages/ProductEditPage'
import { ProductsListPage } from '@/pages/ProductsListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path='products' element={<ProductsListPage />} />
          <Route path='products/new' element={<ProductCreatePage />} />
          <Route path='products/:id' element={<ProductDetailPage />} />
          <Route path='products/:id/edit' element={<ProductEditPage />} />
        </Route>
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
