import { View, Text } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Props = {
  percentage: number
}

export function Progress({ percentage }: Props) {
  const safePercentage = Math.max(0, Math.min(percentage, 100))

  return (
    <View style={{ width: '100%', gap: 8 }}>
      <View style={{ 
        width: '100%', 
        height: 10, 
        backgroundColor: colors.gray[100], 
        borderRadius: 999,
        overflow: 'hidden' 
      }}>
        <View
          style={{
            height: 10,
            width: `${safePercentage}%`,
            backgroundColor: colors.blue[500],
            borderRadius: 999,
          }}
        />
      </View>
      
      <Text style={{ 
        fontFamily: fontFamily.medium, 
        fontSize: 12, 
        color: colors.gray[500],
        textAlign: 'right' 
      }}>
        {safePercentage.toFixed(0)}%
      </Text>
    </View>
  )
}