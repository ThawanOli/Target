import { Stack } from 'expo-router';
import { SQLiteProvider } from "expo-sqlite"
import { Platform } from 'react-native';
import { colors } from '@/theme/colors';
import { Loading } from '@/components/Loading';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';
import { Suspense } from 'react';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  const renderContent = () => (
    <Stack 
      screenOptions={{ 
        headerShown: false, 
        contentStyle: { backgroundColor: colors.white } 
      }} 
    />
  );

  if (Platform.OS === 'web') {
    return (
      <Suspense fallback={<Loading />}>
        {renderContent()}
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider 
        databaseName="target_a.db"
        onInit={async (db) => {
          await db.execAsync(`PRAGMA foreign_keys = ON;`); 
          // await db.execAsync(`DROP TABLE IF EXISTS transactions;`);
          // await db.execAsync(`DROP TABLE IF EXISTS targets;`);

          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS targets (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              amount REAL NOT NULL
            );
          `); 

          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS transactions (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              target_id INTEGER NOT NULL,
              amount REAL NOT NULL,
              observation TEXT,
              created_at INTEGER NOT NULL,
              FOREIGN KEY (target_id) REFERENCES targets (id) ON DELETE CASCADE
            );
          `); 
        }}
      >
        {renderContent()}
      </SQLiteProvider>
    </Suspense>
  );
};