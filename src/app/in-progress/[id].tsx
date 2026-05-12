import { useCallback, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router'
import { Button } from '@/components/Button'
import { Progress } from '@/components/Progress'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'
import { useTargetDatabase, TargetDatabase } from '@/database/useTargetDatabase'
import { useTransactionDatabase } from '@/database/useTransactionDatabase'   
import { Transactions } from "@/components/Transactions"

export default function Details() {
  const [data, setData] = useState<TargetDatabase | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  
  const { id } = useLocalSearchParams() 
  const database = useTargetDatabase()
  const transactionsDatabase = useTransactionDatabase()

  async function fetchDetails() {
    try {
      if (!id) return;

      const p1 = database.show(Number(id))
      const p2 = transactionsDatabase.findByTarget(Number(id))
      
      const [targetResponse, transactionsResponse] = await Promise.all([p1, p2])

      setData(targetResponse)
      setTransactions(transactionsResponse)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar os detalhes.")
    }
  }

  async function handleRemove() {
    Alert.alert("Remover", "Deseja realmente remover esta meta?", [
      { text: "Não", style: "cancel" },
      { 
        text: "Sim", 
        onPress: async () => {
          await database.remove(Number(id))
          router.navigate('/') 
        } 
      }
    ])
  }

  useFocusEffect(
    useCallback(() => {
      fetchDetails()
    }, [id])
  )

  if (!data) return null

  const percentage = data ? (data.accumulated / data.amount) * 100 : 0;
  return (
   <View style={{ flex: 1, backgroundColor: colors.white, padding: 24, gap: 32 }}>
    <View style={{ marginTop: 32 }}>
      <Text style={{ fontSize: 24, fontFamily: fontFamily.bold }}>{data.name}</Text>
      <Text style={{ fontSize: 16, color: colors.gray[500] }}>
        Alvo: R$ {data.amount.toLocaleString('pt-BR')}
      </Text>
    </View>

      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 32, fontFamily: fontFamily.bold, color: colors.blue[500] }}>
          R$ {data.accumulated.toLocaleString('pt-BR')}
        </Text>
        <Progress percentage={percentage} />
      </View>

      <Transactions data={transactions} />

      <View style={{ flex: 1, justifyContent: 'flex-end', gap: 16 }}>
        <Button 
          title="Nova transação" 
          onPress={() => router.navigate(`/transaction/${id}`)} 
        />

        <Button 
          title="Voltar" 
          onPress={() => router.back()} 
          style={{ 
            height: 56, 
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.gray[600], 
            borderWidth: 1, 
            borderRadius: 12,
            borderColor: colors.gray[400],
          }} 
        />

        <Button 
          title="Remover Meta" 
          onPress={handleRemove} 
          style={{ 
            height: 56, 
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            backgroundColor: colors.red[400] 
          }} 
        />
      </View>
    </View>
  )
}