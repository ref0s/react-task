import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '@/api'
import { deleteProduct, getProducts } from '@/api'
import { ProductTable } from '@/components/products/ProductTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export const ProductsListPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError('Failed to load products.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((product) => product.id !== id))
      toast.success('Product deleted')
    } catch (err) {
      toast.error('Failed to delete product')
    }
  }

  return (
    <div className="space-y-4 w-4/5 mx-auto ">
      <div className="flex items-center justify-between mt-10">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-muted-foreground">Manage your inventory.</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/products/new">Add Product</Link>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={fetchProducts}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Card>
          <CardHeader>
            <CardTitle>Loading products</CardTitle>
            <CardDescription>Please wait...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      ) : (
        <ProductTable products={products} onDelete={handleDelete} />
      )}
    </div>
  )
}
