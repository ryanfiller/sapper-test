---
title: Global Components
date: 2020-05-04
order: 20
emoji: ✅
---

# I want the ability to wrap my site in a header and footer that do not re-render between pages so I can do cool animations.

The best part of using a JavaScript framework is leaving traditional hard page loads behind. This lets pages partially render some elements while persisting others on the screen. This can be used for many things, including transition animations, but only if the framework allows for some components to not be reloaded during url changes.

By default, Sapper provides a [`<Layout>` component](https://sapper.svelte.dev/docs#Layouts) that will wrap each page and all components existing outside of the page `<slot>` to keep existing as pages are created and destroyed based on route changes.

Each page is also provided with a `segment` prop so that logic and styling can be applied based on the current page.

[mdsvex](https://mdsvex.com/docs#layout) adds even more power to the `<Layout>` functionality by allowing each different type of post to be rendered with its own layout.
