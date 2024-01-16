import moment from 'moment';

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const convertDateTimeFormat = (dateTime) => {
  const givenDate = moment(dateTime, 'YYYY-MM-DD HH:mm:ss.S');
  const currentDate = moment(); // gets the current date and time

  const diffDays = currentDate.diff(givenDate, 'days');
  const diffWeeks = currentDate.diff(givenDate, 'weeks');
  const diffYears = currentDate.diff(givenDate, 'years');

  let formattedDiff;

  if (diffYears >= 1) {
    formattedDiff = diffYears + 'y';
  } else if (diffWeeks >= 1) {
    formattedDiff = diffWeeks + 'w';
  } else {
    formattedDiff = diffDays + 'd';
  }

  return formattedDiff;
};
