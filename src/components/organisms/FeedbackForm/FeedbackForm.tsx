/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import { useCallback, useEffect, useState, type FC } from 'react';
import { FocusTrap } from 'focus-trap-react';
import { notify } from '../../../utils/notify';
import './FeedbackForm.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackForm: FC<Props> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');

  const handleClose = useCallback(() => {
    setRating(0);
    setFeedback('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    notify.feedbackSubmitted(rating);
    handleClose();
  };

  return (
    <div
      className="feedback-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          escapeDeactivates: false,
          clickOutsideDeactivates: false,
          allowOutsideClick: true,
        }}
      >
        <section className="feedback" role="dialog" aria-modal="true">
          <h2 className="feedback__title">Rate your experience</h2>

          <div className="feedback__rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`feedback__star ${rating >= star ? 'feedback__star--active' : ''}`}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          {rating > 0 && rating <= 3 && (
            <textarea
              className="feedback__textarea"
              placeholder="What can we improve?"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
          )}

          <button
            type="button"
            className="feedback__submit"
            disabled={!rating}
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
        </section>
      </FocusTrap>
    </div>
  );
};
