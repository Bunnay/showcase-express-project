import transporter from "./nodemailer";
import { SentMessageInfo, SendMailOptions } from "nodemailer";

class Mail {
  private options: SendMailOptions;

  constructor(options: SendMailOptions) {
    this.options = options;
  }

  async send(): Promise<SentMessageInfo> {
    return transporter.sendMail(this.options).catch((error) => {
      throw error;
    });
  }
}

export default Mail;
