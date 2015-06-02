#!/usr/bin/env bash

set -eu
cd "$(dirname ${0})"

INPUT_FILE="${1}"
FILE_NAME="$(basename ${INPUT_FILE})"

mkdir -p 2560px
mkdir -p 2560px-40

convert "${INPUT_FILE}" -resize 2560x2560\> "2560px/${FILE_NAME}"

jpeg-recompress -m 40 "2560px/${FILE_NAME}" "2560px-40/${FILE_NAME}"
jpeg-recompress       "2560px/${FILE_NAME}" "2560px/${FILE_NAME}"

mogrify -profile 8BIMTEXT:exif.txt "2560px-40/${FILE_NAME}"
mogrify -profile 8BIMTEXT:exif.txt "2560px/${FILE_NAME}"
