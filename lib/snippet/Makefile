template:
	inliner snippet.html > snippet.min.html
	# sed -i '' s/}}/}\;}/g snippet.min.html # un-minify `}}` for minstache
	minstache < snippet.min.html > index.js

.PHONY: template