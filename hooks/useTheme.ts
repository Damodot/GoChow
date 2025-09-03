// hooks/useTheme.ts
import { useColorScheme } from "nativewind";
import { theme, ThemeMode, ThemeValues } from "../constants/theme";

// Custom hook to get theme colors based on current color scheme
export const useTheme = (): ThemeValues => {
  const { colorScheme } = useColorScheme();
  const mode = (colorScheme ?? "light") as ThemeMode;
  
  return theme[mode];
};

// Type guard to check if a value is a valid theme mode
export const isThemeMode = (value: string): value is ThemeMode => {
  return value === "light" || value === "dark";
};