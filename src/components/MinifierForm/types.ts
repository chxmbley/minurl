import { URL_FIELD_NAME } from '~components/MinifierForm/constants';

/** Form fields and data types for MinifierForm */
export type MinifierFormData = {
  [URL_FIELD_NAME]: string;
};

/** Props for the MinifierForm component */
export type MinifierFormProps = {
  /** CSS class to apply to the component */
  className?: string;
  /** Whether to render a loading state and disable user input */
  isLoading?: boolean;
  /** Callback executed when the form is reset */
  onReset: () => void;
  /** Callback executed with form data when the form is submitted */
  onSubmit: (data: MinifierFormData) => void;
  /** Shortened URL slug to apply to the form field for the user to copy. If null, the field is editable. */
  slug: string | null;
};
