
# hn-button.com

This is the site behind the Hacker News button. It's split up into two parts:

- The `iframe` that loads on all the pages where you add the button.
- And the the `site` itself where you make your own button.

It also relies on a few key components:

- [`hn-button.js`](https://github.com/segmentio/hn-button.js) is the library that gets asynchronously loaded to initialize all of the Hacker News buttons on your page.

- [`hn-button-snippet`](https://github.com/segmentio/hn-button-snippet) is a simple component for rendering the snippet of code required to add a Hacker News button to your site.

The whole thing is open-source, so feel free to poke around and see what's going on. Even submit a pull request if you see anything funky :)

- Ian


## License (MIT)

Copyright (c) 2013 Segment.io - friends@segment.io

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.