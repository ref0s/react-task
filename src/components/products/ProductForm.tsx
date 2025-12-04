import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type ProductFormValues = {
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
};

type ProductFormProps = {
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  loading?: boolean;
};

const defaultValues: ProductFormValues = {
  title: "",
  description: "",
  price: 0,
  category: "",
  stock: 0,
};

type ProductFormState = {
  title: string;
  description: string;
  price: string;
  category: string;
  stock: string;
};

type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>;

export const ProductForm = ({
  initialValues,
  onSubmit,
  loading,
}: ProductFormProps) => {
  const [values, setValues] = useState<ProductFormState>({
    title: defaultValues.title,
    description: defaultValues.description,
    price: String(defaultValues.price),
    category: defaultValues.category,
    stock: String(defaultValues.stock),
  });

  const [errors, setErrors] = useState<ProductFormErrors>({});

  useEffect(() => {
    if (!initialValues) return;

    setValues({
      title: initialValues.title ?? defaultValues.title,
      description: initialValues.description ?? defaultValues.description,
      price:
        initialValues.price != null
          ? String(initialValues.price)
          : String(defaultValues.price),
      category: initialValues.category ?? defaultValues.category,
      stock:
        initialValues.stock != null
          ? String(initialValues.stock)
          : String(defaultValues.stock),
    });
  }, [initialValues]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: ProductFormErrors = {};

    if (!values.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!values.description.trim()) {
      newErrors.description = "Description is required";
    }

    const priceNumber = Number(values.price);
    if (!values.price) {
      newErrors.price = "Price is required";
    } else if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!values.category.trim()) {
      newErrors.category = "Category is required";
    }

    const stockNumber = Number(values.stock);
    if (values.stock === "") {
      newErrors.stock = "Stock is required";
    } else if (Number.isNaN(stockNumber) || stockNumber < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      price: priceNumber,
      category: values.category.trim(),
      stock: stockNumber,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          placeholder="Product title"
          value={values.title}
          onChange={(event) => {
            const value = event.target.value;
            setValues((prev) => ({
              ...prev,
              title: value,
            }));
            setErrors((prev) => ({
              ...prev,
              title: undefined,
            }));
          }}
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          rows={4}
          placeholder="Brief description"
          value={values.description}
          onChange={(event) => {
            const value = event.target.value;
            setValues((prev) => ({
              ...prev,
              description: value,
            }));
            setErrors((prev) => ({
              ...prev,
              description: undefined,
            }));
          }}
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={values.price}
          onChange={(event) => {
            const value = event.target.value;
            setValues((prev) => ({
              ...prev,
              price: value,
            }));
            setErrors((prev) => ({
              ...prev,
              price: undefined,
            }));
          }}
        />
        {errors.price && (
          <p className="text-sm text-red-500 mt-1">{errors.price}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <Input
          placeholder="e.g. laptops"
          value={values.category}
          onChange={(event) => {
            const value = event.target.value;
            setValues((prev) => ({
              ...prev,
              category: value,
            }));
            setErrors((prev) => ({
              ...prev,
              category: undefined,
            }));
          }}
        />
        {errors.category && (
          <p className="text-sm text-red-500 mt-1">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock</label>
        <Input
          type="number"
          min="0"
          value={values.stock}
          onChange={(event) => {
            const value = event.target.value;
            setValues((prev) => ({
              ...prev,
              stock: value,
            }));
            setErrors((prev) => ({
              ...prev,
              stock: undefined,
            }));
          }}
        />
        {errors.stock && (
          <p className="text-sm text-red-500 mt-1">{errors.stock}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};
