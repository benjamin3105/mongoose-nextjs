import mongoose from 'mongoose'

/* ProductSchema will correspond to a collection in your MongoDB database. */
const ProductSchema = new mongoose.Schema({
  name: {
    /* The name of this product */

    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  owner_name: {
    /* The owner of this product */

    type: String,
    required: [true, "Please provide the product owner's name"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  species: {
    /* The species of your product */

    type: String,
    required: [true, 'Please specify the species of your product.'],
    maxlength: [40, 'Species specified cannot be more than 40 characters'],
  },
  age: {
    /* product's age, if applicable */

    type: Number,
  },
  poddy_trained: {
    /* Boolean poddy_trained value, if applicable */

    type: Boolean,
  },
  diet: {
    /* List of dietary needs, if applicable */

    type: Array,
  },
  image_url: {
    /* Url to product image */

    required: [true, 'Please provide an image url for this product.'],
    type: String,
  },
  likes: {
    /* List of things your product likes to do */

    type: Array,
  },
  dislikes: {
    /* List of things your product does not like to do */

    type: Array,
  },
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
