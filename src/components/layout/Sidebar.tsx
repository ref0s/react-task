import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/dashboard/products', label: 'Products' },
]

export const Sidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-56 h-full border-r bg-background p-4 flex flex-col">
      <div>
        <div className="mb-4 text-lg font-semibold">Admin</div>
        <Separator className="mb-4" />
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn('w-full', isActive ? 'font-semibold text-primary' : 'text-muted-foreground')
              }
            >
              <Button variant="ghost" className="w-full justify-start">
                {link.label}
              </Button>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto">
        <Separator className="mb-4" />
        <Button variant="outline" className="w-full">
          <a href="https://github.com/ref0s/react-task">
          Github
          </a>
        </Button>
        <Separator className="mb-4" />
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </aside>
  )
}
