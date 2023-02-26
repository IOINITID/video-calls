import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

export const Portal = ({ children }: PortalProps) => {
  return createPortal(children, document.querySelector('#portal') as HTMLElement);
};
