import tokensJson from "@loud-legacy/shared-design-system/tokens.json";

const palette = tokensJson.colors;

export const appTheme = {
  colors: {
    background: palette.surface.base,
    surface: palette.surface.raised,
    surfaceAlt: palette.surface.overlay,
    primary: palette.brand["600"],
    primaryAccent: palette.accent["500"],
    border: palette.border.subtle,
    text: palette.text.primary,
    textMuted: palette.text.secondary,
    success: palette.feedback.success,
    warning: palette.feedback.warning,
    danger: palette.feedback.danger
  },
  typography: tokensJson.typography,
  space: tokensJson.space
} as const;

export type AppTheme = typeof appTheme;
