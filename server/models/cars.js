const { db, DataTypes } = require("../db")

const CarsStores = db.define(
	"CarsStores",
	{
		cid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		make: {
			type: DataTypes.STRING,
			allowNull: false
		},
		model: {
			type: DataTypes.STRING,
			allowNull: false
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1900
			}
		},
		mileage: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 0
			}
		},
		transmission: {
			type: DataTypes.ENUM("M", "A", "DC", "CVT"),

			allowNull: false
		},
		drivetrain: {
			type: DataTypes.ENUM("FWD", "RWD", "AWD", "4WD"),

			allowNull: false,
		},
		color: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 0,
			}
		}
	},
	{
		timestamps: true
	}
)

module.exports = { CarsStores }