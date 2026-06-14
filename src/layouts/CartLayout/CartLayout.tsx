import { type FC, type ReactNode } from 'react';
import { BackButton } from '../../components/molecules/BackButton/BackButton';
import './CartLayout.scss';

interface Props {
  title: string;
  list?: ReactNode;
  summary?: ReactNode;
  empty?: ReactNode;
}

export const CartLayout: FC<Props> = ({ title, list, summary, empty }) => {
  return (
    <div className="cart-layout">
      <div className="cart-layout__top">
        <BackButton />
        <h1 className="cart-layout__title">{title}</h1>
      </div>

      {empty ?? (
        <div className="cart-layout__content">
          <div className="cart-layout__list">{list}</div>
          <div className="cart-layout__summary">{summary}</div>
        </div>
      )}
    </div>
  );
};
