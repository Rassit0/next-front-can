import { Toast } from "@heroui/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem={false}
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <Toast.Provider placement="top end" />
      {children}
    </ThemeProvider>
  );
}
