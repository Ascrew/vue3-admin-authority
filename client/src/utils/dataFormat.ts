// format timestamp to string
export function formatStamp(
  timestamp: string | number,
  formatStr: string
): string {
  const nromDate: Date = new Date(Number(timestamp));
  const year: string = nromDate.getFullYear() + "";
  const month: string =
    (nromDate.getMonth() + 1 < 10
      ? "0" + (nromDate.getMonth() + 1)
      : nromDate.getMonth() + 1) + "";
  const day: string = nromDate.getDate() + "";
  const hours: string = nromDate.getHours() + "";
  const minute: string = nromDate.getMinutes() + "";
  const second: string = nromDate.getSeconds() + "";
  let dateStr = "";

  switch (formatStr) {
    case "onlyDate":
      dateStr = year + "-" + month + "-" + day;
      break;
    case "dateTime":
      dateStr =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minute +
        ":" +
        second;
      break;
    case "onlyTime":
      dateStr = hours + ":" + minute + ":" + second;
      break;
    default:
      break;
  }
  return dateStr;
}

// format normDate to string
export function formatDate(date: string | Date, formatStr: string): string {
  const nromDate: Date = new Date(date);
  const year: string = nromDate.getFullYear() + "";
  const month: string =
    (nromDate.getMonth() + 1 < 10
      ? "0" + (nromDate.getMonth() + 1)
      : nromDate.getMonth() + 1) + "";
  const day: string = nromDate.getDate() + "";
  const hours: string = nromDate.getHours() + "";
  const minute: string = nromDate.getMinutes() + "";
  const second: string = nromDate.getSeconds() + "";
  let dateStr = "";

  switch (formatStr) {
    case "onlyDate":
      dateStr = year + "-" + month + "-" + day;
      break;
    case "dateTime":
      dateStr =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minute +
        ":" +
        second;
      break;
    case "onlyTime":
      dateStr = hours + ":" + minute + ":" + second;
      break;
    default:
      break;
  }
  return dateStr;
}
