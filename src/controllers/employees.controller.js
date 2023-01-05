import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    console.log("hola mundo");
    const [rows] = await pool.query("SELECT * FROM user");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { documentNumber } = req.params;
    const [rows] = await pool.query("SELECT * FROM user WHERE documentNumber = ?", [
      documentNumber,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { documentNumber } = req.params;
    const [rows] = await pool.query("DELETE FROM employee WHERE documentNumber = ?", [documentNumber]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { documentNumber, name, email, birthDate, phone } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO user (documentNumber, name, email, phone) VALUES (?, ?, ?, ?)",
      [documentNumber, name, email, phone]
    );
    res.status(201).json({ id: rows.id, documentNumber, name });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
