while getopts "l:c:" opt; do
	case "$opt" in 
		l) LANG="$OPTARG" ;;
		c) CATEGORY="$OPTARG" ;;
	esac
done

cd "$HOME"/Projects/CV
node index.js --lang $LANG --cat $CATEGORY
