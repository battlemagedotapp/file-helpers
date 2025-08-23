#!/bin/bash

set -e

LIB_PATH="packages/convex-upload-helpers"
RELEASE_BRANCH="release"

echo "Starting release process for '$LIB_PATH' to branch '$RELEASE_BRANCH'..."

echo "Finding remote repository URL..."
ORIGIN_URL=$(git config --get remote.origin.url)
if [ -z "$ORIGIN_URL" ]; then
    echo "Error: Could not find git remote 'origin'. Please ensure your repo has a remote."
    exit 1
fi

echo "Building the library..."
pnpm install
pnpm turbo build --filter=@battlemagedotapp/convex-upload-helpers

VERSION=$(node -p "require('./${LIB_PATH}/package.json').version")
COMMIT_MESSAGE="release: version ${VERSION}"

BUILD_DIR=$(mktemp -d)
echo "Created temporary directory: $BUILD_DIR"

echo "Copying 'dist' and 'package.json'..."
cp -r "${LIB_PATH}/dist" "$BUILD_DIR/dist"
cp "${LIB_PATH}/package.json" "$BUILD_DIR/package.json"

cd "$BUILD_DIR"

echo "Initializing Git and committing build artifacts..."
git init
git config user.name "release-bot"
git config user.email "bot@example.com"
git add .
git commit -m "$COMMIT_MESSAGE"

echo "Pushing to remote branch '$RELEASE_BRANCH'..."
git push "$ORIGIN_URL" HEAD:"$RELEASE_BRANCH" --force

cd ..
rm -rf "$BUILD_DIR"
echo "Successfully published to branch '$RELEASE_BRANCH'!"
echo "You can now install it using: pnpm install github:battlemagedotapp/convex-upload-helpers#$RELEASE_BRANCH"
