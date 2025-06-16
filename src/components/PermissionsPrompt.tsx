import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissionStore } from '../contexts/usePermissionStore';

export default function PermissionsPrompt() {
  const { setShown } = usePermissionStore();
  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);

  const requestPermissions = () => {
    setRequesting(true);
    Notification.requestPermission().finally(() => {
      navigator.geolocation.getCurrentPosition(
        () => {
          setShown(true);
          navigate('/home');
        },
        () => {
          setShown(true);
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
      <button
        onClick={requestPermissions}
        disabled={requesting}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {requesting ? 'Requesting...' : 'Allow'}
      </button>
    </div>
  );
}
