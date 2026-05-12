import { useSQLiteContext } from "expo-sqlite";

export type TargetDatabase = {
  id: number;
  name: string;
  amount: number;
  accumulated: number;
};

export function useTargetDatabase() {
  const database = useSQLiteContext();

  async function create(data: { name: string; amount: number }) {
    const query = "INSERT INTO targets (name, amount) VALUES (?, ?)"; 
    await database.runAsync(query, [data.name, data.amount]); 
  }

  async function list() {
    const query = `
      SELECT t.id, t.name, t.amount, COALESCE(SUM(tr.amount), 0) AS accumulated
      FROM targets t
      LEFT JOIN transactions tr ON tr.target_id = t.id
      GROUP BY t.id;
    `; 
    return await database.getAllAsync<TargetDatabase>(query);
  }

  async function show(id: number) {
    const query = `
      SELECT t.*, COALESCE(SUM(tr.amount), 0) AS accumulated
      FROM targets t
      LEFT JOIN transactions tr ON tr.target_id = t.id
      WHERE t.id = ?
      GROUP BY t.id;
    `; 
    return await database.getFirstAsync<TargetDatabase>(query, [id]);
  }

  async function remove(id: number) {
    await database.execAsync(`DELETE FROM targets WHERE id = ${id}`); 
  }

  return { create, list, show, remove };
}