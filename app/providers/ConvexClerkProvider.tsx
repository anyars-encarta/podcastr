"use client";
import { ReactNode } from "react";
// import { ConvexProvider, ConvexReactClient } from "convex/react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export default function ConvexClientProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return <ConvexProvider client={convex}>{children}</ConvexProvider>;
// }

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string} appearance={{
    layout: {
      socialButtonsVariant: 'iconButton',
      logoImageUrl: '/icons/auth-logo.svg'
    },
    variables: {
      colorBackground: '#15171C',
      colorPrimary: '',
      colorText: 'white',
      colorInputBackground: '#1B1F29',
      colorInputText: 'white',
    }
  }}>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export default ConvexClerkProvider;