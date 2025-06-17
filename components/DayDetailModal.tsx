import { useEffect, useCallback } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import type { MoodEntry } from '@/constants/moods';
import { saveMoodEntry } from '@/hooks/useMoodStorage';

export type DayDetailModalProps = {
  visible: boolean;
  entry: MoodEntry | null;
  onDismiss: () => void;
};

export default function DayDetailModal({ visible, entry, onDismiss }: DayDetailModalProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const translateY = useSharedValue(0);

  const handleDismiss = useCallback(() => {
    if (entry) {
      saveMoodEntry(entry);
    }
    onDismiss();
  }, [entry, onDismiss]);

  useEffect(() => {
    if (visible) {
      translateY.value = 0;
    }
  }, [visible, translateY]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 100) {
        translateY.value = withTiming(400, { duration: 150 }, () => runOnJS(handleDismiss)());
      } else {
        translateY.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleDismiss}>
      <View style={styles.overlay} testID="day-detail-overlay">
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.container, { backgroundColor }, animatedStyle]}
            testID="day-detail-modal">
            <Pressable
              onPress={handleDismiss}
              style={styles.dismiss}
              hitSlop={8}
              testID="dismiss-button">
              <ThemedText type="link">Dismiss</ThemedText>
            </Pressable>
            {entry && (
              <>
                <ThemedText type="title">{entry.date}</ThemedText>
                <ThemedText style={styles.spacer}>Mood Level: {entry.level}</ThemedText>
                <ThemedText>{entry.notes}</ThemedText>
              </>
            )}
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 24,
  },
  container: {
    borderRadius: 12,
    padding: 16,
  },
  dismiss: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  spacer: {
    marginVertical: 8,
  },
});
