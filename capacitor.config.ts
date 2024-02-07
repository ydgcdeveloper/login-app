import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'safe.location.app',
  appName: 'Safe location',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
