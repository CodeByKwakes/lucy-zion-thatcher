module.exports = {
  '{src,apps,modules}/**/*.{json,md,html}': [
    'nx format:write --uncommitted --fix true'
  ],
  '{src,apps,modules}/**/*.{ts,js}': [
    'nx format:write --uncommitted --fix true',
    'nx affected:lint --uncommitted --fix true'
  ],
  '{src,apps,modules}/**/*.{scss,css}': [
    'nx format:write --uncommitted --fix true',
    'stylelint --fix'
  ]
  // '{src,apps,modules}/**/*.{ts,js,html,json,scss,css,md,yaml,yml}': [
  //   'nx format:write --uncommitted --fix true'
  // ]
};
