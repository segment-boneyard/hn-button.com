release: clean build

build: components css
	component build
	inliner lib/hn-iframe.html > build/hn-iframe.min.html
	rm lib/hn-iframe.css # build/hn-button.js

clean:
	rm -fr components build

components: component.json
	component install

css:
	sass --compass --style expanded lib/hn-iframe.sass:lib/hn-iframe.css

server:
	foreman start

test-server:
	node test/server.js

test:
	open http://localhost:7777

.PHONY: test