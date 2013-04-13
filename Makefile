release: clean build

components: component.json
	component install

css:
	sass --compass --style expanded lib/hn-button.sass:lib/hn-button.css

build: components css
	component build --copy --name hn-button --standalone HN
	uglifyjs --no-copyright --output build/hn-button.min.js build/hn-button.js
	inliner lib/hn-button.html > build/hn-button.min.html
	rm lib/hn-button.css

clean:
	rm -fr components build

server:
	foreman start

test-server:
	node test/server.js

test:
	open http://localhost:7777

.PHONY: test