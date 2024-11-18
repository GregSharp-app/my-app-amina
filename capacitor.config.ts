import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.amina.app',
  appName: 'amina-app',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  } 
  ,plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    },
  },
};

export default config;
