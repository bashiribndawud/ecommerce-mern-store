import Product from "../Models/product.js";
import dotenv from "dotenv";
import Order from "../Models/order.js";
import Stripe from "stripe";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SK);

export const allProduct = async (req, res) => {
  const products = await Product.find({}).sort({ _id: -1 });
  if (products) {
    return res.status(200).json(products);
  }
};

export const singleProduct = async (req, res) => {
  const { id } = req.query;
  const product = await Product.findById(id);
  if (product) {
    return res.status(200).json(product);
  }
};

export const getCartItems = async (req, res) => {
  const { productIds } = req.body;
  const products = await Product.find({ _id: productIds });
  if (products) {
    return res.status(200).json(products);
  }
};

export const PlaceOrder = async (req, res) => {
  if (req.method !== "POST") {
    res.json("Should be a post request");
    return;
  }
  const { name, email, city, postalCode, address, country, cartProducts } =
    req.body;
    const productIds = cartProducts;
    const uniqueIds = [...new Set(productIds)]
    const productInfos = await Product.find({_id: uniqueIds})
    
    let line_items = [];
    for(const productId of uniqueIds){
        const productInfo = productInfos.find(p => p._id.toString() === productId);
        const quantity = productIds.filter(id => id === productId).length || 0;
        if(quantity > 0 && productInfo){
            line_items.push({
              quantity,
              price_data: {
                currency: "USD",
                product_data: { name: productInfo.name },
                unit_amount: productInfo.price * 100,
              },
            });
        }
    }

    const newOrder = await Order.create({
        line_items,
        name,
        email,
        city,
        postalCode,
        address,
        country
    });

   const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.PUBLIC_URL + "/cart?success=1",
      cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
      metadata: {orderId: newOrder._id.toString(), test: "ok"}
    });

    res.json({
        url: session.url
    })
};
