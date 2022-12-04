import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditProduct = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: product, error } = useSWR(id ? `/api/products/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!product) return <p>Loading...</p>

  const productForm = {
    name: product.name,
    owner_name: product.owner_name,
    species: product.species,
    age: product.age,
    poddy_trained: product.poddy_trained,
    diet: product.diet,
    image_url: product.image_url,
    likes: product.likes,
    dislikes: product.dislikes,
  }

  return <Form formId="edit-pet-form" productForm={productForm} forNewProduct={false} />
}

export default EditProduct
