import { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { TransactionType } from '@/components/TransactionType' 
import { CurrencyInput } from '@/components/CurrencyInput'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useTransactionDatabase } from '@/database/useTransactionDatabase'

export default function Transaction() {
  const { id } = useLocalSearchParams()
  const [type, setType] = useState<'input' | 'output'>('input')
  const [value, setValue] = useState<number | null>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState("")
  
  const transactionsDatabase = useTransactionDatabase()

  async function handleSave() {
    try {
      if (!value || value <= 0) {
        return Alert.alert("Atenção", "Digite um valor válido para a transação.")
      }

      setIsLoading(true)

      const finalAmount = type === 'input' ? value : -value
      
      await transactionsDatabase.create({
        targetId: Number(id),
        amount: finalAmount,
        observation: description, 
      })
      
      Alert.alert("Sucesso", "Transação realizada com sucesso!")
      router.back()
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível registrar a transação.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 24, backgroundColor: '#FFF' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 32 }}>Nova transação</Text>
    
      <View style={{ paddingVertical: 10 }}>
        <TransactionType selected={type} onChange={setType} />
      </View>
      
      <CurrencyInput label="Valor (R$)" value={value} onChangeValue={setValue} />

      <Input 
        label="Motivo (opcional)"
        placeholder="Ex: Investir em CDB de 110%..." 
        onChangeText={setDescription} 
        value={description} 
      />

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button 
          title="Salvar" 
          onPress={handleSave} 
          isLoading={isLoading} 
        />
      </View>
    </View>
  )
}