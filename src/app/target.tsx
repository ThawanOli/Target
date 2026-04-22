import { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { router } from 'expo-router'
import { Input } from '@/components/Input'
import { CurrencyInput } from '@/components/CurrencyInput'
import { Button } from '@/components/Button'
import { colors } from '@/theme/colors'
import { useTargetDatabase } from '@/database/useTargetDatabase'

export default function Target() {
  const [title, setTitle] = useState("")
  const [totalValue, setTotalValue] = useState<number | null>(0)
  const [isLoading, setIsLoading] = useState(false)
  const targetDatabase = useTargetDatabase()

  async function handleSave() {
    try {
      if (!title.trim() || !totalValue || totalValue <= 0) {
        return Alert.alert("Atenção", "Preencha o nome e um valor válido para a meta.")
      }

      setIsLoading(true)

      await targetDatabase.create({
        title,
        totalValue,
        currentValue: 0 
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
        onChangeText={setTitle}
      />
      
      <CurrencyInput 
        label="Valor alvo" 
        value={totalValue} 
        onChangeValue={setTotalValue} 
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