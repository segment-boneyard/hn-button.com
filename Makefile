
build: components
	component build --out ./public --copy # no symlinks for heroku
	cd ./lib/iframe; make
	make hn-button.js

clean:
	rm -fr components public

components: component.json
	component install

hn-button.js:
	curl https://raw.github.com/segmentio/hn-button.js/master/hn-button.js > public/hn-button.js
	curl https://raw.github.com/segmentio/hn-button.js/master/hn-button.min.js > public/hn-button.min.js

server:
	foreman start

test-server:
	node test/server.js

test:
	open http://localhost:7777

.PHONY: test