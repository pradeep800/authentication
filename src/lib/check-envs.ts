import { allEnvs } from "../zodTypes/env";
function checkEnvs() {
  const areAllEnvPresent = allEnvs.safeParse(process.env);
  if (areAllEnvPresent.success) {
    console.log("All environment variable are present");
    return true;
  } else {
    console.log("Some environment variable are not present");
    return false;
  }
}
export { checkEnvs };
