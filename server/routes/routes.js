const router = require("express").Router();
const { getAll, getFilter, createCar, updateCar, deleteCar } = require("../controllers/routes");

router.get('/test', (req, res) => {
    res.status(200).json({
        'status': 'ok',
        'message': '/test route hit'
    })
})

// GET /all
router.get("/all", getAll);
// GET /filter
router.get("/filter", getFilter);
// POST /create
router.post("/create", createCar);
// PUT /:id
router.put("/:cid", updateCar);
// DELETE /:id
router.delete("/:cid", deleteCar);

module.exports = router;
