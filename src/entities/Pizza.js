import { db } from '../config/database.js';
import { fail } from '../validation.js';

export function findAll() {
  return db.prepare('SELECT * FROM pizzas ORDER BY id').all();
}

export function findById(id) {
    return db.prepare('Select * FROM pizzas WHERE id = ?').get(id);
}

export function create(data) {
  const result = db.prepare(' INSERT INTO pizzas (name, description, price) VALUES (?, ?, ?)').run(data.name, data.description, data.price);
  return findById(result.lastInsertRowid);
}

export function update(id, data) {
  const result = db.prepare( ' UPDATE pizzas SET name = ?, description = ?, price = ? WHERE id = ?').run(data.name, data.description, data.price, id);
  if (result.changes === 0) {
    return undefined;
  }
  return findById(id);
}

export function remove(id) {
  fail(501, 'TODO : DELETE paramétré');
}
