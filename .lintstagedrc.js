module.exports = {
  '{apps,libs,src}/**/*.{ts,js}': ['nx affected:lint --uncommitted --fix true'],
  '{apps,libs,src}/**/*.{ts,js,html,json,scss,css,md,yaml,yml}': [
    'nx format:write --uncommitted'
  ]
};
