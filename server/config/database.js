const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

const Category = require("../models/Category");

const seedCategories = async () => {
	try {
		const count = await Category.countDocuments();
		if (count === 0) {
			await Category.insertMany([
				{
					name: "Web Development",
					description: "Learn modern full-stack web development with React, Node.js, and modern frameworks.",
				},
				{
					name: "Android Development",
					description: "Build robust Android applications from scratch with modern architecture.",
				},
				{
					name: "Python",
					description: "Master Python programming from fundamentals to advanced data structures and AI.",
				},
				{
					name: "DevOps",
					description: "Master containerization, CI/CD pipelines, Docker, Kubernetes, and cloud deployment.",
				},
			]);
			console.log("🌱 Default categories successfully seeded into the database.");
		}
	} catch (error) {
		console.log("Error seeding categories:", error.message);
	}
};

exports.connect = () => {
	if (!MONGODB_URL || MONGODB_URL.includes("<cluster>") || MONGODB_URL.includes("<user>")) {
		console.warn(
			"⚠️ WARNING: MONGODB_URL in server/.env has not been set yet. Please paste your MongoDB Atlas connection string into server/.env."
		);
		return;
	}
	mongoose
		.connect(MONGODB_URL)
		.then(async () => {
			console.log("DB Connection Success");
			await seedCategories();
		})
		.catch((err) => {
			console.log("DB Connection Failed");
			console.error(err.message);
		});
};
