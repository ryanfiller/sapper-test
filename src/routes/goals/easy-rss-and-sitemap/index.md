---
title: Easy RSS Feed & Sitemap
date: 2020-05-04
order: 80
emoji: ✅
---

<style>
  iframe {
    width: 100%;
    height: 50vh;
    border: none;
  }
</style>

# I want an RSS feed and Sitemap that aren't a pain to make.

RSS is not easy. XML is a finicky specification that needs to be encoded and formatted in a specific way to be valid. Often, its also difficult to gather up all of the content on a site into one concise rss endpoint.

Sapper ships with the ability to support [json apis](https://sapper.svelte.dev/docs#Server_routes) within the app by creating a `index.json.js` file within any `route` directory. 

To create a route with the `.xml` extension, create an `rss.xml.js` file inside of the route directory. Inside of this route, we can use `node-fetch` against our own json api, then map through and create straightforward XML.

[`/goals/rss.xml`](/goals/rss.xml)

<iframe title="goals/rss " src="/goals/rss.xml"></iframe>

This can even be made more dynamic using a file or directory with [Sapper dynamic parameters](https://sapper.svelte.dev/docs#Pages), an example of which can be found at [this repo](https://github.com/sveltejs/hn.svelte.technology/blob/master/src/routes/%5Blist%5D/rss.js) from Rich Harris, creator of Svelte.

A similar approach can be taken to generate a sitemap, but using [Node's `readDirSync` function](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options) instead of `fetch` to look through the project file structure and construct an XML tree. Because of the `post-name/index.md` organization pattern I had to make some modifications, but [this post](https://www.zechtyounes.tech/blog/how-to-render-your-sitemap-xml-file-in-your-svelte-sapper-blog-2joh/) by Zechtyounes helped get 90% of the way there.

[`/sitemap.xml`](/sitemap.xml)

<iframe title="sitemap " src="/sitemap.xml"></iframe>

A NOTE: if there are not `<a>` tags with their `href` pointing to these pages, they won't be properly crawled when `sapper export` is run. The command in the `package.json` file can be modified to run with the [`--entry` flag](https://sapper.svelte.dev/docs#sapper_export) to include them.
