const express = require("express"),
	router = express.Router();
const Category = require("../controllers/Category_controller");

router.post("/addCategory", Category.AddCategory);
router.get("/getCategory", Category.GetCategory);
router.delete("/deleteCategory/:id", Category.DeleteById);
router.put("/Category/:id", Category.UpdateCategory);

module.exports = router;
