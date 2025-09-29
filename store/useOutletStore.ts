import * as React from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  // State
  outlet_id_active: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuthData: (data: { outlet_id_active: string }) => void;
  setActiveOutlet: (outletId: string) => void;
  clearAuth: () => void;

  // Getters
  getActiveOutletId: () => string | null;
}

// Create the store with proper TypeScript types
export const useOutletStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      outlet_id_active: null,
      isAuthenticated: false,

      // Actions
      setAuthData: (data) => {
        set({
          outlet_id_active: data.outlet_id_active,
          isAuthenticated: true,
        });
      },

      setActiveOutlet: (outletId) => {
        set({
          outlet_id_active: outletId,
        });
      },

      clearAuth: () => {
        set({
          outlet_id_active: null,
          isAuthenticated: false,
        });
      },

      // Getters
      getActiveOutletId: () => get().outlet_id_active,
    }),
    {
      name: "outlet-storage",
      // Only persist these fields
      partialize: (state) => ({
        outlet_id_active: state.outlet_id_active,
        isAuthenticated: state.isAuthenticated,
      }),
      // Skip hydration on the server
      skipHydration: true,
      // Use localStorage with proper SSR handling
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          if (typeof window === "undefined") return null;
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          if (typeof window !== "undefined") {
            localStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name) => {
          if (typeof window !== "undefined") {
            localStorage.removeItem(name);
          }
        },
      })),
    }
  )
);

// Export the store instance for direct access when needed
export const store = useOutletStore;

// Hook for active outlet
export const useActiveOutlet = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const outlet_id_active = useOutletStore((state) => state.outlet_id_active);
  const setActiveOutlet = useOutletStore((state) => state.setActiveOutlet);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null only on server-side or during initial client-side render
  return {
    outlet_id_active: isMounted ? outlet_id_active : null,
    setActiveOutlet,
  };
};

// Hook for authentication status
export const useAuthStatus = () => {
  return useOutletStore((state) => state.isAuthenticated);
};
