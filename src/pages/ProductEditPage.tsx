import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Product } from '@/api'
import { getProduct, updateProduct } from '@/api'
import { ProductForm, type ProductFormValues } from '@/components/products/ProductForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (values: ProductFormValues) => {
    if (!id) return
    setSaving(true)
    setError('')
    try {
      await updateProduct(id, values)
      toast.success('Product updated')
      navigate(`/dashboard/products/${id}`)
    } catch (err) {
      setError('Failed to update product.')
    } finally {
      setSaving(false)
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
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>Update product details.</CardDescription>
        </div>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <ProductForm
          initialValues={{
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
          }}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </CardContent>
    </Card>
  )
}
