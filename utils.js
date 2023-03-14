exports.snakeCase = (string) => {
    return string.replace(/\d+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join('_');
};

exports.CONSTANTS = {
  JWT_KEY: "5cead9daf8eb1af185f1f9c7fd4a45c5cdbbcbdf692728771c8e224163603c8e"
}