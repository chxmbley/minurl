import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRightIcon, RewindIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import Input from '~components/Input';
import Button from '~components/Button';
import { URL_FIELD_NAME } from './constants';
import { constructMiniUrlFromSlug, isAppRedirectUrl, isValidUrl } from '~lib/utils/url';
import { getRandomInputUrlMessage, getRandomOutputUrlMessage } from '~lib/utils/messages';
import type { FC, MouseEventHandler } from 'react';
import type { MinifierFormData, MinifierFormProps } from './types';
import styles from './MinifierForm.module.scss';

const MinifierForm: FC<MinifierFormProps> = ({ className, isLoading = false, onReset, onSubmit, slug }) => {
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

  const shouldDisableSubmit = useMemo(() => !isEmpty(errors) || isAppUrl || isLoading, [errors, isAppUrl, isLoading]);

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
          className={styles.urlInput}
          type="url"
          placeholder="paste a url"
          readOnly={slug !== null}
          disabled={isLoading}
          {...register(URL_FIELD_NAME, {
            required: true,
            validate: isValidUrl,
          })}
        />

        {slug !== null && (
          <Button
            type="button"
            title="Copy URL"
            onClick={copyToClipboard}
            className={cn(styles.copyButton, { [styles.copied]: didCopy })}>
            {didCopy ? 'copied!' : 'copy'}
          </Button>
        )}
      </div>

      <Button
        role="submit"
        className={styles.submitButton}
        round
        variant={slug === null ? 'accent' : 'primary'}
        title={slug === null ? 'Submit' : 'Reset'}
        disabled={shouldDisableSubmit}>
        {slug === null ? (
          <ArrowRightIcon className={styles.submitButtonIcon} />
        ) : (
          <RewindIcon className={styles.submitButtonIcon} />
        )}
      </Button>

      <div className="text-slate-600 dark:text-slate-300 text-sm text-center mt-4 h-5">
        {!isEmpty(errors[URL_FIELD_NAME]) ? 'invalid url' : formMessage}
      </div>
    </form>
  );
};

export default MinifierForm;
