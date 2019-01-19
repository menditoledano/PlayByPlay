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
  
  globalStyle: 'src/globals/bootstrap.min.css',
 
};
