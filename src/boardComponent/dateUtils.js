export function formatDate(datetime) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(datetime).toLocaleString('ko-KR', options);

    return formattedDate;
  }