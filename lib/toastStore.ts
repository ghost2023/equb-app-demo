import { create } from "zustand";
export type Toast = {
  id: string;
  message: string;
  messageType: "success" | "error" | "info" | "warning";
  status: "open" | "closed";
  timeout: number;
};

const useToastStore = create<{
  toasts: Toast[];
  add: (toast: {
    message: string;
    messageType: "success" | "error" | "info" | "warning";
    timeout?: number;
    id?: string;
  }) => string;
  remove: (id: string) => void;
  reset: () => void;
}>((set) => ({
  toasts: [],
  add: (toast) => {
    if (toast.id != undefined) {
      set((state) => {
        const id = toast.id!;
        const index = state.toasts.findIndex((m) => m.id === toast.id);
        if (index === -1)
          return {
            toasts: [
              ...state.toasts,
              { id, status: "open", timeout: 3000, ...toast },
            ],
          };

        return {
          toasts: state.toasts.map((m, i) =>
            i === index ? { ...m, status: "open", timeout: 3000, ...toast } : m,
          ),
        };
      });
      return toast.id;
    }
    const id = Math.round(Math.random() * Date.now()).toString(36);
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id, status: "open", timeout: 3000, ...toast },
      ],
    }));
    return id;
  },
  reset: () => {
    set({ toasts: [] });
  },
  remove: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((m) => m.id !== id),
    }));
  },
}));

export const toast = (
  message: string,
  messageType: "success" | "error" | "info" | "warning" = "success",
  opts?: Partial<Omit<Toast, "message" | "messageType">>,
) =>
  useToastStore.getState().add({
    message,
    messageType,
    ...opts,
  });

export const removeToast = (id: string) => useToastStore.getState().remove(id);
export const resetToast = () => useToastStore.getState().reset();

export default useToastStore;
