import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'projectAdvance',
  outputTargets: [
    {
      type: 'dist',
      // dir: '',
      // esmLoaderPath: '../loader',
    },
    // {
    //   type: 'dist-custom-elements',
    // },
    // {
    //   type: 'docs-readme',
    // },
    // {
    //   type: 'www',
    //   serviceWorker: null, // disable service workers
    // },
  ],
};
