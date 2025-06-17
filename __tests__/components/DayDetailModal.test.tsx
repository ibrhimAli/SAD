import { fireEvent, render } from '@testing-library/react-native';
import DayDetailModal from '@/components/DayDetailModal';
import { saveMoodEntry } from '@/hooks/useMoodStorage';
import type { MoodEntry } from '@/constants/moods';

jest.mock('@/hooks/useMoodStorage', () => ({
  saveMoodEntry: jest.fn(),
}));

describe('DayDetailModal', () => {
  it('calls onDismiss and saves entry when dismissing', () => {
    const entry: MoodEntry = { date: '2024-03-03', level: 4, notes: 'nice' };
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <DayDetailModal visible entry={entry} onDismiss={onDismiss} />
    );

    fireEvent.press(getByTestId('dismiss-button'));

    expect(saveMoodEntry).toHaveBeenCalledWith(entry);
    expect(onDismiss).toHaveBeenCalled();
  });

  it('does not try to save when entry is null', () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <DayDetailModal visible entry={null} onDismiss={onDismiss} />
    );

    fireEvent.press(getByTestId('dismiss-button'));

    expect(saveMoodEntry).not.toHaveBeenCalled();
    expect(onDismiss).toHaveBeenCalled();
  });
});
