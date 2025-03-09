import React, { ReactNode } from "react";
import PortalProviders from "./PortalProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./AuthProviders";

type Props = {
  children: ReactNode | ReactNode[];
};
export const Providers = ({ children }: Props) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReactQueryProvider>
        <AuthProvider>
          <PortalProviders>{children}</PortalProviders>
        </AuthProvider>
      </ReactQueryProvider>
    </GestureHandlerRootView>
  );
};
