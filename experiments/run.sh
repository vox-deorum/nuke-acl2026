#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/../../.." && pwd)"
agents_dir="$repo_root/vox-agents"

usage() {
  printf 'Usage: ./run.sh <experiment> <model> [oracle args...]\n'
  printf '\n'
  printf 'Examples:\n'
  printf '  ./run.sh ethical GLM-4.7\n'
  printf '  ./run.sh ethical-real-world GLM-4.7 --retrieve\n'
}

list_experiments() {
  find "$script_dir" -maxdepth 1 -type f -name 'nuke-*.js' ! -name 'nuke-oracle-utils.js' \
    -exec basename '{}' .js ';' \
    | sed 's/^nuke-//' \
    | sort \
    | sed 's/^/  /'
}

if [[ $# -lt 2 ]]; then
  usage >&2
  printf '\nAvailable experiments:\n' >&2
  list_experiments >&2
  exit 64
fi

experiment="$1"
model="$2"
shift 2

config_file="$script_dir/nuke-${experiment}.js"
config_arg="../temp/oracle/nuke-full/nuke-${experiment}.js"

if [[ ! -f "$config_file" ]]; then
  printf 'Unknown oracle experiment: %s\n' "$experiment" >&2
  printf 'Expected config file: %s\n' "$config_file" >&2
  printf '\nAvailable experiments:\n' >&2
  list_experiments >&2
  exit 66
fi

if [[ ! -d "$agents_dir" ]]; then
  printf 'Could not find vox-agents directory: %s\n' "$agents_dir" >&2
  exit 72
fi

if [[ $# -eq 0 ]]; then
  set -- --replay
fi

cd "$agents_dir"
MODEL="$model" npm run oracle -- -c "$config_arg" "$@"
