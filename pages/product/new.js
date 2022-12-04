import Form from '../../components/Form'

const NewProduct = () => {
  const productForm = {
    name: '',
    owner_name: '',
    species: '',
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
  }

  return <Form formId="add-pet-form" productForm={productForm} />
}

export default NewProduct
