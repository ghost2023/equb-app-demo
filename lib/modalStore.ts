import { BtnProps } from "@/components/ui/button";
import { create } from "zustand";

export type ModalType = {
  id: string;
  title?: string;
  message: string;
  messageType?: "success" | "error" | "info" | "warning";
  dismissable?: boolean;
  btnDirection?: "row" | "column";
  icon?: React.ReactNode;
  onAction?: (action: "close" | "confirm") => void;
  actions: (
    | {
        label: string;
        action: "close" | "confirm";
        props?: Omit<BtnProps, "label">;
      }
    | {
        button: React.ReactNode;
      }
  )[];
};

type ModalStore = {
  modals: ModalType[];
  add: (modal: Omit<ModalType, "id">) => void;
  remove: (id: string) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  add(modal) {
    const id = Math.round(Math.random() * Date.now()).toString(36);
    set((state) => ({
      modals: [
        ...state.modals,
        { id, status: "open", timeout: 3000, ...modal },
      ],
    }));
  },
  remove(id) {
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    }));
  },
}));

export const showModal = (options: Omit<ModalType, "id">) => {
  useModalStore.getState().add(options);
};

export default useModalStore;
