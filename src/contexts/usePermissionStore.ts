import { create } from 'zustand';

interface PermissionState {
  shown: boolean;
  setShown: (val: boolean) => void;
}

const initialShown = localStorage.getItem('permissionsPromptShown') === 'true';

export const usePermissionStore = create<PermissionState>((set) => ({
  shown: initialShown,
  setShown: (val) => {
    localStorage.setItem('permissionsPromptShown', String(val));
    set({ shown: val });
  },
}));
