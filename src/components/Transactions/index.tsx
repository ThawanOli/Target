import { FlatList, Text, View } from "react-native"
import { Transaction } from "@/components/Transaction"
import { TransactionDatabase } from "@/database/useTransactionDatabase"

type Props = {
  data: TransactionDatabase[]
}

export function Transactions({ data }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Transaction
          amount={item.amount}
          description={item.description}
          date={new Date(item.created_at).toLocaleDateString('pt-BR')}
        />
      )}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Text style={{ color: "#8D8D99", fontSize: 14 }}>Nenhuma transação registrada.</Text>
      )}
    />
  )
}