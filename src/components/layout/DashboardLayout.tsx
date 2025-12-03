import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet  />
        </main>
      </div>
    </div>
  )
}
