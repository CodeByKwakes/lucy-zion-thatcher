module.exports = {
  '{src,apps,libs,tools}/**/*.{ts,js}': [
    'nx affected:lint --uncommitted --fix true'
  ],
  '{src,apps,libs,tools}/**/*.{ts,js,html,json,scss,css,md,yaml,yml}': [
    'nx format:write --uncommitted --fix true'
  ],
  '{src,apps,libs,tools}/**/*.{css,less,sass,scss,sss}': ['npx stylelint --fix']
};
