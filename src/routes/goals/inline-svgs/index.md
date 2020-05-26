---
title: Inline SVGs
date: 2020-05-04
order: 60
emoji: ✅
---

<script>
    import N64 from "./images/_svg.svg";
</script>

<style>
  :global(.animate-svg) {
    animation: colorShift 5s infinite alternate;
    height: 33vw;
    margin: 0 auto;
  }

  @keyframes colorShift {
    0% { filter: hue-rotate(0); }
    100% { filter: hue-rotate(180deg); }
  }
</style>

# I want to be able to import an SVG and use it as a component.

SVGs are cool. And since they are comprised of XML, they can be used both as as replaced content with an `<img>` tag, or embedded directly into HTML. There are benefits to doing both, but rendering them as part of the markup allows their paths to be directly effected by CSS.
 
<N64 class='animate-svg' />

In order to import them as Svetle components, a [rollup plug](https://www.npmjs.com/package/rollup-plugin-svelte-svg) is required. `rollup-plugin-svelte-svg` can be configured in `rollup.config.js`, then SVG files are transformed by rollup and can be import and used like any other Svelte component. Attributes can even be passed to them and they will be rendered into the DOM.

``` javascript
<script>
  import SVG from "./_svg.svg";
</script>

<SVG class='animate' />
```
