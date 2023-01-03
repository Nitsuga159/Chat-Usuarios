import { icons, modificate } from "./replaceText.js";

export default (text) => {
  console.log(text);
  return text
    .replace(/<.+?>(.*)<\/.+>/g, "$1")
    .replace(/<(.+)\/>/g, "$1")
    .replace("\n", "<br />")
    .replace(/(:\w+\s)(.+)/g, (_, key, value) =>
      modificate[key] ? modificate[key](value) : key + value
    )
    .replace(/:\w+/g, (str) => icons[str] || str);
};
