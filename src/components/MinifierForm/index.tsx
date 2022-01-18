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
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<MinifierFormData>({ mode: 'onChange' });

  const shouldDisableSubmit = (slug === null && !isDirty) || !isEmpty(errors) || isAppUrl || isLoading;

  useEffect(() => {
    const subscription = watch((value) => {
      if (slug !== null) {
        setFormMessage(getRandomOutputUrlMessage());
        return;
      }

      const urlValue = value[URL_FIELD_NAME];

      const isAppUrl = isAppRedirectUrl(urlValue ?? '');
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
    if (slug === null) {
      return;
    }

    setValue(URL_FIELD_NAME, constructMiniUrlFromSlug(slug));
  }, [slug, setValue]);

  const handleReset = useCallback(() => {
    setDidCopy(false);
    setValue(URL_FIELD_NAME, '', { shouldValidate: true });
    setFormMessage('');
    onReset();
  }, [onReset, setValue]);

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

  const messageToRender = useMemo(() => {
    if (isEmpty(getValues(URL_FIELD_NAME))) {
      return '';
    }

    return !isEmpty(errors[URL_FIELD_NAME]) ? 'invalid url' : formMessage;
  }, [getValues, errors, formMessage]);

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
            data-testid="minifier-form-copy"
            type="button"
            title="Copy URL"
            onClick={copyToClipboard}
            className={cn('absolute right-12 top-1/2 transform -translate-y-1/2 w-20', styles.copyButton, {
              [styles.copied]: didCopy,
            })}>
            {didCopy ? 'copied!' : 'copy'}
          </Button>
        )}
      </div>

      <Button
        data-testid="minifier-form-submit"
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

      <span
        data-testid="minifier-form-message"
        className="block text-slate-600 dark:text-slate-300 text-sm text-center mt-4 h-5">
        {messageToRender}
      </span>
    </form>
  );
};

export default MinifierForm;
