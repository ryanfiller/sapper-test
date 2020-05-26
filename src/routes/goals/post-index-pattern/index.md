---
title: post/index File Structure
date: 2020-05-04
order: 50
emoji: ✅
---

# I want to be able to make a folder with the post name and have the post live inside of it as `index.md`.

In order to use markdown files to make a blog with Sapper, two things matter - the page needs to exist, and there needs to be a programmatic way to find its url. This translates to the two types of Sapper routes - Pages and Server Routes

The first, in a roundabout way, is provided by Sapper by default.

Normally, pages generated from markdown content would follow the [dynamic route pattern](https://sapper.svelte.dev/docs#Pages), but they need to be treated as regular page files, without the `_` prefeix, to be picked up by mdsvex. Since Sapper natively supports the ES6 module/index.js pattern, this automatically works.

``` text
└─ posts/
  └─ post-one/
    └─ index.md
  └─ post-two/
    └─ index.md
```

The second, despite the use of mdsvex, needs to be accomplished using Server Routes the traditional Sapper way. [This post](https://www.mahmoudashraf.dev/goals/build-a-goals-with-svelte-and-markdown) by Mahmoud Ashraf is super helpful in showing how to create an `index.json.js` file that Sapper will put at `/posts.json`. To use the module index file pattern, the `fs.readdirSync` function needs to be modified to look into the post directories and resolve their `index.md` file.

``` javascript
const posts = fs.readdirSync(route)
	.filter(file => isDir(`${route}/${file}`))
	.map(file => {
		const post = fs.readFileSync(path.resolve(route, `${file}/index.md`), 'utf-8')
		return {...post, slug: file}
	})
  ```

This will create a json endpoint that can then be `fetch`ed against on the `post/index.svelte` page and its data used to built a list of links to each post.

``` javascript 
<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`/posts.json`)
    .then(r => r.json())
    .then(posts => {
      return { posts };
    });
  }
</script>

<ul>
  {#each posts as post}
    <li><a href='posts/{post.slug}'>{post.title}</a></li>
  {/each}
</ul>
```
