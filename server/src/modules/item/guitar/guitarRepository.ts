import databaseClient from "../../../../database/client";

import type { Result, Rows } from "../../../../database/client";

type Guitar = {
  idproduct: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  type: string;
};

class GuitarRepository {
  // The C of CRUD - Create operation

  async createWithCategories(
    guitar: Omit<Guitar, "idproduct">,
    categoryIds: number[],
  ) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into product (name, brand, price, image, type) values (?, ?, ?, ?, ?)",
      [guitar.name, guitar.brand, guitar.price, guitar.image, guitar.type],
    );

    const insertId = result.insertId;

    for (const categoryId of categoryIds) {
      await databaseClient.query<Result>(
        "INSERT INTO product_category (idproduct, idcategory) VALUES (?, ?)",
        [insertId, categoryId],
      );
    }

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readWithCategories(idproduct: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select p.*, GROUP_CONCAT(c.name) AS categories FROM product p LEFT JOIN product_category pc ON p.idproduct = pc.idproduct LEFT JOIN category c ON pc.idcategory = c.idcategory WHERE p.idproduct = ? GROUP BY p.idproduct",
      [idproduct],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Guitar;
  }

  async readAllWithCategories() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT p.*, GROUP_CONCAT(c.name) AS categories FROM product p LEFT JOIN product_category pc ON p.idproduct = pc.idproduct LEFT JOIN category c ON pc.idcategory = c.idcategory GROUP BY p.idproduct",
    );

    // Return the array of items
    return rows as Guitar[];
  }

  async updateWithCategories(
    idproduct: number,
    guitar: Partial<Guitar>,
    categoryIds: number[],
  ) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update product set name = ?, brand = ?, price = ?, image = ?, type = ? where idproduct = ?",
      [
        guitar.name,
        guitar.brand,
        guitar.price,
        guitar.image,
        guitar.type,
        idproduct,
      ],
    );

    await databaseClient.query<Result>(
      "DELETE FROM product_category WHERE idproduct = ?",
      [idproduct],
    );

    for (const categoryId of categoryIds) {
      await databaseClient.query<Result>(
        "INSERT INTO product_category (idproduct, idcategory) VALUES (?, ?)",
        [idproduct, categoryId],
      );
    }

    // Return how many rows were affected
    return result.affectedRows;
  }

  async delete(idproduct: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from product where idproduct = ?",
      [idproduct],
    );
    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new GuitarRepository();
