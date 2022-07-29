const FORM_TAGS = ['input', 'textarea', 'select'];

export const isOutsideFormElement = () => {
  const activeTag = document.activeElement?.tagName.toLowerCase() || '';
  return !FORM_TAGS.includes(activeTag);
};

export const isFormElementFocused = () => isOutsideFormElement();
