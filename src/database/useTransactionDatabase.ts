import { useSQLiteContext } from "expo-sqlite"

export type TransactionDatabase = {
  id: number
  target_id: number
  amount: number
  created_at: number
  description: string
}

export function useTransactionDatabase() {
  const database = useSQLiteContext()

  async function findByTarget(targetId: number) {
    try {
      const query = "SELECT id, target_id, amount, description, created_at  FROM transactions WHERE target_id = ? ORDER BY created_at DESC"
      const response = await database.getAllAsync<TransactionDatabase>(query, [targetId])
      return response
    } catch (error) {
      throw error
    }
  }
  async function create(data: { targetId: number, amount: number, description: string }) {
    const query = "INSERT INTO transactions (target_id, amount, description, created_at) VALUES (?, ?, ?, ?)"
    await database.runAsync(query, [data.targetId, data.amount, data.description, Date.now()])
}

  return { findByTarget,create }
}