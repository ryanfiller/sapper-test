---
title: Automatic Markdown Processing
date: 2020-05-04
order: 35
emoji: ✅
---

# I want to be able to automatically replace native HTML elements with JavaScript components after after my Markdown is processed.

Once [mdsvex](/goals/javascript-in-markdown) works on the site, the next bit of [progressive enhancement](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/) is to have Sapper replace vanilla markdown elements with more complex Svelte components.

``` markdown
![just a test](image.jpg)
```

normally would compile to

``` html
<img src="image.jpg" alt="just a test" />
```

The order in which the mdsvex pipeline works means that only markdown will be transformed, _not_ html in markdown, so that means a plugin is needed to add any attributes outside of standard markdown syntax. Luckily, mdsvex now fully supports [`remark` and `rehype` plugins](https://mdsvex.com/docs#remarkplugins--rehypeplugins), so adding [`remark-attr`](https://www.npmjs.com/package/remark-attr) is as easy as adding it to the configuration in `rollup.config.js`.


``` markdown
![just a test](image.jpg){align='right'}
```

can now become

``` html
<figure class="align-right">
    <img src="image.jpg" alt="just a test" />
    <figcaption>just a test</figcaption>
</figure>
```

Here it is, working!

![just a test](images/_image.jpg){align='right'}

To get this to work automatically on all markdown files parsed by a certain mdsvex layout, an object of [custom components](https://mdsvex.com/docs#custom-components) can be important and exported in a module script in that layout file.

``` javascript
<script context="module">
  import { h1, p li } from './components.js';
  export { h1, p, li };
</script>
```
