import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://new.lexkonovalov.com',
  output: 'static',
  image: {
    service: passthroughImageService()
  },
  build: {
    format: 'file'
  }
});
