import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
    {
    name: "jb-date-input-module",
    path: "./module/lib/index.ts",
    outputPath: "./module/dist/index.js",
    umdName: "JBDateInputModule",
    external: ["date-fns", "date-fns-jalali", "jb-validation", "jb-core", "jb-core/theme","jb-core/i18n"],
    //because date-fns dont have any umd module export i have to do this so it doesn't exclude in umd build
    umdIncludes: ["date-fns", "date-fns-jalali", "jb-validation", "jb-core", "jb-core/theme","jb-core/i18n"],
    dir:"./module",
    
  },
  {
    name: "jb-date-input",
    path: "./lib/jb-date-input.ts",
    outputPath: "./dist/jb-date-input.js",
    umdName: "JBDateInput",
    external: ["date-fns", "date-fns-jalali", "jb-calendar", "jb-input", "jb-popover", "jb-validation", "jb-core", "jb-core/theme", "jb-core/i18n"],
    //because date-fns dont have any umd module export i have to do this so it doesn't exclude in umd build
    umdIncludes: ["date-fns", "date-fns-jalali", "jb-calendar", "jb-input", "jb-popover", "jb-validation", "jb-core", "jb-core/i18n", "jb-core/theme"],
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-date-input-react",
    path: "./react/lib/JBDateInput.tsx",
    outputPath: "./react/dist/JBDateInput.js",
    external: ["react", "jb-date-input", "jb-validation", "jb-core"],
    globals: {
      react: "React",
      "jb-date-input": "JBDateInput",
      "jb-validation": "JBValidation",
      "jb-core":"JBCore",
      "jb-core/react":"JBCoreReact"
    },
    umdName: "JBDateInputReact",
    dir: "./react"
  },
];