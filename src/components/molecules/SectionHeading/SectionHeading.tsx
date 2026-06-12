import type { FC } from 'react';
import './SectionHeading.scss';

interface Props {
  title: string;
}

export const SectionHeading: FC<Props> = ({ title }) => {
  return (
    <header className="section-heading">
      <h2 className="section-heading__title">{title}</h2>
      <hr className="section-heading__divider" />
    </header>
  );
};
