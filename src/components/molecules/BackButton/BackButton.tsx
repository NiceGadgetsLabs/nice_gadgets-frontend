import { useNavigate } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button className="back-button" variant="ghost" onClick={() => navigate(-1)}>
      <Icon className="back-button__icon" type="arrow-left" width="16px" height="16px" />
      <span className="back-button__title">Back</span>
    </Button>
  );
};
