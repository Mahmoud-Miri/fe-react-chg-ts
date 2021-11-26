const toTitleCase = (str: string | undefined) => {
  if (str) {
    let words: string;
    words = str.split('_').join(' ');
    return words.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  return str;
};

export { toTitleCase };
