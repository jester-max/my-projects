import type { CapacitorConfig } from '@capacitor/cli';
import * as https from "node:https";

const config: CapacitorConfig = {
  appId: 'com.khetSeGhar',
  appName: 'KhetSeGharApp',
  webDir: 'www',
  server:{
    androidScheme:'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
