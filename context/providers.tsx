import React, { ReactNode } from "react";
import PortalProviders from "./PortalProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  children: ReactNode | ReactNode[];
};
export const Providers = ({ children }: Props) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReactQueryProvider>
        <PortalProviders>{children}</PortalProviders>
      </ReactQueryProvider>
    </GestureHandlerRootView>
  );
};
