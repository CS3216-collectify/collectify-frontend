import moment from "moment";

export const convertUTCtoLocal = (timestamp) => {
  return moment
    .utc(timestamp)
    .local()
    .format("DD MMM YYYY, HH:mm A");
}
