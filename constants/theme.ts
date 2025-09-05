// constants/theme.ts

// Define theme interface for type safety
interface ThemeColors {
    brand: string;
    bg: string;
    text: string;
    subText: string;
    fieldBg: string;
    fieldBorder: string;
    divider: string;
    btnBg: string;
    outline: string;
    appleLogo: string;
    tabBg: string;
    tabIconColor: string;
    activeTabColor: string;
}

// Create theme object with proper typing
const theme = {
    light: {
        brand: "#004aa9",
        bg: "#ffffff",
        dashboardbg: "#ffffff",
        text: "#111827",
        subText: "#6b7280",
        fieldBg: "#f3f4f6",
        fieldBorder: "#e5e7eb",
        divider: "#e5e7eb",
        btnBg: "#004aa9",
        outline: "#004aa9",
        appleLogo: "#5b5b5b",
        tabBg: "#ededed",
        tabIconColor: "#6b7280",
        activeTabColor: "#004aa9",
        skeletonHighlight: '#ffffff30',
        isFocusedIcon: '#ff5821'
    } as const,

    dark: {
        brand: "#004aa9",
        bg: "#000017",
        dashboardbg: "#1e2f40",
        text: "#ffffff",
        subText: "#cbd5e1",
        fieldBg: "#1f2937",
        fieldBorder: "#374151",
        divider: "#334155",
        btnBg: "#1E40AF",
        outline: "#60A5FA",
        appleLogo: "#f3f4f6",
        tabBg: "#18202c",
        tabIconColor: "#9ca3af",
        activeTabColor: "#60A5FA",
        skeletonHighlight: '#ffffff30',
        isFocusedIcon: '#ff5821'
    } as const,
} as const;

// Type inference for theme
type ThemeMode = keyof typeof theme;
type ThemeValues = typeof theme[ThemeMode];

// Export the theme with proper types
export { theme };
export type { ThemeColors, ThemeMode, ThemeValues };

