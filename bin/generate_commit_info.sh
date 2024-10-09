#!/bin/bash

# Function to determine if running in CI
is_ci_environment() {
  if [ -n "$CI" ] || [ -n "$GITHUB_ACTIONS" ] || [ -n "$CIRCLECI" ] || [ -n "$JENKINS_HOME" ]; then
    return 0  # True
  else
    return 1  # False
  fi
}

# Default to auto-detecting the environment
ENVIRONMENT_MODE="auto"

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --ci) ENVIRONMENT_MODE="ci" ;;
    --local) ENVIRONMENT_MODE="local" ;;
    *) echo "Unknown parameter passed: $1"; exit 1 ;;
  esac
  shift
done

# Determine the environment mode
if [ "$ENVIRONMENT_MODE" = "ci" ] || { [ "$ENVIRONMENT_MODE" = "auto" ] && is_ci_environment; }; then
  echo "Running in CI environment."

  # Ensure required variables are set
  : "${CI_COMMIT_MESSAGE:?CI_COMMIT_MESSAGE is not set}"
  : "${CI_PIPELINE_URL:?CI_PIPELINE_URL is not set}"
  : "${CI_PROJECT_NAME:?CI_PROJECT_NAME is not set}"
  : "${CI_COMMIT_SHA:?CI_COMMIT_SHA is not set}"
  : "${CI_COMMIT_AUTHOR:?CI_COMMIT_AUTHOR is not set}"
  : "${CI_COMMIT_REF_NAME:?CI_COMMIT_REF_NAME is not set}"
  : "${CI_ENVIRONMENT_NAME:?CI_ENVIRONMENT_NAME is not set}"
  : "${DEPLOY_NOTIFICATION_TOKEN:?DEPLOY_NOTIFICATION_TOKEN is not set}"
  : "${DEPLOY_NOTIFICATION_RECIPIENTS:?DEPLOY_NOTIFICATION_RECIPIENTS is not set}"

  # Escape special characters in commit message and pipeline URL
  COMMIT_MESSAGE=$(echo "$CI_COMMIT_MESSAGE" | sed 's/"/\\"/g' | tr -d '\n')
  PIPELINE_URL=$(echo "$CI_PIPELINE_URL" | sed 's/"/\\"/g')

  # Use CI environment variables
  DEPLOY_NOTIFICATION_TOKEN="$DEPLOY_NOTIFICATION_TOKEN"
  APP_NAME="$CI_PROJECT_NAME"
  COMMIT_SHA="$CI_COMMIT_SHA"
  DEPLOYMENT_TIME="$(date -u)"
  AUTHOR="$CI_COMMIT_AUTHOR"
  BRANCH_NAME="$CI_COMMIT_REF_NAME"
  ENVIRONMENT_NAME="$CI_ENVIRONMENT_NAME"
  RECIPIENTS="$DEPLOY_NOTIFICATION_RECIPIENTS"
else
  echo "Running locally."

  # Get information from git commands
  COMMIT_MESSAGE=$(git log -1 --pretty=%B | sed 's/"/\\"/g' | tr -d '\n')
  PIPELINE_URL="" # Set to empty or provide a default value
  DEPLOY_NOTIFICATION_TOKEN="${DEPLOY_NOTIFICATION_TOKEN:-default_token}"
  APP_NAME="$(basename "$(git rev-parse --show-toplevel)")"
  COMMIT_SHA=$(git rev-parse HEAD)
  DEPLOYMENT_TIME="$(date -u)"
  AUTHOR=$(git show -s --format='%an <%ae>' HEAD)
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
  ENVIRONMENT_NAME="${ENVIRONMENT_NAME:-local}"
  RECIPIENTS="${DEPLOY_NOTIFICATION_RECIPIENTS:-}"
fi

# Generate commit_info.json
cat <<EOF > commit_info.json
{
  "token": "${DEPLOY_NOTIFICATION_TOKEN}",
  "appname": "${APP_NAME}",
  "version": "${COMMIT_SHA}",
  "message": "${COMMIT_MESSAGE}",
  "pipeline_url": "${PIPELINE_URL}",
  "deployment_time": "${DEPLOYMENT_TIME}",
  "author": "${AUTHOR}",
  "branch_name": "${BRANCH_NAME}",
  "environment_name": "${ENVIRONMENT_NAME}",
  "recipients": "${RECIPIENTS}"
}
EOF

echo "commit_info.json generated successfully."
