module.exports = {
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: `${__dirname}/tsconfig.json`,
      },
    },
    {
      files: ['*.test.ts'],
      rules: {
        'sonarjs/no-duplicate-string': [0],
      },
    },
  ],
};