declare module '*.css';
declare module '*.svg';

declare module '*.glb' {
    const src: string;
    export default src;
  }

declare module '*.svg?raw' {
    const content: string;
    export default content;
  }