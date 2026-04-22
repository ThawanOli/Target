import { ActivityIndicator, View } from 'react-native';
import { colors } from '@/theme/colors';

export function Loading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.gray[100] }}>
      <ActivityIndicator size="large" color={colors.blue[500]} />
    </View>
  );
}