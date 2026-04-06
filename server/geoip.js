import fs from 'node:fs';
import maxmind from 'maxmind';
import { config } from './config.js';

let cityReader = null;

if (config.maxmindDbPath && fs.existsSync(config.maxmindDbPath)) {
  try {
    cityReader = maxmind.openSync(config.maxmindDbPath);
  } catch (error) {
    console.warn(`GeoIP database could not be opened: ${error.message}`);
  }
}

export function lookupGeo(ipAddress) {
  if (!cityReader || !ipAddress) {
    return { country: null, city: null, region: null };
  }

  try {
    const result = cityReader.get(ipAddress);
    return {
      country: result?.country?.names?.en || null,
      city: result?.city?.names?.en || null,
      region: result?.subdivisions?.[0]?.names?.en || null
    };
  } catch {
    return { country: null, city: null, region: null };
  }
}
