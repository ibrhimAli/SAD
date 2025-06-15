import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  const getStarted = () => {
    console.log('Get Started pressed');
  };

  return (
    <ThemedView style={styles.container}>
      <Ionicons name="sunny" size={64} color={tint} style={styles.icon} />
      <ThemedText type="title" style={styles.title}>
        Seasonal Mood Tracker
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        and Light Therapy Companion
      </ThemedText>
      <Pressable style={[styles.button, { backgroundColor: tint }]} onPress={getStarted}>
        <ThemedText style={styles.buttonText}>Get Started</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    alignItems: 'center',
    gap: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
