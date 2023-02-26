import { createBrowserHistory } from '@tanstack/react-router';

export const navigateBack = () => {
  const history = createBrowserHistory();
  history.back();

  return history;
};
