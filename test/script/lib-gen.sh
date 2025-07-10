#!/bin/bash

ROOT_DIR=$(dirname "$(realpath "$0")")/../..
TEST_DIR="${ROOT_DIR}/test"

declare -A test_cases=(
  ["Integer.IsNegative"]="-2∷true 0∷false 9∷false"
  ["Integer.IsPositive"]="-2∷false 0∷false 9∷true"
  ["Integer.IsZero"]="-2∷false 0∷true 9∷false"
  ["Integer.Opposite"]="-2∷2 0∷0 20∷-20"
  ["Integer.Lower"]="2‖1∷false 1‖2∷true 2‖-1∷false -1‖2∷true -3‖-2∷true -2‖-3∷false -1‖0∷true 2‖0∷false 0‖3∷true 0‖-3∷false 0‖0∷false 2‖2∷false -2‖-2∷false"
  ["Integer.Greater"]="2‖1∷true 1‖2∷false 2‖-1∷true -1‖2∷false -3‖-2∷false -2‖-3∷true -1‖0∷false 2‖0∷true 0‖3∷false 0‖-3∷true 0‖0∷false 2‖2∷false -2‖-2∷false"
  ["Integer.Eq"]="2‖1∷false 1‖2∷false 2‖-1∷false -1‖2∷false -3‖-2∷false -2‖-3∷false -1‖0∷false 2‖0∷false 0‖3∷false 0‖-3∷false 0‖0∷true 2‖2∷true -2‖-2∷true"
  ["Integer.Neq"]="2‖1∷true 1‖2∷true 2‖-1∷true -1‖2∷true -3‖-2∷true -2‖-3∷true -1‖0∷true 2‖0∷true 0‖3∷true 0‖-3∷true 0‖0∷false 2‖2∷false -2‖-2∷false"
  ["Integer.LowerEq"]="2‖1∷false 1‖2∷true 2‖-1∷false -1‖2∷true -3‖-2∷true -2‖-3∷false -1‖0∷true 2‖0∷false 0‖3∷true 0‖-3∷false 0‖0∷true 2‖2∷true -2‖-2∷true"
  ["Integer.GreaterEq"]="2‖1∷true 1‖2∷false 2‖-1∷true -1‖2∷false -3‖-2∷false -2‖-3∷true -1‖0∷false 2‖0∷true 0‖3∷false 0‖-3∷true 0‖0∷true 2‖2∷true -2‖-2∷true"
  ["Integer.Add"]="2‖3∷5 -2‖2∷0 -2‖-6∷-8 3‖-3∷0 3‖-2∷1 -2‖1∷-1 0‖0∷0 -2‖0∷-2 2‖0∷2 0‖20∷20 0‖-30∷-30"
  ["Integer.Inc"]="2∷3 0∷1 -1∷0 -30∷-29"
  ["Integer.Sub"]="2‖3∷-1 3‖2∷1 -2‖3∷-5 -2‖-3∷1 -9‖-2∷-7 2‖0∷2 -3‖0∷-3 0‖2∷-2 0‖-3∷3 0‖0∷0 2‖2∷0 -3‖-3∷0"
  ["Integer.Dec"]="2∷1 0∷-1 1∷0 -3∷-4"
  ["Integer.Divide"]="2‖3∷0 4‖2∷2 9‖-3∷-3 9‖-2∷-4 9‖0∷never -2‖-3∷0 -4‖2∷-2 4‖4∷1 4‖-4∷-1 -4‖-4∷1"
  ["Integer.Mod"]="2‖2∷0 3‖2∷1 -3‖-2∷1 -3‖2∷-1 9‖5∷4"
  ["Integer.IsOdd"]="1∷true 2∷false 0∷false -3∷true -19∷true 20∷false"
  ["Integer.IsEven"]="1∷false 0∷true -22∷true 19∷false"

  ["Array.CreateArrayFromLength"]="2∷[undefined,undefined] 3‖string∷[string,string,string] 0∷[] -1∷[]"
  ["Array.At"]="[1,2,3]‖2∷3 [1,2,3,4]‖0‖∷1 []‖1∷never []‖-1∷never []‖0∷never"
  ["Array.Concat"]="[1,2,3]‖[2,3,1]∷[1,2,3,2,3,1]"
  ["Array.MultipleConcat"]="[[1,2,3],[4,2,3],[undefined,true]]∷[1,2,3,4,2,3,undefined,true] [[],[1],[],[2]]∷[1,2] [[[2]],[1]]∷[[2],1]"
  ["Array.Fill"]="[1,2,3]‖\"3\"∷[\"3\",\"3\",\"3\"] [0,9,1]‖\"1\"‖1‖2∷[0,\"1\",1] [\"head\",9,1]‖true‖1∷[\"head\",true,true] [1,2,3]‖\"3\"‖2‖1∷[1,2,3] [1,2,3]‖\"3\"‖-4‖2∷[\"3\",\"3\",3] [1,2,3]‖\"3\"‖-2‖3∷[1,\"3\",\"3\"] [1,2,3]‖\"3\"‖7‖2∷[1,2,3] [1,2,3]‖\"3\"‖1‖-1∷[1,\"3\",3]"
  ["Array.IsFlatten"]="[1,2,3]∷true []∷true [[]]∷false [1,[2],3]∷false [[],1,2]∷false [1,[1,2,[]],undefined]∷false"
  ["Array.Flat"]="[1,2,3]∷[1,2,3] [1,2,3,[]]∷[1,2,3] [1,2,[3]]∷[1,2,3] [1,2,[3,[0]]]∷[1,2,3,0] []∷[] [[]]∷[] [[[1]]]∷[1]"
  ["Array.Includes"]="[1,2,3]‖1∷true [1,2,3]‖-1∷false []‖\"\"∷false [\"\"]‖\"\"∷true [[]]‖[]∷true [[1]]‖1∷false"
  ["Array.IndexOf"]="[1,2,3]‖1∷0 [1,[2],3]‖[2]∷1 []‖0∷-1 [1,2,3]‖4∷-1 [1,2,1]‖1∷0"
  ["Array.LastIndexOf"]="[1,2,1,2,1,3,4]‖1∷4 []‖1∷-1 [1,2,3]‖0∷-1 [[],[[]],[],[]]‖[[]]∷1 [()=>{},(a:string)=>{},(b:string)=>{},()=>{}]‖(c:string)=>{}∷2 [{a:string},{},{b:string}]‖{}∷1"
  ["Array.Join"]="[1,2,3]∷\"1,2,3\" [-1,\".\",9]‖\"-\"∷\"-1-.-9\" [1,2,3]‖\"\"∷\"123\""
  ["Array.Pop"]="[1,2,3]∷[1,2] [1]‖\"get-rest\"∷[] []‖\"get-rest\"∷never [1,2,3]‖\"get-pop-element\"∷3 [1]‖\"get-pop-element\"∷1 []‖\"get-pop-element\"∷never"
  ["Array.Push"]="[1,2,3]‖\"1\"∷[1,2,3,\"1\"] []‖1∷[1] []‖[]∷[[]]"
  ["Array.Shift"]="[1,2,3]∷[2,3] [\"1\"]∷[] []‖\"get-rest\"∷never [1,2,3]‖\"get-shift-element\"∷1 [\"1\"]‖\"get-shift-element\"∷\"1\""
  ["Array.Unshift"]="[1,2,3]‖4∷[4,1,2,3] []‖[]∷[[]] [1]‖[]∷[[],1] []‖1∷[1] [{a:1},{b:2}]‖{c:3}∷[{c:3},{a:1},{b:2}] [[1,2],[3,4]]‖[5,6]∷[[5,6],[1,2],[3,4]] [1|2,3]‖4|5∷[4|5,1|2,3] []‖{a:string,b:number}∷[{a:string,b:number}] [{x:number}]‖{y:boolean}∷[{y:boolean},{x:number}]"

  ["BigInteger.ToString"]="2n∷\"2\" -2n∷\"-2\" 0n∷\"0\""
  ["BigInteger.IsNegative"]="-23n∷true 26n∷false 0n∷false"
  ["BigInteger.IsPositive"]="90n∷true 0n∷false -8n∷false"
  ["BigInteger.IsZero"]="0n∷true 29n∷false -2n∷false"
  ["BigInteger.Opposite"]="0n∷0n 23n∷-23n -12n∷12n"
  ["BigInteger.Eq"]="0n‖0n∷true -12n‖-12n∷true 23n‖22n∷false 23n‖-23n∷false"
  ["BigInteger.Lower"]="23n‖123n∷true 23n‖23n∷false 1234n‖1235n∷true -123n‖90n∷true 123n‖-90n∷false 0n‖0n∷false -2n‖-2n∷false 12345n‖12345n∷false"

  ["String.Length"]="\"abs\"∷3 \"\"∷0 \"2222_2222_2222_2222_2222\"∷24"
  ["String.At"]="\"123456789\"‖0∷\"1\" \"123456789\"‖2∷\"3\" \"123456789\"‖-3∷\"7\" \"123456789\"‖100∷never"
  ["String.Concat"]="[\"12\",\"ab\"]∷\"12ab\" [\"love\"]∷\"love\" []∷\"\""
  ["String.SubString"]="\"LoveYouHuaier\"∷\"LoveYouHuaier\" \"LoveYouHuaier\"‖4∷\"YouHuaier\" \"LoveYouHuaier\"‖4‖9∷\"YouHu\" \"LoveYouHuaier\"‖3‖-2∷\"eYouHuai\" \"LoveYouHuaier\"‖-7‖-2∷\"uHuai\" \"LoveYouHuaier\"‖0‖0∷\"\" \"LoveYouHuaier\"‖-1‖-1∷\"\" \"LoveYouHuaier\"‖8‖7∷\"\""
  ["String.EndsWith"]="\"What?\"‖\"?\"∷true \"What?\"‖\"What?\"∷true \"What?\"‖\"SoWhat?\"∷false \"What?\"‖\"t?\"∷true \"What?\"‖\"W?\"∷false \"What?\"‖\"\"∷true \"\"‖\"test\"∷false \"\"‖\"\"∷true \"What?\"‖\"?\"‖5∷true \"What?\"‖\"t?\"‖3∷false \"\"‖\"\"‖2∷true"
  ["String.Includes"]="\"AshGrey\"‖\"Ash\"∷true \"AshGrey\"‖\"A\"∷true \"AshGrey\"‖\"a\"∷false \"AshGrey\"‖\"\"∷true \"AshGrey\"‖\"Ash\"‖0∷true \"AshGrey\"‖\"Ash\"‖1∷false \"AshGrey\"‖\"Ash\"‖-1∷true"

  ["Boolean.And"]="false‖false∷false false‖true∷false true‖false∷false true‖true∷true"
  ["Boolean.Or"]="false‖false∷false false‖true∷true true‖false∷true true‖true∷true"
  ["Boolean.Not"]="false∷true true∷false"
  ["Boolean.Nand"]="false‖false∷true false‖true∷true true‖false∷true true‖true∷false"
  ["Boolean.Nor"]="false‖false∷true false‖true∷false true‖false∷false true‖true∷false"
  ["Boolean.MultipleAnd"]="[true,true,true]∷true [true,false,true]∷false [false,false,false]∷false"
  ["Boolean.MultipleOr"]="[true,true,true]∷true [true,false,false]∷true [false,false,false]∷false"
)

