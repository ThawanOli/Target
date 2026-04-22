import { View, Pressable, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Props = {
  selected: 'input' | 'output'
  onChange: (type: 'input' | 'output') => void
}

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Pressable 
        onPress={() => onChange('input')}
        style={{ 
          flex: 1, 
          height: 56, 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          borderRadius: 12,
          backgroundColor: selected === 'input' ? colors.blue[500] : colors.white,
          borderWidth: 1,
          borderColor: selected === 'input' ? colors.blue[500] : colors.gray[400]
        }}
      >
        <MaterialIcons name="arrow-upward" size={18} color={selected === 'input' ? colors.white : colors.gray[500]} />
        <Text style={{ 
          fontFamily: fontFamily.medium, 
          color: selected === 'input' ? colors.white : colors.gray[500] 
        }}>
          Guardar
        </Text>
      </Pressable>

      {/* Botão Resgatar */}
      <Pressable 
        onPress={() => onChange('output')}
        style={{ 
          flex: 1, 
          height: 56, 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          borderRadius: 12,
          backgroundColor: selected === 'output' ? colors.red[400] : colors.white,
          borderWidth: 1,
          borderColor: selected === 'output' ? colors.red[400] : colors.gray[400]
        }}
      >
        <MaterialIcons name="arrow-downward" size={18} color={selected === 'output' ? colors.white : colors.gray[500]} />
        <Text style={{ 
          fontFamily: fontFamily.medium, 
          color: selected === 'output' ? colors.white : colors.gray[500] 
        }}>
          Resgatar
        </Text>
      </Pressable>
    </View>
  )
}