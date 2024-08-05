import Notification from "../models/notification";
import { CREATE_NOTIFICATION_RULES } from "../validation/rules/notification";
import BaseController from "./baseController";
import NotificationService from "../services/notificationService";

class NotificationController extends BaseController<Notification> {
  constructor() {
    super(NotificationService);

    this.create_rules = CREATE_NOTIFICATION_RULES;
  }
}

export default new NotificationController();
