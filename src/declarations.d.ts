declare module '*.css';
declare module '*.svg';

declare module '*.svg?raw' {
    const content: string;
    export default content;
  }