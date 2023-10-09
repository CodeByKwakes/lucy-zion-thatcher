module.exports = {
  '**/*.{ts,js}': [
    'nx affected:lint --uncommitted --fix true',
    'git add' // Add the changes to the staging area
  ],
  '**/*.{ts,js,html,json,scss,css,md,yaml,yml}': [
    'nx format:write --uncommitted --fix true',
    'git add' // Add the changes to the staging area
  ]
};
