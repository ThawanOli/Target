import { Pressable, PressableProps, Text, View } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'
import { Progress } from '@/components/Progress'

export type TargetCardProps = {
  id: string
  title: string
  currentValue: number
  totalValue: number
}

type Props = PressableProps & {
  data: TargetCardProps
}

export function TargetCard({ data, ...rest }: Props) {
  const percentage = (data.currentValue / data.totalValue) * 100

  return (
    <Pressable
      style={{
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        gap: 16,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3, 
        marginBottom: 16
      }}
      {...rest}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontFamily: fontFamily.bold, color: colors.black }}>
          {data.title}
        </Text>
        <Text style={{ fontSize: 14, fontFamily: fontFamily.medium, color: colors.blue[500] }}>
          R$ {data.totalValue.toLocaleString('pt-BR')}
        </Text>
      </View>

      <Progress percentage={percentage} />

      <Text style={{ fontSize: 12, fontFamily: fontFamily.regular, color: colors.gray[500] }}>
        Faltam R$ {(data.totalValue - data.currentValue).toLocaleString('pt-BR')}
      </Text>
    </Pressable>
  )
}