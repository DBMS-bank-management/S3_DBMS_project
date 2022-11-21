export const dashSeperatedToHumanReadble = (string) => {
  const words = string.split("-");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  const str = words.join(" ");

  return str;
};
