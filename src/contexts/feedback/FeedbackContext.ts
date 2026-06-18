import { createContext } from 'react';

export type FeedbackContextType = {
  isOpen: boolean;
  openFeedback: () => void;
  closeFeedback: () => void;
};

export const FeedbackContext = createContext<FeedbackContextType>({
  isOpen: false,
  openFeedback: () => {},
  closeFeedback: () => {},
});
