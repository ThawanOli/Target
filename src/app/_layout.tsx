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
      databaseName="target_v3.db" 
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS targets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            totalValue REAL NOT NULL,
            currentValue REAL DEFAULT 0
          );
        `);

        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            target_id INTEGER NOT NULL,
            amount REAL NOT NULL,
            description TEXT,
            created_at INTEGER NOT NULL,
            FOREIGN KEY (target_id) REFERENCES targets (id) ON DELETE CASCADE
          );
        `);
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