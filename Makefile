release: clean build

build: components hn-button.js
	component build
	cd ./lib/iframe; make

clean:
	rm -fr components build

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