declare module '*.svg' {
    // const content: FC<SVGProps<SVGElement>>
    const content: React.ElementType<React.ComponentPropsWithRef<'svg'>>;
    export default content
}

declare module '*.svg?url' {
    const content: any
    export default content
}