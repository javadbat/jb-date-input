type FileStringModules = {
    readonly default: string;
}
declare module '*.scss' {
    const value: FileStringModules;
    export default value;
}
declare module '*.html' {
    const value: FileStringModules;
    export default value.default;
}
declare module '*.svg' {
    const value: string;
    export default value;
}