import Product from "../DB/Schemas/Products.js";
import Categories from "../DB/Schemas/Categories.js";
import CheckOut from "../DB/Schemas/Checkout.js";
import User from "../DB/Schemas/User.js";
import UserOrder from "../DB/Schemas/UserOrder.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY);

const CreateUser = async (req, res, next) => {
  const { ID, username } = req.body;
  try {
    const existsUser = await User.findOne({ clerkID: ID });
    if (!existsUser) {
      const create = await User.create({
        clerkID: ID,
        username,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find().select({
      categoryName: 1,
      categoryImage: 1,
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const product = await Product.find()
      .populate({
        path: "category",
        select: { categoryName: 1, _id: 0 },
        model: Categories,
      })
      .limit(10);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const addCard = async (req, res, next) => {
  const data = req.body;
  try {
    const findProduct = await UserOrder.findOne({
      product: data.product,
      userID: data.userID,
    });
    if (findProduct) {
      findProduct.quantity = data.quantity;
      findProduct.amount = data.amount;
      await findProduct.save();
      res.json({
        message: "item updated successfully",
      });
    } else {
      const add = await UserOrder.create(data);
      res.json({
        message: "item added successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orders = await UserOrder.find({ userID: id }).populate({
      path: "product",
      select: { productName: 1, productImage: 1 },
      model: Product,
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await UserOrder.findByIdAndDelete(id);
    res.json({ message: "item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getSelectedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const get = await Categories.findOne({ categoryName: id }).populate({
      path: "products",
      model: Product,
    });
    res.json(get);
  } catch (error) {
    next(error);
  }
};

const Checkout = async (req, res, next) => {
  const { userID, data } = req.body;
  try {
    const line_items = data.map((items) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: items.product.productName,
            images: [items.product.productImage],
          },
          unit_amount: Math.round(items.amount) * 100,
        },
        quantity: items.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://google.com/",
      cancel_url: "https://yahoo.com/",
    });
    const createCheckout = await CheckOut.create({
      userID,
      stripeID: session.id,
      products: data,
    });
    const removeCard = await UserOrder.deleteMany({ userID: userID });

    res.json({ sessionID: session.id });
  } catch (error) {
    next(error);
  }
};

export {
  CreateUser,
  getCategories,
  getProducts,
  addCard,
  getOrders,
  deleteCartItem,
  getSelectedProducts,
  Checkout,
};
