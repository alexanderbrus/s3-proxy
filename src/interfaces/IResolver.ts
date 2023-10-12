export interface IResolver<T = unknown> {
    resolve(...args: unknown[]): T
}