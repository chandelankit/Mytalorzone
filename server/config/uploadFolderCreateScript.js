const fs = require("fs");
const path = require("path");

const uploadFolders = ["categories", "customize", "products"];

const CreateAllFolder = () => {
  const baseDir = path.join(__dirname, "../public/uploads");

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log("Base upload directory created:", baseDir);
  }

  uploadFolders.forEach((folder) => {
    const folderPath = path.join(baseDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Folder created: ${folderPath}`);
    }
  });
};

module.exports = CreateAllFolder;
