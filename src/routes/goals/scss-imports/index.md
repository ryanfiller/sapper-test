---
title: SCSS Imports
date: 2020-05-04
order: 70
emoji: ✅
---

# I want to be able to import a global scss file with functions into my components.

Svelte automatically comes with [component scoped styles](https://svelte.dev/docs#style). As much as CSS has added in the last few years, like custom-properties, SCSS can still be useful - `@mixins` for breakpoints, color manipulation functions, looping through values to create animations, just to name a few.

Because Svelte is already a compilation process, [`svelte-preprocess`](https://www.npmjs.com/package/svelte-preprocess) is a package that makes it easy to add to the compilation pipeline. [This post](https://linguinecode.com/post/add-sass-svelte-js) by Ruben Leija walks through how to bind `node-sass` to the `svelte-preprocess` pipeline. 

After this is set up in `rollup.config.js`, a `type="text/scss"` attribute can be added to Svelte's `<style>` tags. This allows for SCSS to be written directly inside of the component, or to import standalone .scss files.

``` html
<style type="text/scss">
  @import '../functions.scss';

  p {
    font-size: 12px;

    span {
      font-style: italic;
    }
  }

  @include small() {
    p {
      font-size: 16px;
    }
  }
</style>
```
