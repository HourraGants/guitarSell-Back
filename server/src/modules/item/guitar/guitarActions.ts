import type { RequestHandler } from "express";

// Import access to data
import guitarRepository from "./guitarRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const guitar = await guitarRepository.readAll();

    // Respond with the items in JSON format
    res.json(guitar);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const guitarId = Number(req.params.id);
    const guitar = await guitarRepository.read(guitarId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (guitar == null) {
      res.sendStatus(404);
    } else {
      res.json(guitar);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const guitarId = Number(req.params.id);

    const affectedRows = await guitarRepository.update(guitarId, req.body);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newGuitar = {
      idproduct: req.body.idproduct,
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      image: req.body.image,
      type: req.body.type,
    };

    // Create the item
    const insertId = await guitarRepository.create(newGuitar);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific category based on the provided ID
    const productId = Number(req.params.id);
    // const {productId, userId} = req.query

    await guitarRepository.delete(productId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
