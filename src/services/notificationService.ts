import BaseService from "./baseService";
import Notification from "../models/notification";

class NotificationService extends BaseService<Notification> {
  constructor() {
    super(Notification);
  }
}

export default new NotificationService();