function repeat {
  char=$1
  len=$2

  result=""
  for ((i=1; i<=$len; i++)); do
    result+=$char
  done
  echo "$result"
  return 0
}

find "$TEST_DIR" -name "*.test.ts" -delete

declare -A processed_namespaces

for test_name in "${!test_cases[@]}"; do
  namespace="${test_name%%.*}"
  output_file="${TEST_DIR}/lib-${namespace}.test.ts"

  if [[ -z "${processed_namespaces[$namespace]}" ]]; then
    echo "//////////////////////////////////////////////////////////////$(repeat "/" ${#namespace})" > "$output_file" # Make a new file (or clear) and write
    echo "//                                                          $(repeat " " ${#namespace})//" >> "$output_file"
    echo "// This ${namespace} test file is auto-generated by \"script/lib-gen.sh\" //" >> "$output_file"
    echo "//                                                          $(repeat " " ${#namespace})//" >> "$output_file"
    echo "//////////////////////////////////////////////////////////////$(repeat "/" ${#namespace})" >> "$output_file"
    echo "" >> "$output_file"  # Append and write
    echo "import ${namespace} from \"../lib/${namespace}\";" >> "$output_file"
    echo "import { Equal, Expect } from \"../utils\";" >> "$output_file"
    echo "" >> "$output_file"
    echo "type CaseLib${namespace} = [" >> "$output_file"
    processed_namespaces[$namespace]=1
  fi

  echo "  // ${test_name}" >> "$output_file"
  for pair in ${test_cases[$test_name]}; do
    IFS="∷" read -r params expect <<< "$pair"
    IFS="‖" read -ra args <<< "$params"

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