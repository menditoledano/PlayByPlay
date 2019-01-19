import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'play-by-play',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  devServer: {
    openBrowser: false
  },
  enableCache: true,
  
  globalStyle: 'src/globals/bootstrap.min.css',
 
};
