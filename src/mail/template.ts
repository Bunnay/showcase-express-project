import fs from "fs";
import path from "path";

class Template {
  private template: string;

  constructor(template: string) {
    this.template = template;
  }

  //   Render data to template
  render(data: Record<string, string>): string {
    let result = this.template;

    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      result = result.replace(regex, value.toString());
    }

    return result;
  }

  // Read html file
  static readHtmlFile(templatePath: string): string {
    const htmlFilePath = path.join(__dirname, templatePath);

    const template = fs.readFileSync(htmlFilePath).toString();

    return template;
  }
}

export default Template;
