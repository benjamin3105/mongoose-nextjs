import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

/* Allows you to view product card info and delete product card*/
const ProductPage = ({ product }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const peroductD = router.query.id

    try {
      await fetch(`/api/products/${productsID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the product.')
    }
  }

  return (
    <div key={product._id}>
      <div className="card">
        <img src={product.image_url} />
        <h5 className="pet-name">{product.name}</h5>
        <div className="main-content">
          <p className="pet-name">{product.name}</p>
          <p className="owner">Owner: {product.owner_name}</p>

          {/* Extra Product Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {product.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {product.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className="btn-container">
            <Link href="/product/[id]/edit" as={`/product/${product._id}/edit`} legacyBehavior>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const product = await Product.findById(params.id).lean()
  product._id = product._id.toString()

  return { props: { product } }
}

export default ProductPage
