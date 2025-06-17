import { useState } from 'react';
import { useCheckInStore } from '../contexts/useCheckInStore';
import { useNavigate } from 'react-router-dom';
import { usePermissionStore } from '../contexts/usePermissionStore';

export default function PermissionsPrompt() {
  const { setShown } = usePermissionStore();
  const { setLastPrompt } = useCheckInStore();
  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);

  const notificationsSupported =
    typeof window !== 'undefined' && 'Notification' in window;
  const geolocationSupported =
    typeof navigator !== 'undefined' && 'geolocation' in navigator;

  const requestPermissions = () => {
    if (!notificationsSupported || !geolocationSupported) {
      return;
    }

    setRequesting(true);
    Notification.requestPermission().finally(() => {
      navigator.geolocation.getCurrentPosition(
        () => {
          setShown(true);
          setLastPrompt(Date.now());
          navigate('/home');
        },
        () => {
          setShown(true);
          setLastPrompt(Date.now());
          navigate('/home');
        }
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">Enable Permissions</h1>
      <p className="mb-4">
        We use notifications and your location to enhance your experience.
      </p>
      {!notificationsSupported && (
        <p className="mb-2 text-yellow">
          Notifications are not supported by your browser.
        </p>
      )}
      {!geolocationSupported && (
        <p className="mb-2 text-yellow">
          Geolocation is not supported by your browser.
        </p>
      )}
      <button
        onClick={requestPermissions}
        disabled={
          requesting || !notificationsSupported || !geolocationSupported
        }
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {requesting ? 'Requesting...' : 'Allow'}
      </button>
    </div>
  );
}
