module.exports = {
  '**/*.{ts,js}': ['nx affected:lint --uncommitted --fix true'],
  '**/*.{ts,js,html,json,scss,css,md,yaml,yml}': [
    'nx format:write --uncommitted --fix true'
  ]
};
