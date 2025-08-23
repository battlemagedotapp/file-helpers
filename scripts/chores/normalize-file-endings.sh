find . -type f -not -path './.git/*' -not -path '*/node_modules*' -not -path './.husky/_*' -not -path '*/.turbo*' | xargs sed -i 's/\r//g; s/$/\r/'
echo "Script finished"
echo "Test current file endings using: git ls-files --eol"