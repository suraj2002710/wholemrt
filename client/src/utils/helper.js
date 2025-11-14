import moment from "moment";
import { nanoid } from 'nanoid';
export const timeAgo = (dateString) => {
  return moment(dateString).fromNow();
};

export const genrateRandomID = () => {
  return nanoid();
};

