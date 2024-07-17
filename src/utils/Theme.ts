const Themes = {
    defaultTheme : "default_theme",
    theme1 : "theme1",
    theme2 : "theme2",
    dark : "dark_theme"
} as const;

export type Themestypes = typeof Themes[keyof typeof Themes]

export default Themes;