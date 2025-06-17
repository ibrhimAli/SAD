import React from 'react';

const tips: string[] = [
  'Take a short walk outside.',
  'Write down something you\'re grateful for.',
  'Practice deep breathing for one minute.',
  'Reach out to a friend or family member.',
  'Take a moment to stretch.',
];

export default function ContentFeed() {
  return (
    <div className="h-48 overflow-y-auto scroll-smooth space-y-2 p-2 border rounded">
      {tips.map((tip, index) => (
        <div
          key={index}
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
        >
          {tip}
        </div>
      ))}
    </div>
  );
}

