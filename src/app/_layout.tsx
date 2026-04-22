import { Stack } from 'expo-router';
import { SQLiteProvider } from "expo-sqlite"
import { colors } from '@/theme/colors';
import { Loading } from '@/components/Loading';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SQLiteProvider 
      databaseName="target.db" 
      onInit={(db) => {
        return db.execAsync(`
          CREATE TABLE IF NOT EXISTS targets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            totalValue REAL NOT NULL,
            currentValue REAL DEFAULT 0
          );
        `)
      }}
    >
    <Stack 
      screenOptions={{ 
        headerShown: false, 
        contentStyle: { backgroundColor: colors.white } 
      }} 
    />
    </SQLiteProvider>
  );
}