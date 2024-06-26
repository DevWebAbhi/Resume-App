const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");
const detailRouter = express.Router();
const multer = require("multer");
const userModel = require("../config/user.schema");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = './Resumes';
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + originalExtension);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF files are allowed.'));
    }
  },
}).single('PDF');

detailRouter.post('/upload', function (req, res) {
  upload(req, res, async function (err) {
    if (err) {
      res.status(500).send('Multer error: ' + err.message);
    } else {
      try {
        const password = req.body.password;
        
  
        const data = await userModel.create({ 
          name: req.body.name, 
          resume: `https://resume-app-526c.onrender.com/files/${req.file.filename}`,
          password: req.body.password 
        });

        res.status(200).send({ message: 'File uploaded successfully' });
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal server error" });
      }
    }
  });
});


detailRouter.delete('/:id', async function(req, res) {
  try {
    const id = req.params.id;
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    let filePath = user.resume.replace("https://resume-app-526c.onrender.com", ".");
    filePath = filePath.replace("files","Resumes");
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
    } else {
      console.log(`File not found at ${filePath}`);
    }

    await user.destroy();
    res.status(200).send({ message: 'User and associated file deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error" });
  }
});

detailRouter.get('/all', async function(req, res) {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;

  try {
    // Fetch users for the current page
    const users = await userModel.findAll({
      offset: skip,
      limit: parseInt(limit),
    });

    // Fetch total count of users
    const totalCount = await userModel.count();

    res.status(200).send({
      message: "done",
      data: users,
      pages: Math.ceil(totalCount / limit), // Calculate total pages
      totalCount: totalCount // Send total count of users
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error" });
  }
});


module.exports = detailRouter;
