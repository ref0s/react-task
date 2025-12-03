import { useAuth } from '@/components/auth/AuthProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Topbar = () => {
  const { user } = useAuth()

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}` || user.username[0]
    : 'U'

  return (
    <header className="flex items-center justify-between border-b bg-background px-20 py-3">
      <div className="flex items-center gap-2 ">
        <Avatar>
          {user?.image ? <AvatarImage src={user.image} alt={user.username} /> : null}
          <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <div className="font-medium">{user?.username ?? 'User'}</div>
          <div className="text-xs text-muted-foreground">
            {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
          </div>
        </div>
      </div>
    </header>
  )
}
