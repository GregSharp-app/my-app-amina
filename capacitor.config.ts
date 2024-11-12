import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.amina.app',
  appName: 'amina-app',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  } 
};

export default config;
