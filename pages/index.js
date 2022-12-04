import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Product from '../models/Product'

const Index = ({ products }) => (
  <>
    {/* Create a card for each product */}
    {products.map((product) => (
      <div key={product._id}>
        <div className="card">
          <img src={product.image_url} />
          <h5 className="pet-name">{product.name}</h5>
          <div className="main-content">
            <p className="pet-name">{product.name}</p>
            <p className="owner">Owner: {product.owner_name}</p>

            {/* Extra product Info: Likes and Dislikes */}
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
              <Link href="/product/[id]" as={`/product/${product._id}`} legacyBehavior>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

/* Retrieves product(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Product.find({})
  const products = result.map((doc) => {
    const product = doc.toObject()
    product._id = product._id.toString()
    return product
  })

  return { props: { products: products } }
}

export default Index
