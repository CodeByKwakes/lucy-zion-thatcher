module.exports = {
  '{src,apps,modules}/**/*.{ts,js}': [
    'nx affected:lint --uncommitted --fix true'
  ]
  // '{src,apps,modules}/**/*.{ts,js,html,json,scss,css,md,yaml,yml}': [
  //   'nx format:write --uncommitted --fix true'
  // ]
};
