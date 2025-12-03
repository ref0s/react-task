import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '@/api'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteProductDialog } from './DeleteProductDialog'

type ProductTableProps = {
  products: Product[]
  onDelete: (id: number) => Promise<void> | void
}

export const ProductTable = ({ products, onDelete }: ProductTableProps) => {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleConfirmDelete = async () => {
    if (!selectedId) return
    setDeleting(true)
    await onDelete(selectedId)
    setDeleting(false)
    setSelectedId(null)
  }

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='pl-10'>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right pr-10">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=''>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium pl-10">{product.title}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="flex justify-end gap-2 pr-10">
                <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/products/${product.id}`)}>
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
                >
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setSelectedId(product.id ?? null)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteProductDialog
        open={selectedId !== null}
        onOpenChange={(open) => setSelectedId(open ? selectedId : null)}
        onConfirm={handleConfirmDelete}
        productTitle={products.find((p) => p.id === selectedId)?.title}
        loading={deleting}
      />
    </div>
  )
}
