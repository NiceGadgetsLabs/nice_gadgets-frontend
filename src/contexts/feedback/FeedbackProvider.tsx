import React, { useState } from 'react';
import { FeedbackContext } from './FeedbackContext';
import { FeedbackForm } from '../../components/organisms/FeedbackForm/FeedbackForm';

type Props = {
  children: React.ReactNode;
};

export function FeedbackProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openFeedback = () => setIsOpen(true);
  const closeFeedback = () => setIsOpen(false);

  const value = {
    isOpen,
    openFeedback,
    closeFeedback,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}

      <FeedbackForm isOpen={isOpen} onClose={closeFeedback} />
    </FeedbackContext.Provider>
  );
}
