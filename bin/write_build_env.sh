#!/bin/bash

# Generate the BUILD_INFO ENV var
BUILD_INFO=$(./bin/generate_build_info.sh | tr -d '\n' | sed 's/"/\\"/g')

# Overwrite .env.build with the new BUILD_INFO and any other local build variables
cat <<EOF > .env.build
# This file gets written by before deploy (see yarn deploy)
BUILD_INFO="$BUILD_INFO"
EOF
