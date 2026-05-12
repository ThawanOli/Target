import { useSQLiteContext } from "expo-sqlite"

export function useTransactionDatabase() {
  const database = useSQLiteContext()

  async function create(data: { targetId: number, amount: number, observation: string }) {
    const query = "INSERT INTO transactions (target_id, amount, observation, created_at) VALUES (?, ?, ?, ?)"
    await database.runAsync(query, [data.targetId, data.amount, data.observation, Date.now()])
  }

  async function findByTarget(targetId: number) {
    const query = "SELECT * FROM transactions WHERE target_id = ? ORDER BY created_at DESC"
    return await database.getAllAsync<any>(query, [targetId])
  }

  return { create, findByTarget }
}