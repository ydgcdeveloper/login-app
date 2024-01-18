import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'login.app',
  appName: 'login-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
