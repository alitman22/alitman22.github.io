#!/bin/sh
# pre-push hook — rebuild site artifacts before every push.
# Install: npm run setup-hooks

# Ensure npm is on PATH (Git Bash on Windows may not inherit it)
if ! command -v npm >/dev/null 2>&1; then
  export PATH="/c/Program Files/nodejs:$PATH"
fi

echo "[pre-push] Building site artifacts..."
npm run publish:local
if [ $? -ne 0 ]; then
  echo "[pre-push] Build failed. Push aborted."
  exit 1
fi

# Stage updated build artifacts so they're included in this push
git add index.html stats.html assets/

if ! git diff --cached --quiet; then
  git commit -m "chore: update build artifacts"
  echo "[pre-push] Build artifacts committed and included in push."
else
  echo "[pre-push] Build artifacts already up to date."
fi

exit 0
