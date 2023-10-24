export function formatTimeData(data) {
  const formattedData = data.map((item) => {
    return {
      ...item,
      time_in: formatTime(item.time_in),
      time_out: formatTime(item.time_out),
      total_hours: formatTime(item.total_hours),
      date: formatDate(item.date),
    };
  });
}

function formatTime(time) {
  return time.slice(0, 5);
}

function formatDate(date) {}
