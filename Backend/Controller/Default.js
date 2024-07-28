import Product from "../DB/Schemas/Products.js";
import Categories from "../DB/Schemas/Categories.js";
import User from "../DB/Schemas/User.js";
import UserOrder from "../DB/Schemas/UserOrder.js";

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

export {
  CreateUser,
  getCategories,
  getProducts,
  addCard,
  getOrders,
  deleteCartItem,
  getSelectedProducts,
};
