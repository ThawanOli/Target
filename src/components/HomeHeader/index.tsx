import { LinearGradient } from 'expo-linear-gradient'
import { Text, View } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'
import { Separator } from '@/components/Separator'
import { Summary } from '@/components/Summary'

export function HomeHeader() {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={{ paddingTop: 56, paddingHorizontal: 24, paddingBottom: 24 }}
    >
      <Text style={{ color: colors.white, fontSize: 14, fontFamily: fontFamily.regular }}>
        Total que você possui
      </Text>
      <Text style={{ color: colors.white, fontSize: 32, fontFamily: fontFamily.bold, marginTop: 10 }}>
        R$ 2.680,00
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
        <Summary 
          data={{ label: 'Entradas', value: 'R$ 6.184,90' }} 
          icon={{ name: 'arrow-upward', color: colors.green[500] }} 
        />
        
        <Separator color={colors.blue[400]} />

        <Summary 
          alignRight
          data={{ label: 'Saídas', value: '-R$ 883,65' }} 
          icon={{ name: 'arrow-downward', color: colors.red[400] }} 
        />
      </View>
    </LinearGradient>
  )
}