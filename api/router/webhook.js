import express from 'express';
import dotenv from 'dotenv'
import Stripe from "stripe";
import Order from "../Models/order.js"
dotenv.config()
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SK);
const endpointSecret =
  "whsec_ee9ac269152b93390299db1ac5efae4d762f04325f55e3b7c87223d2a8e430a9";

router.post('/webhook', async (req, res) => {
     const sig = req.headers["stripe-signature"];

     let event;

     try {
       event = stripe.webhooks.constructEvent(
         req.body,
         sig,
         endpointSecret
       );
     } catch (err) {
       res.status(400).send(`Webhook Error: ${err.message}`);
       return;
     }

     // Handle the event
     switch (event.type) {
       case "checkout.session.completed":
         const data = event.data.object;
         const orderId = data.metadata.orderId;
         const paid = data.payment_status === 'paid'
         if (orderId && paid) {
           await Order.findByIdAndUpdate(orderId, { paid: true });
         }
         // Then define and call a function to handle the event payment_intent.succeeded
         break;
       // ... handle other event types
       default:
         console.log(`Unhandled event type ${event.type}`);
     }

     return res.status(200).send("Ok");

})

//winner-finely-neatly-clever
// acct_1MHS6QI86J7KqPrQ
// whsec_ee9ac269152b93390299db1ac5efae4d762f04325f55e3b7c87223d2a8e430a9
export default router