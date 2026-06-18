import { useState } from 'react';
import './FeedbackForm.scss';

export const FeedbackForm = () => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log({
      rating,
      feedback,
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="feedback">
        <h2 className="feedback__title">Thank you for your feedback!</h2>
      </section>
    );
  }

  return (
    <section className="feedback">
      <h2 className="feedback__title">Rate your experience</h2>

      <div className="feedback__rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`feedback__star ${rating >= star ? 'feedback__star--active' : ''}`}
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

      <button type="button" className="feedback__submit" disabled={!rating} onClick={handleSubmit}>
        Submit Feedback
      </button>
    </section>
  );
};
