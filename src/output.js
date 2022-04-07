const chalk = require("chalk");

function prettyJson(json) {
  return JSON.stringify(json, null, 2);
}

function niceDate(unixTimestamp, locale, options) {
  if (typeof unixTimestamp === "number" && !isNaN(unixTimestamp)) {
    return new Date(unixTimestamp * 1000).toLocaleString(locale, options);
  }

  return undefined;
}

function outputHeader(header) {
  console.log(chalk.cyan("\n✻ Header"));
  console.log(chalk.cyan(prettyJson(header)));
}

function outputPayload(payload) {
  console.log(chalk.yellow("\n✻ Payload"));
  console.log(chalk.yellow(prettyJson(payload)));
}

function outputSignature(signature) {
  console.log(chalk.magenta(`\n✻ Signature ${signature}`));
}

function outputTokenAsJson(decodedToken) {
  process.stdout.write(JSON.stringify(decodedToken, null, 2));
}

function outputJwtIoLink(token) {
  const parts = token.split(".");
  console.log(chalk.yellow("\nTo verify on jwt.io:\n"));
  console.log(
    chalk.magenta("https://jwt.io/#id_token=") +
      chalk.cyan(parts[0]) +
      "." +
      chalk.yellow(parts[1]) +
      "." +
      chalk.magenta(parts[2])
  );
}

function outputNicePayloadDates(payload) {
  if (payload.iat) {
    console.log(
      chalk.yellow(`   iat: ${payload.iat} `) + niceDate(payload.iat)
    );
  }

  if (payload.nbf) {
    console.log(
      chalk.yellow(`   nbf: ${payload.nbf} `) + niceDate(payload.nbf)
    );
  }

  if (payload.exp) {
    console.log(
      chalk.yellow(`   exp: ${payload.exp} `) + niceDate(payload.exp)
    );
  }
}

module.exports = {
  niceDate,
  outputHeader,
  outputJwtIoLink,
  outputNicePayloadDates,
  outputPayload,
  outputSignature,
  outputTokenAsJson,
  prettyJson,
};
