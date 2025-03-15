const fs = require("fs");
const os = require("os");

const envFile = "./.env.development";

function setEnvValue(key, value) {
  const ENV_VARS = fs.readFileSync(envFile, "utf8").split(os.EOL);

  // find the env we want based on the key
  const target = ENV_VARS.findIndex((line) => {
    return line.match(new RegExp(key));
  });

  // replace the key/value with the new value
  if (target > -1) ENV_VARS.splice(target, 1, `${key}="${value}"`);
  else ENV_VARS.push(`${key}="${value}"`);

  // write everything back to the file system
  fs.writeFileSync(envFile, ENV_VARS.join(os.EOL));
}

console.log("Setting Up Env vars");

const localIp = os.networkInterfaces().wlan0.find((i) => i.family == "IPv4");

if (!localIp) throw new Error("No ip was found");

setEnvValue("EXPO_PUBLIC_API_URL", `http://${localIp.address}:8080`);
