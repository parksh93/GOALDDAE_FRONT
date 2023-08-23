export function formatDate(datetime) {
    const options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(datetime).toLocaleString('ko-KR', options);

    return formattedDate;
  }