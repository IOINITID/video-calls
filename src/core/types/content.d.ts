/* Icons modules */

declare module '*icon.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

/* Images modules */

declare module '*image.svg' {
  const src: string;
  export default src;
}

declare module '*image.jpg' {
  const src: string;
  export default src;
}

declare module 'image.jpeg' {
  const src: string;
  export default src;
}

declare module 'image.png' {
  const src: string;
  export default src;
}

declare module 'image.gif' {
  const src: string;
  export default src;
}

declare module 'image.avif' {
  const src: string;
  export default src;
}

/* Fonts modules */

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.ttf' {
  const src: string;
  export default src;
}

/* Sounds modules */

declare module '*.mp3' {
  const src: string;
  export default src;
}
