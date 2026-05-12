import { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { router } from 'expo-router'
import { Input } from '@/components/Input'
import { CurrencyInput } from '@/components/CurrencyInput'
import { Button } from '@/components/Button'
import { colors } from '@/theme/colors'
import { useTargetDatabase } from '@/database/useTargetDatabase'

export default function Target() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState<number | null>(0)
  const [isLoading, setIsLoading] = useState(false)
  const targetDatabase = useTargetDatabase()

  async function handleSave() {
    try {
      if (!name.trim() || !amount || amount <= 0) {
        return Alert.alert("Atenção", "Preencha o nome e um valor válido para a meta.")
      }
      setIsLoading(true)

      await targetDatabase.create({
        name: name,
        amount: amount
      })

      Alert.alert("Sucesso", "Meta cadastrada com sucesso!")
      router.back()
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível salvar a meta.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, padding: 24, gap: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 32 }}>
        Criar nova meta
      </Text>

      <Input 
        label="Nome da meta" 
        placeholder="Ex: Viagem para o Japão" 
        onChangeText={setName} 
      />
      
      <CurrencyInput 
        label="Valor Alvo" 
        value={amount}
        onChangeValue={setAmount}
      />

      <Button 
        title="Salvar" 
        isLoading={isLoading} 
        onPress={handleSave} 
      />
    </View>
  )
}