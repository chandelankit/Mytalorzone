const fs = require("fs");
const path = require("path");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");
const customizeModel = require("../models/customize");

class Customize {
  async getImages(req, res) {
    try {
      const images = await customizeModel.find({});
      return res.json({ images });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching images" });
    }
  }

  async uploadSlideImage(req, res) {
    const image = req.file?.filename;
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    try {
      const newCustomize = new customizeModel({ slideImage: image });
      await newCustomize.save();
      return res.json({ success: "Image uploaded successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error uploading image" });
    }
  }

  async deleteSlideImage(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      const imageToDelete = await customizeModel.findById(id);
      if (!imageToDelete) {
        return res.status(404).json({ error: "Image not found" });
      }

      const filePath = path.join(
        __dirname,
        "../public/uploads/customize",
        imageToDelete.slideImage
      );

      // Delete the document from the database
      await customizeModel.findByIdAndDelete(id);

      // Delete the file from the server
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err.message);
          return res
            .status(500)
            .json({ error: "File deletion failed, but record removed" });
        }
        return res.json({ success: "Image deleted successfully" });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting image" });
    }
  }

  async getAllData(req, res) {
    try {
      const [categories, products, orders, users] = await Promise.all([
        categoryModel.countDocuments(),
        productModel.countDocuments(),
        orderModel.countDocuments(),
        userModel.countDocuments(),
      ]);

      return res.json({ categories, products, orders, users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching data" });
    }
  }
}

const customizeController = new Customize();
module.exports = customizeController;
