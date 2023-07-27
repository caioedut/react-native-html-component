import pmex from 'pmex';

pmex('test');

pmex('tsc --build --force');

pmex('npm version patch');

pmex('npm publish');

pmex('git push');
