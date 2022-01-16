import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { ArrowRightIcon, RewindIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import Input from '~components/Input';
import Button from '~components/Button';
import { URL_FIELD_NAME } from './constants';
import {
  constructMiniUrlFromSlug,
  getRandomInputUrlMessage,
  getRandomOutputUrlMessage,
  isAppRedirectUrl,
  isValidUrl,
} from '~lib/utils';
import type { FC, MouseEventHandler } from 'react';
import type { MinifierFormData, MinifierFormProps } from './types';

const MinifierForm: FC<MinifierFormProps> = ({ className, onReset, onSubmit, slug }) => {
  const [didCopy, setDidCopy] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [isAppUrl, setIsAppUrl] = useState(false);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<MinifierFormData>({ mode: 'onChange' });

  useEffect(() => {
    const subscription = watch((value) => {
      if (slug) {
        setFormMessage(getRandomOutputUrlMessage());
        return;
      }

      const urlValue = value[URL_FIELD_NAME];

      const isAppUrl = slug === null && isAppRedirectUrl(urlValue ?? '');
      setIsAppUrl(isAppUrl);

      if (isAppUrl) {
        setFormMessage('that url is already shortened. shortening it further would rip the spacetime continuum!');
      } else {
        setFormMessage(isEmpty(urlValue) ? '' : getRandomInputUrlMessage(value[URL_FIELD_NAME] ?? ''));
      }
    });

    return () => subscription.unsubscribe();
  }, [errors, slug, watch]);

  useEffect(() => {
    setValue(URL_FIELD_NAME, slug === null ? '' : constructMiniUrlFromSlug(slug));
  }, [slug, setValue]);

  const handleReset = useCallback(() => {
    setDidCopy(false);
    onReset();
  }, [onReset]);

  const innerSubmitHandler = useCallback(
    (data: MinifierFormData) => {
      slug === null ? onSubmit(data) : handleReset();
    },
    [slug, onSubmit, handleReset],
  );

  const copyToClipboard: MouseEventHandler<HTMLButtonElement> = useCallback(async () => {
    await navigator.clipboard.writeText(constructMiniUrlFromSlug(slug!));
    setDidCopy(true);
  }, [slug]);

  return (
    <form className={cn(className, 'relative')} onSubmit={handleSubmit(innerSubmitHandler)}>
      <div className="relative">
        <Input
          className={cn('w-full transition-colors pr-12', {
            'text-red-600 dark:text-red-400 border-red-600 dark:border-red-600': !isEmpty(errors[URL_FIELD_NAME]),
          })}
          type="url"
          placeholder="paste your url"
          readOnly={slug !== null}
          {...register(URL_FIELD_NAME, {
            required: true,
            validate: isValidUrl,
          })}
        />
        {slug !== null && (
          <button
            type="button"
            onClick={copyToClipboard}
            title="Copy URL"
            className={cn(
              'absolute h-8 w-20 rounded transition-colors hover:bg-slate-200 hover:dark:bg-slate-700 hover:dark:text-slate-400 hover:text-slate-500 right-12 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500',
              {
                'text-green-600 dark:text-green-400 hover:text-green-600 hover:dark:text-green-300': didCopy,
              },
            )}>
            {didCopy ? 'copied!' : 'copy'}
          </button>
        )}
      </div>

      <Button
        role="submit"
        className={cn('absolute w-10 right-1 top-1 h-10 rounded-full', {
          'bg-purple-500 hover:bg-purple-400 focus:bg-purple-400 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:bg-purple-400':
            slug !== null,
        })}
        title={slug === null ? 'Submit' : 'Reset'}
        disabled={!isEmpty(errors) || isAppUrl}>
        {slug === null ? (
          <ArrowRightIcon className="w-5 h-5 flex-shrink-0" />
        ) : (
          <RewindIcon className="w-5 h-5 flex-shrink-0" />
        )}
      </Button>
      <div className="text-slate-600 dark:text-slate-300 text-sm text-center mt-4 h-5">
        {!isEmpty(errors[URL_FIELD_NAME]) ? 'invalid url' : formMessage}
      </div>
    </form>
  );
};

export default MinifierForm;
