import pmex from 'pmex';

import { cpSync, rmSync } from 'node:fs';

const cwd = './example';

pmex('build');

pmex(`install`, { cwd });

rmSync(`${cwd}/node_modules/react-native-html-component`, {
  force: true,
  recursive: true,
});

cpSync(`./dist`, `${cwd}/node_modules/react-native-html-component/dist`, {
  force: true,
  recursive: true,
});

cpSync(`./package.json`, `${cwd}/node_modules/react-native-html-component/package.json`, {
  force: true,
});

pmex(
  {
    bun: 'bunx expo start -c',
    default: 'npx expo start -c',
  },
  { cwd },
);
