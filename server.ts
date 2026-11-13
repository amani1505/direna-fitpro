import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Angular only renders requests for known hostnames (protects against
  // host-header attacks). In production set NG_ALLOWED_HOSTS to your domain(s),
  // comma separated, e.g. NG_ALLOWED_HOSTS=direnafitpro.com,www.direnafitpro.com.
  // The environment variable takes precedence over this local default.
  const commonEngine = new CommonEngine({
    allowedHosts: ['localhost', '127.0.0.1'],
  });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  // (Express 5 no longer accepts bare '*' wildcards in route paths.)
  server.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
      // Prerendered routes are folders; let Angular handle them without a 301.
      redirect: false,
    }),
  );

  // All regular routes use the Angular engine
  server.get('/{*splat}', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
