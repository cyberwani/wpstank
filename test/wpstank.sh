#!/bin/bash

clean()
{
	rm -rf .wpstank* library
}

init()
{
	wpstank init
}

assert()					# If condition false,
{							#+ exit from script
							#+ with appropriate error message.
	E_PARAM_ERR=98
	E_ASSERT_FAILED=99

	RED="\x1b[31m"
	GREEN="\x1b[32m"
	RESET="\x1b[0m"

	msg=$2
	lineno=$3

	if [ $1 ] 
	then
		echo -e "\t$GREEN\xE2\x9C\x93	$2$RESET"
	else
		echo -e "\t$RED\xC3\x97	$2$RESET"
	fi	
} # Insert a similar assert() function into a script you need to debug.		

warning()
{
	echo -e "\x1b[33m$1\x1b[0m"
}

clean

warning "Command Line Interface Testing"
echo "==================================="
warning "Initialize"
assert "! -e .wpstank.json " "Settings file does not exists"
assert "! -d .wpstank " "Template directory does not exist"

msg=$(wpstank init)
init=$(echo $msg | grep -i initializing | wc -l)
stamp1=$(stat -f "%Sm" .wpstank.json | md5)

assert "-e .wpstank.json" "Settings file exists"
assert "-d .wpstank " "Template directory exists"
assert "$init -eq 1" "tells you that it is initializing"

msg=$(wpstank init)
force=$(echo $msg | grep -i force | wc -l)
init=$(echo $msg | grep -i initializing | wc -l)
assert "$force -eq 1" "stank will not init twice"
assert "$force -eq 1" "stank prompts you to use --force to re init"

sleep 1s
count=$(wpstank init --force | grep -i force | wc -l)
stamp2=$(stat -f "%Sm" .wpstank.json | md5)
assert "$stamp1 != $stamp2" "stank overwrites the new file"

warning "Resource generation"
warning "  before"

# Post Type
assert "! -e library/cpt/job.php" "Job CPT does not exist"
assert "! -e library/taxonomy/event.php" "Event taxonomy does not exist"
assert "! -e library/shortcode/event.php" "Event shortcode does not exist"
assert "! -e library/php/pages/staff.php" "Staff page does not exist"

warning "  after"
warning "    standard resources"

count=$(wpstank -gp job | grep -i adding | wc -l)
assert "-e library/php/cpt/job.php" "Job CPT exists"
assert "$count -eq 1" "Shows action message that custom post type was added"

# Taxonomy
count=$(wpstank -gt event | grep -i adding | wc -l)
assert "-e library/php/taxonomy/event.php" "Event taxonomy exists"
assert "$count -eq 1" "Shows action message that custom taxonomy was added"

# Shortcode
count=$(wpstank -gs event | grep -i adding | wc -l)
assert "-e library/php/shortcode/event.php" "Event shortcode exists"
assert "$count -eq 1" "Shows action message that shortcode was added"

# Custom
warning "    custom resources"
wpstank -gc page:staff > /dev/null
count=$(wpstank -gc page:staff | grep -i "no template" | wc -l)
assert "$count -eq 1" "Tells user to add template file"

## add the template file
echo "{{page}}" > .wpstank/page.php

count=$(wpstank -gc page:staff | grep -i "define page" | wc -l)
assert "$count -eq 1" "Tells user to define the resource in .wpstank.json"

sed -i -r 's;(omy",);\1"page": "library/php/pages",;' .wpstank.json
wpstank -gc page:staff > /dev/null
assert " -e library/php/pages/staff.php" "Staff page exists"

warning "Overwrites"
wpstank -gp job --force > /dev/null
stamp1=$(stat -f "%Sm" library/php/cpt/job.php | md5)
sleep 1s
wpstank -gp job > /dev/null
stamp2=$(stat -f "%Sm" library/php/cpt/job.php | md5)

assert "$stamp1 == $stamp2" "Does not overwrite file without --force"
assert "$(wpstank -gp job | grep -o 'force' | wc -l) -eq 1" "Prompts for --force to overwrite file"

wpstank -gp job --force > /dev/null
stamp2=$(stat -f "%Sm" library/php/cpt/job.php | md5)
assert "$stamp1 != $stamp2" "Overwrites file with --force"
