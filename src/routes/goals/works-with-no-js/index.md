---
title: Works With No Client JS
date: 2020-05-04
order: 10
emoji: ✅
---

# I want the site to work with progressive enhancement, so that if a browser has javascript deactivated the site will still function.

JavaScript is great. But, there's a of valid reasons that a user might disable it in their browser. It's a huge bummer when sites don't work without it - visit [instagram.com](https://www.instagram.com) and disable JavaScript ([Firefox](https://support.mozilla.org/en-US/questions/994809) / [Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/disable)). 

Nothing loads. Lame.


Out of the box, Sapper supports ["server-rendered views with client-side hydration"](https://sapper.svelte.dev/docs#What_is_Sapper). This means that during compilation it builds HTML pages, and then when those pages are served to a user JavaScript will take over and rehydrate, or [progressively enhance](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/), the site. `<a>` tags will still work and link to pages with no clientside JavaScript, but these are picked up and loaded using a JavaScript router if the user allows this.
