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


export function formatDuration(durationIns) {
    const seconds = Math.floor((durationIns ) % 60);
    const minutes = Math.floor((durationIns / (60)) % 60);
    const hours = Math.floor(durationIns / (60 * 60));
  
    const formattedDuration = [];
  
    if (hours > 0) {
      formattedDuration.push(`${hours} hr`);
    }
  
    if (minutes > 0) {
      formattedDuration.push(`${minutes} min`);
    }
  
    if (seconds > 0 || (hours === 0 && minutes === 0)) {
      formattedDuration.push(`${seconds} sec`);
    }
  
    return formattedDuration.join(' ');
  }