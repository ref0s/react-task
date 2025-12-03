import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export type ProductFormValues = {
  title: string
  description: string
  price: number
  category: string
  stock: number
}

type ProductFormProps = {
  initialValues?: Partial<ProductFormValues>
  onSubmit: (values: ProductFormValues) => void | Promise<void>
  loading?: boolean
}

const defaultValues: ProductFormValues = {
  title: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
}

type ProductFormSchema = Omit<ProductFormValues, 'price' | 'stock'> & {
  price: string | number
  stock: string | number
}

export const ProductForm = ({ initialValues, onSubmit, loading }: ProductFormProps) => {
  const form = useForm<ProductFormSchema>({
    defaultValues,
  })

  useEffect(() => {
    if (initialValues) {
      form.reset({ ...defaultValues, ...initialValues })
    }
  }, [form, initialValues])

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit({
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    })
  })

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="title"
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Brief description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          rules={{
            required: 'Price is required',
            min: { value: 0.01, message: 'Price must be greater than 0' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g. laptops" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          rules={{
            required: 'Stock is required',
            min: { value: 0, message: 'Stock cannot be negative' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
