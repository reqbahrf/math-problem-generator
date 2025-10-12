export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {}
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    ...options,
  });
};
