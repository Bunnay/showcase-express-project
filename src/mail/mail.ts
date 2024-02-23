import transporter from "./nodemailer";
import { SentMessageInfo } from "nodemailer";

class Mail {
  public from: string;
  public to: string;
  public subject: string;
  public text: string;
  public html: string;

  constructor(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
  ) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }

  send(to: string, subject: string, text: string): Promise<SentMessageInfo> {
    try {
      return transporter.sendMail({
        from: this.from,
        to: this.to,
        subject: this.subject,
        text: this.text,
        html: this.html,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default Mail;
