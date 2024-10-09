// Remove after migrate to React 19
declare module 'react' {
  interface DOMAttributes {
    inert?: '' | undefined;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      inert?: '' | undefined;
    }
  }
}

export {};
