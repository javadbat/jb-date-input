type FileStringModule = {
    readonly default: string;
}
declare module '*.scss' {
    const value: FileStringModule;
    export default value;
}
declare module '*.html' {
    const value: FileStringModule;
    export default value.default
}
