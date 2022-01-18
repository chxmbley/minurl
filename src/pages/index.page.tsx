import cn from 'classnames';
import { useCallback, useState } from 'react';
import Ruler from '~components/Ruler';
import NavBar from '~components/NavBar';
import MinifierForm from '~components/MinifierForm';
import ErrorMessage from '~components/ErrorMessage';
import { minifyUrl } from '~lib/api/minifyUrl';
import type { FC } from 'react';
import type { MinifierFormData } from '~components/MinifierForm/types';

const Home: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [urlSlug, setUrlSlug] = useState<string | null>(null);

  const handleMinify = useCallback(async ({ url }: MinifierFormData) => {
    setLoadError(null);
    setIsLoading(true);

    try {
      const { slug } = await minifyUrl(url);
      setUrlSlug(slug);
    } catch (e) {
      // TODO: Report error to monitoring service
      console.error(e);
      setLoadError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col px-4 mx-auto min-h-screen max-w-screen-sm">
      <NavBar />

      <main className="flex-grow">
        <h2 className="text-5xl md:text-6xl mt-32 mb-8 text-slate-900 dark:text-white font-bold">
          make many
          <br />
          mini urls
        </h2>

        {loadError !== null && (
          <ErrorMessage className="mb-8">
            We tripped while getting your mini URL. We&apos;ll try to do better next time.
          </ErrorMessage>
        )}

        <Ruler
          className={cn('mb-4 w-full transition-[width] duration-1000 px-5', {
            'w-1/2': urlSlug !== null,
          })}
        />

        <MinifierForm isLoading={isLoading} onSubmit={handleMinify} onReset={() => setUrlSlug(null)} slug={urlSlug} />
      </main>

      <footer className="my-4 text-sm text-slate-500 text-center justify-self-end">made with 💜 in tx</footer>
    </div>
  );
};

export default Home;
