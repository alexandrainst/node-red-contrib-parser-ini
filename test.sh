#!/bin/sh

# Test 1: Parse INI string to object
test1=$(printf '{"payload":"[section]\\nkey=value\\n"}' | node ./index.js parser-ini)
expected1='{"payload":{"section":{"key":"value"}}}'

if [ "$test1" != "$expected1" ]; then
	echo "Test 1 FAILED: Parse INI to object"
	echo "Expected: $expected1"
	echo "Got: $test1"
	exit 1
fi
echo "✓ Test 1 PASSED: Parse INI to object"

# Test 2: Serialize object to INI string
test2=$(printf '{"payload":{"section":{"key":"value"}}}' | node ./index.js parser-ini)
# The output should contain [section] and key=value
if ! echo "$test2" | grep -q '\[section\]' || ! echo "$test2" | grep -q 'key=value'; then
	echo "Test 2 FAILED: Serialize object to INI"
	echo "Got: $test2"
	exit 2
fi
echo "✓ Test 2 PASSED: Serialize object to INI"

# Test 3: Handle empty payload
test3=$(printf '{"payload":""}' | node ./index.js parser-ini)
expected3='{"payload":{}}'

if [ "$test3" != "$expected3" ]; then
	echo "Test 3 FAILED: Handle empty payload"
	echo "Expected: $expected3"
	echo "Got: $test3"
	exit 3
fi
echo "✓ Test 3 PASSED: Handle empty payload"

echo "✓ All tests PASSED"
exit 0
