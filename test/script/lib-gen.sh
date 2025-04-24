#!/bin/bash

ROOT_DIR=$(dirname "$(realpath "$0")")/../..
TEST_DIR="${ROOT_DIR}/test"

declare -A test_cases=(
  ["Integer.IsNegative"]="-2:true 0:false 9:false"
  ["Integer.IsPositive"]="-2:false 0:false 9:true"
  ["Integer.IsZero"]="-2:false 0:true 9:false"
  ["Integer.Opposite"]="-2:2 0:0 20:-20"
  ["Integer.Less"]="2|1:false -1|2:true -1|0:true 2|0:false 0|3:true 0|0:false 2|2:false -2|-2:false"
)

find "$TEST_DIR" -name "*.test.ts" -delete

declare -A processed_namespaces

for test_name in "${!test_cases[@]}"; do
  namespace="${test_name%%.*}"
  output_file="${TEST_DIR}/lib-${namespace}.test.ts"

  if [[ -z "${processed_namespaces[$namespace]}" ]]; then
    echo "// Auto-generated tests for ${namespace}" > "$output_file" # Make a new file (or clear) and write
    echo "" >> "$output_file"  # Append and write
    echo "import Integer from \"../lib/Integer\";" >> "$output_file"
    echo "import { Equal, Expect } from \"../utils\";" >> "$output_file"
    echo "" >> "$output_file"
    echo "type CaseLib${namespace} = [" >> "$output_file"
    processed_namespaces[$namespace]=1
  fi

  echo "  // ${test_name}" >> "$output_file"
  for pair in ${test_cases[$test_name]}; do
    IFS=":" read -r params expect <<< "$pair"
    IFS="|" read -ra args <<< "$params"

    # echo "🐵 Check Middle Args ${args[@]}"

    type_args=""
    for arg in "${args[@]}"; do
      type_args+="${arg}, "
      # echo "🐵 Check Middle Arg ${arg}"
    done
    type_args="${type_args%, }"
    # echo "🐵 Check Middle Arg ${type_args}"

    echo "  Expect<Equal<${test_name}<${type_args}>, ${expect}>>," >> "$output_file"
  done
  echo "" >> "$output_file"
done

for processed in "${!processed_namespaces[@]}"; do
  echo "]" >> "${TEST_DIR}/lib-${processed}.test.ts"
  echo "✅ Generated test files for namespace ${processed}"
done