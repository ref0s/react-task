import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import type { Product } from '@/api'
import { deleteProduct, getProduct } from '@/api'
import { DeleteProductDialog } from '@/components/products/DeleteProductDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      setError('')
      setLoading(true)
      try {
        const data = await getProduct(id)
        setProduct(data)
      } catch (err) {
        setError('Failed to load product.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  const handleDelete = async () => {
    if (!id) return
    setDeleting(true)
    try {
      await deleteProduct(id)
      toast.success('Product deleted')
      navigate('/dashboard/products')
    } catch (err) {
      toast.error('Delete failed')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <Skeleton className="h-64 w-full" />
  }

  if (error || !product) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || 'Product not found.'}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>{product.category}</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/dashboard/products/${product.id}/edit`}>Edit</Link>
          </Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-[240px_1fr]">
        <div>
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 w-full rounded-md object-cover"
            />
          ) : (
            <div className="h-48 w-full rounded-md bg-muted" />
          )}
        </div>
        <div className="space-y-2">
          <div className="text-xl font-semibold">${product.price}</div>
          <div className="text-sm text-muted-foreground">Stock: {product.stock}</div>
          <p className="text-sm leading-relaxed">{product.description}</p>
        </div>
      </CardContent>

      <DeleteProductDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDelete}
        productTitle={product.title}
        loading={deleting}
      />
    </Card>
  )
}
