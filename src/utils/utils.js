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

  let diffSeconds = currentDate.diff(givenDate, 'seconds');
  let diffMinutes = currentDate.diff(givenDate, 'minutes');
  let diffHours = currentDate.diff(givenDate, 'hours');
  const diffDays = currentDate.diff(givenDate, 'days');
  const diffWeeks = currentDate.diff(givenDate, 'weeks');
  const diffYears = currentDate.diff(givenDate, 'years');

  let formattedDiff;

  if (diffSeconds < 0) {
    formattedDiff = '1s';
  } else if (diffYears >= 1) {
    formattedDiff = diffYears + 'y';
  } else if (diffWeeks >= 1) {
    formattedDiff = diffWeeks + 'w';
  } else if (diffDays >= 1) {
    formattedDiff = diffDays + 'd';
  } else if (diffHours >= 1) {
    formattedDiff = diffHours + 'h';
  } else if (diffMinutes >= 1) {
    formattedDiff = diffMinutes + 'm';
  } else {
    formattedDiff = diffSeconds + 's';
  }

  return formattedDiff;
};
