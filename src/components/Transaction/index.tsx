import { View, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/theme/colors"
import { fontFamily } from "@/theme/fontFamily"

type Props = {
  amount: number
  description: string
  date: string
}

export function Transaction({ amount, description, date }: Props) {
  const isInput = amount > 0

  return (
    <View style={{ width: "100%", flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <MaterialIcons
        name={isInput ? "north-east" : "south-west"}
        size={24}
        color={isInput ? colors.blue[500] : colors.red[400]}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontFamily: fontFamily.bold, color: colors.black }}>
          R$ {Math.abs(amount).toLocaleString("pt-BR")}
        </Text>
        <Text style={{ fontSize: 12, fontFamily: fontFamily.regular, color: colors.gray[500] }}>
          {date} • {description || "Sem descrição"}
        </Text>
      </View>
    </View>
  )
}