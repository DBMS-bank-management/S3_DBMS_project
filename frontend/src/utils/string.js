export const dashSeperatedToHumanReadble = (string) => {
  const wordsList = string.replace("_", "-").split("-");

  for (let i = 0; i < wordsList.length; i++) {
    wordsList[i] = wordsList[i][0].toUpperCase() + wordsList[i].substr(1);
  }

  const str = wordsList.join(" ");
  return str;
};
