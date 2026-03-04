import { format } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    return format(new Date(dateString), 'MMM dd, yyyy');
  } catch (error) {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  try {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  } catch (error) {
    return dateString;
  }
};

export const toISOString = (dateString) => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toISOString();
  } catch (error) {
    return dateString;
  }
};
