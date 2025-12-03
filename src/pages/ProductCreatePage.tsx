import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '@/api'
import { ProductForm, type ProductFormValues } from '@/components/products/ProductForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from 'sonner'

export const ProductCreatePage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (values: ProductFormValues) => {
    setLoading(true)
    setError('')
    try {
      await createProduct(values)
      toast.success('Product created')
      navigate('/dashboard/products')
    } catch (err) {
      setError('Failed to create product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>New Product</CardTitle>
          <CardDescription>Create a new item.</CardDescription>
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
        <ProductForm onSubmit={handleSubmit} loading={loading} />
      </CardContent>
    </Card>
  )
}
