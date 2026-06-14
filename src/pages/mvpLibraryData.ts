export const formatMVPSessionDate = (date: Date) =>
  date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
