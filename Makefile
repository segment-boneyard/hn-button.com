release: clean build

build: components
	component build --copy --name hn-button --standalone HN
	uglifyjs --no-copyright --output build/hn-button.min.js build/hn-button.js

components: component.json
	component install

clean:
	rm -fr components build

server:
	node index.js

test-server:
	node test/server.js

test:
	open http://localhost:7777

.PHONY: test