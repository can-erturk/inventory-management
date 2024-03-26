import connectDB from '#config/mongodb/connectDB.js';
import Order from '#models/orderModel.js';
import Product from '#models/productModel.js';

export default async function moveOrder(access, orderID) {
  try {
    await connectDB();

    // Find order by uid from orders collection
    const order = await Order.findOne(
      { access, 'orders.id': orderID },
      { 'orders.$': 1 },
    );

    // Save the order to products collection
    const { name, category, inStock } = order.orders[0];

    // Find inventory by access from products collection
    const inventory = await Product.find({ access });

    // Find product by name and category from products collection
    const product = inventory[0].products.find(
      (item) => item.name === name && item.category === category,
    );

    // If product exist, update the quantity
    if (product) {
      const slicedQuantity = Number(inStock.slice(1));

      const updatedProduct = {
        id: orderID,
        name,
        category,
        inStock: inStock.startsWith('-')
          ? product.inStock - slicedQuantity
          : product.inStock + slicedQuantity,
        lastUpdate: new Date(),
      };

      // Create promises array
      const updatePromise = [];

      for (const [key, value] of Object.entries(updatedProduct)) {
        updatePromise.push(
          await Product.findOneAndUpdate(
            { access, 'products.name': name, 'products.category': category },
            { $set: { [`products.$.${key}`]: value } },
          ),
        );
      }

      await Promise.all(updatePromise);
    } else {
      // Create a new product if it doesn't exist
      const updatedProduct = {
        id: orderID,
        name,
        category,
        inStock: Number(inStock.slice(1)),
        lastUpdate: new Date(),
      };

      await Product.updateOne(
        { access },
        { $push: { products: updatedProduct } },
      );
    }

    // Delete the order from orders collection
    await Order.updateOne({ access }, { $pull: { orders: { id: orderID } } });
  } catch (error) {
    console.log(error);
  }
}
