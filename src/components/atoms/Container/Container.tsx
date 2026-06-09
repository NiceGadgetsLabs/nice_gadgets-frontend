import type { FC, ReactNode } from 'react';
import './Container.scss';

interface Props {
  children: ReactNode;
}

export const Container: FC<Props> = ({ children }) => {
  return <div className="container">{children}</div>;
};
