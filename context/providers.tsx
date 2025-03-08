import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import PortalProviders from "./PortalProvider";
import { TRPCProvider } from "./TrpcProvider";

type Props = {
  children: ReactNode | ReactNode[];
};
export const Providers = ({ children }: Props) => {
  return (
    <TRPCProvider>
      <AuthProvider>
        <PortalProviders>{children}</PortalProviders>
      </AuthProvider>
    </TRPCProvider>
  );
};
