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

  async create(guitar: Omit<Guitar, "idproduct">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into product (name, brand, price, image, type) values (?, ?, ?, ?, ?)",
      [guitar.name, guitar.brand, guitar.price, guitar.image, guitar.type],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(idproduct: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from product where idproduct = ?",
      [idproduct],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Guitar;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from product");

    // Return the array of items
    return rows as Guitar[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new GuitarRepository();
