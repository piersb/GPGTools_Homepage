#!/bin/bash

function echoError() {
	if [[ -t 1 ]] ;then
		echo -e "\033[1;31m$*\033[0m" >&2
	else
		echo "$*" >&2
	fi
}


pushd "${0%/*}/config" >/dev/null || exit 1
errorFound=0

for file in *.json ;do
	if ! error=$(python -mjson.tool <"$file" 2>&1 >/dev/null) ;then
		echoError "$file: $error"
		errorFound=1
	fi
done

popd >/dev/null

exit $errorFound
