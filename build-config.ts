import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-date-input",
    path: "./lib/jb-date-input.ts",
    outputPath: "./dist/jb-date-input.js",
    umdName: "JBDateInput",
    external: ["date-fns", "date-fns-jalali", "jb-calendar","jb-input","jb-popover","jb-validation"],
    //because date-fns dont have any umd module export i have to do this so it doesn't exclude in umd build
    umdIncludes: ["date-fns", "date-fns-jalali", "jb-calendar","jb-input","jb-popover","jb-validation"],
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-date-input-react",
    path: "./react/lib/JBDateInput.tsx",
    outputPath: "./react/dist/JBDateInput.js",
    external: ["react", "prop-types", "jb-date-input", "jb-validation"],
    globals: {
      react: "React",
      "prop-types": "PropTypes",
      "jb-date-input": "JBDateInput",
      "jb-validation":"JBValidation",
    },
  },
];