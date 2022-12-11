import { toast } from "react-toastify";

const sucess = (msg, autoClose = 5000) =>
  toast(filterMessage(msg), { type: toast.TYPE.SUCCESS, autoClose });

const error = (msg, autoClose = 5000) =>
  toast(filterMessage(msg), { type: toast.TYPE.ERROR, autoClose });

const info = (msg, autoClose = 5000) =>
  toast(filterMessage(msg), { type: toast.TYPE.INFO, autoClose });

const warning = (msg, autoClose = 5000) =>
  toast(filterMessage(msg), { type: toast.TYPE.WARNING, autoClose });

const filterMessage = (msg) => {
  if(typeof(msg) ===  'string') return msg;
  return msg.message ?? JSON.stringify(msg);
}

export { sucess, error, info, warning };
