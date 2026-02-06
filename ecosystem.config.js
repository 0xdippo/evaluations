module.exports = {
  apps: [
    {
      name: 'evaluations',
      script: 'npx',
      args: 'next start -p 3003',
      cwd: '/home/evo/evaluations',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
