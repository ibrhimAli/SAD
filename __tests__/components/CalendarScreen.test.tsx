import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CalendarScreen from '../../app/(tabs)/calendar';
import { loadMoodEntries } from '@/hooks/useMoodStorage';
import { moodEntries } from '@/constants/moods';

jest.mock('@/hooks/useMoodStorage', () => ({
  loadMoodEntries: jest.fn(),
  saveMoodEntries: jest.fn(),
}));

describe('CalendarScreen', () => {
  it('opens modal when a marked day is pressed', async () => {
    (loadMoodEntries as jest.Mock).mockResolvedValue(moodEntries);

    const { getByTestId, queryByTestId } = render(<CalendarScreen />);

    await waitFor(() => {
      expect(getByTestId('calendar.day_' + moodEntries[0].date)).toBeTruthy();
    });

    fireEvent.press(getByTestId('calendar.day_' + moodEntries[0].date));

    await waitFor(() => {
      expect(queryByTestId('day-detail-modal')).toBeTruthy();
    });
  });
});
