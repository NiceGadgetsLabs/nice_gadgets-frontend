import clsx from 'clsx';
import type { CSSProperties, FC } from 'react';
import './Skeleton.scss';

interface Props {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  borderRadius?: CSSProperties['borderRadius'];
  className?: string;
}

export const Skeleton: FC<Props> = ({ width, height, borderRadius, className }) => {
  return (
    <span
      className={clsx('skeleton', className)}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
};
