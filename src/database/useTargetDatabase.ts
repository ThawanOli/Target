import { useSQLiteContext } from "expo-sqlite"

export type TargetDatabase = {
  id: number
  title: string
  totalValue: number
  currentValue: number
}

export function useTargetDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<TargetDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO targets (title, totalValue, currentValue) VALUES ($title, $totalValue, $currentValue)"
    )

    try {
      const result = await statement.executeAsync({
        $title: data.title,
        $totalValue: data.totalValue,
        $currentValue: data.currentValue,
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()
      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function list() {
    try {
      const query = "SELECT * FROM targets"
      const response = await database.getAllAsync<TargetDatabase>(query)
      return response
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM targets WHERE id = ?"
      const response = await database.getFirstAsync<TargetDatabase>(query, [id])
      return response
    } catch (error) {
      throw error
    }
  }

  async function updateAmount(id: number, amount: number) {
    const statement = await database.prepareAsync(
      "UPDATE targets SET currentValue = currentValue + $amount WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $amount: amount,
        $id: id,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
  try {
    await database.execAsync(`DELETE FROM targets WHERE id = ${id}`)
  } catch (error) {
    throw error
  }
}

  return { create, list, show, updateAmount, remove }
}
