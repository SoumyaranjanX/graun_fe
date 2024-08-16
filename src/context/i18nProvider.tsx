import { PageLoader } from '@/components/ui';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type ProviderProps = { children: any };

const I18nProvider: FC<ProviderProps> = ({ children }) => {
  const { ready } = useTranslation(undefined, { useSuspense: false });

  if (ready) {
    return children;
  }

  return <PageLoader />;
};

export default I18nProvider;
