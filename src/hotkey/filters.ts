const FORM_TAGS = ['input', 'textarea', 'select'];

export const isFormElementFocused = () => {
  const activeTag = document.activeElement?.tagName.toLowerCase() || '';
  return !FORM_TAGS.includes(activeTag);
};
