const { get } = require("../routes/auth");
const { CarsStores } = require("../models/cars");

async function getAll(req, res) {
	try {
		const allCars = await CarsStores.findAll();

		res.status(200).json(allCars)
	} catch (err) {
		res.status(500).json({ message: `${err}` });
	}
}

async function createCar(req, res) {
	try {
		console.log(req.body)
		const {
			make,
			model,
			year,
			mileage,
			transmission,
			drivetrain,
			color,
			price,
		} = req.body;

		if (
			!make ||
			!model ||
			!year ||
			!mileage ||
			!transmission ||
			!drivetrain ||
			!color ||
			!price
		) {
			// console.log(make, model, year, mileage, transmission, drivetrain, color, price);
			throw new Error("Please provide all necessary info")

		}

		const newCar = await CarsStores.create(req.body)
		console.log(newCar)

		res.status(201).json({
			message: "Car created",
			data: newCar
		})

	} catch (err) {
		console.error(err)
		res.status(500).json({ message: `${err}` });
	}
}

async function getFilter(req, res) {
	try {
		let { cid } = req.query;
		cid = parseInt(cid);

		const filterResults = await CarsStores.findAll({ where: cid })

		res.status(200).json(filterResults);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: `${err}` })
	}
}

async function updateCar(req, res) {
	try {
		// get id value for item we're trying to access from request
		const { cid } = req.params

		// console.log(cid);
		// pass the id to the database and find a row with it
		const foundCar = await CarsStores.findByPk(parseInt(cid));

		if (!foundCar) {
			throw new Error("Car not found")
		}

		// console.log(foundCar);

		// example of nullish coalescing operator
		// compares value against null or undefined
		// returns value that's NOT null or undefined
		// we will update only if left value (from request) exists
		const updatedData = {
			make: req.body.make ?? foundCar.make,
			model: req.body.model ?? foundCar.model,
			year: req.body.year ?? foundCar.year,
			mileage: req.body.mileage ?? foundCar.mileage,
			transmission: req.body.transmission ?? foundCar.transmission,
			drivetrain: req.body.drivetrain ?? foundCar.drivetrain,
			color: req.body.color ?? foundCar.color,
			price: req.body.price ?? foundCar.price
		}

		// // run update method on the instance with the updated data
		await foundCar.update(updatedData)

		res.status(200).json(foundCar)

	} catch (err) {
		console.error(err)
		res.status(500).json({ message: `${err}` })
	}
}

// ? Challenge: delete an entry from the database

async function deleteCar(req, res) {
	try {
		const { cid } = req.params

		const foundCar = await CarsStores.findByPk(parseInt(cid));

		if (!foundCar) {
			throw new Error("ID does not exist")
		}

		await foundCar.destroy()

		res.status(200).json({ message: "Car deleted" })

	} catch (err) {
		console.error(err)
		res.status(500).json({ message: `${err}` })
	}
}

module.exports = { getAll, getFilter, createCar, updateCar, deleteCar };
