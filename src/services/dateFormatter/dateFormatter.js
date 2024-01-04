export const dateFormatter = function (date) {
    let originalDate = new Date(date);

    // Convert to the desired format
    let month = originalDate.toLocaleDateString('en-GB', { month: 'short' });
    let day = originalDate.toLocaleDateString('en-GB', { day: '2-digit' });
    let year = originalDate.toLocaleDateString('en-GB', { year: 'numeric' });

    // Create the desired format
    let formattedDate = `${month}, ${day} ${year}`;


    return formattedDate;
}

export function formatTime(inputDateString) {
    const inputDate = new Date(inputDateString);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
  
    const formattedTime = inputDate.toLocaleTimeString('en-US', options);
    return formattedTime;
  }