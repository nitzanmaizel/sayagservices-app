export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  // Format date in dd/mm/yyyy
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

  // Format time in hh:mm (24-hour format)
  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  }).format(date);

  return `${formattedDate} ${formattedTime}`;
};
