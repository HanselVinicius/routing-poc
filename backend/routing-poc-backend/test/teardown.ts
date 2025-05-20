import { getDatasource } from "./util";

const teardown = async () => {
  await global.postgres.stop();
  await (await getDatasource()).destroy();
};

export default teardown;