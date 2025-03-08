import { Modal } from "@/components/ui/Modal";
import { ToastComponent } from "@/components/ui/Toast";
import useModalStore from "@/lib/modalStore";
import useToastStore from "@/lib/toastStore";
import React, { useState } from "react";
import { View } from "react-native";

type PortalProviderProps = {
  children: React.ReactNode;
};

type Element = {
  name: string;
  component: React.ReactNode;
};

export const PortalContext = React.createContext({
  addComponent: (_: Element) => { },
  removeComponent: (_: string) => { },
});

const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
  const toastStore = useToastStore();
  const modalStore = useModalStore();
  const [components, setComponents] = useState<Record<string, React.ReactNode>>(
    {},
  );
  const addComponent = ({ name, component }: Element) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [name]: component,
    }));
  };
  const removeComponent = (name: string) => {
    setComponents((prevComponents) => {
      const newComponents = { ...prevComponents };
      delete newComponents[name];
      return newComponents;
    });
  };
  return (
    <PortalContext.Provider value={{ addComponent, removeComponent }}>
      <React.Fragment>{children}</React.Fragment>
      <React.Fragment>
        {Object.entries(components).map(([_, Component]) => Component)}
      </React.Fragment>
      <React.Fragment>
        <View
          style={{
            gap: 6,
            alignItems: "center",
            position: "absolute",
            top: 90,
            left: 0,
            right: 0,
            maxHeight: 120,
            zIndex: 100,
          }}
        >
          {toastStore.toasts.map((toast) => (
            <ToastComponent key={toast.id} toast={toast} />
          ))}
        </View>
      </React.Fragment>
      <React.Fragment>
        {modalStore.modals.map((modal) => (
          <Modal key={modal.id} modal={modal} />
        ))}
      </React.Fragment>
    </PortalContext.Provider>
  );
};

export default PortalProvider;
