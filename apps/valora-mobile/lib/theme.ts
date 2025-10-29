import tokens from "@loud-legacy/shared-design-system/tokens.json";

const palette = tokens.colors;

export const valoraTheme = {
  colors: {
    background: palette.surface.base,
    surface: palette.surface.raised,
    border: palette.border.subtle,
    textPrimary: palette.text.primary,
    textSecondary: palette.text.secondary,
    accent: palette.accent["500"],
    primary: palette.brand["600"],
    primaryText: "#0c0d0f"
  },
  space: tokens.space
} as const;

export type ValoraTheme = typeof valoraTheme;
