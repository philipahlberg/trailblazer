#! /bin/bash

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

echo "Releasing $VERSION..."

# Build dist/
npm run build
# Run browser tests
npm run test
# Bump package.json
npm version "$VERSION"
# Commit the bump
git commit -am "$VERSION"
# Tag the version
git tag "$VERSION"
# Push the bump
git push
# Push the tag
git push origin "$VERSION"
# Publish to npm
npm publish
