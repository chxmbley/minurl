import cn from 'classnames';
import { useCallback, useState } from 'react';
import Ruler from '~components/Ruler';
import NavBar from '~components/NavBar';
import MinifierForm from '~components/MinifierForm';
import { minifyUrl } from '~lib/api/minifyUrl';
import type { FC } from 'react';
import type { MinifierFormData } from '~components/MinifierForm/types';

const Home: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [urlSlug, setUrlSlug] = useState<string | null>(null);

  const handleMinify = useCallback(async ({ url }: MinifierFormData) => {
    setIsLoading(true);
    const { slug } = await minifyUrl(url);
    setIsLoading(false);
    setUrlSlug(slug);
  }, []);

  return (
    <div className="flex flex-col mx-auto min-h-screen max-w-screen-sm">
      <NavBar />

      <main className="flex-grow">
        <h2 className="text-6xl mt-32 mb-16 text-slate-900 dark:text-white font-bold">
          make many
          <br />
          mini urls
        </h2>

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
