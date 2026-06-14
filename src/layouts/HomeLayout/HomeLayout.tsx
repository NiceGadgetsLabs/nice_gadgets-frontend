import { type FC, type ReactNode } from 'react';
import './HomeLayout.scss';

interface Props {
  title: string;
  children: ReactNode;
}

export const HomeLayout: FC<Props> = ({ title, children }) => {
  return (
    <div className="home-layout">
      <h1 className="home-layout__title">{title}</h1>

      <div className="home-layout__sections">{children}</div>
    </div>
  );
};
