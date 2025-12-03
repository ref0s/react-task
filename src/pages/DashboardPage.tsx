import { useEffect, useState } from 'react'
import { getProducts } from '@/api'
import { useAuth } from '@/components/auth/AuthProvider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { BarChart } from '@/components/charts/BarChart'
import { ChartRadialShape } from '@/components/charts/ChartRadialShape'

export const DashboardPage = () => {
  const { user } = useAuth()
  const [productCount, setProductCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const products = await getProducts()
        setProductCount(products.length)
      } catch (error) {
        setProductCount(null)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName ?? user?.username ?? 'Admin'}</CardTitle>
          <CardDescription>Your admin dashboard overview.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Use the sidebar to manage products.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Total items available</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-3xl font-semibold">{productCount ?? '—'}</div>
          )}
        </CardContent>
      </Card>
      <BarChart/>
      <ChartRadialShape/>
    </div>
  )
}
