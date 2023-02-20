import React, { createContext, useCallback } from "react";

type FormValidationContextType<_Errors = Record<string, undefined | string>> = {
  errors: _Errors;
  setError: (key: keyof _Errors) => (value?: string) => void;
};

export const FormValidationContext =
  createContext<FormValidationContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const FormValidationProvider: React.FC<Props> = ({ children }) => {
  const [errors, setErrors] = React.useState<
    Record<string, string | undefined>
  >({});

  const setError = useCallback(
    (key: string) => (value?: string) => {
      setErrors((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setErrors]
  );

  return (
    <FormValidationContext.Provider value={{ errors, setError }}>
      {children}
    </FormValidationContext.Provider>
  );
};

export const withFormValidation = <
  Props extends React.ComponentProps<React.ComponentType>
>(
  Component: React.ComponentType<Props>
) => {
  const WrappedComponent = (props: Props) => {
    return (
      <FormValidationProvider>
        <Component {...props} />
      </FormValidationProvider>
    );
  };

  WrappedComponent.displayName = `withFormValidation(${
    Component.displayName || "Component"
  })`;

  return WrappedComponent;
};

export const useFormValidation = (name: string) => {
  const context = React.useContext(FormValidationContext);
  if (context === null) {
    throw new Error(
      "useFormValidation must be used within a FormValidationProvider"
    );
  }

  const { errors, setError } = context;

  return {
    error: errors[name],
    setError: setError(name),
  };
};

export const useFormErrors = () => {
  const context = React.useContext(FormValidationContext);
  if (context === null) {
    throw new Error(
      "useFormErrors must be used within a FormValidationProvider"
    );
  }

  const { errors } = context;

  const errorArray = Object.entries(errors).filter(([, value]) => value) as [
    string,
    string
  ][];

  return errorArray;
};

export const useErrorExists = () => {
  const context = React.useContext(FormValidationContext);
  if (context === null) {
    throw new Error(
      "useErrorExists must be used within a FormValidationProvider"
    );
  }

  const { errors } = context;

  return Object.values(errors).some((error) => error !== undefined);
};

export const useClearErrors = () => {
  const context = React.useContext(FormValidationContext);
  if (context === null) {
    throw new Error(
      "useClearErrors must be used within a FormValidationProvider"
    );
  }

  const { setError } = context;

  return () => {
    Object.keys(context.errors).forEach((key) => setError(key)(undefined));
  };
};
