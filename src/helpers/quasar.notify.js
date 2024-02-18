import { Notify } from "quasar";

export const errorNotify = (message) => {
  return Notify.create({
    icon: "warning",
    position: "top",
    type: "negative",
    message: `${message}`,
  });
};

export const successNotify = (message) => {
  return Notify.create({
    position: "top",
    color: "secondary",
    textColor: "white",
    icon: "cloud_done",
    message: `${message}`,
  });
};
