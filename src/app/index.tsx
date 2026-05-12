import { useEffect, useState, useCallback } from 'react'
import { ScrollView, View, Text, Alert } from 'react-native'
import { router, useFocusEffect } from 'expo-router'
import { HomeHeader } from '@/components/HomeHeader'
import { Button } from '@/components/Button'
import { TargetCard, TargetCardProps } from '@/components/TargetCard'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'
import { useTargetDatabase, TargetDatabase } from '@/database/useTargetDatabase'

export default function Index() {
  const [targets, setTargets] = useState<TargetDatabase[]>([])
  const targetDatabase = useTargetDatabase()

  async function fetchTargets() {
    try {
      const response = await targetDatabase.list()
      setTargets(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar as metas.")
    }
  }

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const data = await targetDatabase.list()
        setTargets(data)
      }
      loadData()
    }, [])
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray[100] }}>
      <HomeHeader />
      
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 18, fontFamily: fontFamily.bold, marginBottom: 16 }}>
          Minhas Metas ({targets.length})
        </Text>

       {targets.map((item) => (
        <TargetCard 
          key={item.id}
          data={{
            id: String(item.id),
            title: item.name,
            currentValue: item.accumulated, 
            totalValue: item.amount     
          }} 
          onPress={() => router.navigate(`/in-progress/${item.id}`)}
        />
      ))}

        {targets.length === 0 && (
          <Text style={{ color: colors.gray[500], textAlign: 'center', marginTop: 50 }}>
            Nenhuma meta cadastrada. Comece agora!
          </Text>
        )}
      </ScrollView>

      <View style={{ padding: 24, backgroundColor: colors.white }}>
        <Button title="Nova meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  )
}