---
title: JavaScript in Markdown
date: 2020-05-04
order: 30
emoji: ✅
---

<script>
  import Button from './_button.svelte'
</script>

# I want to be able to easily use custom components in my markdown.

[MDX](https://mdxjs.com/) is a build tool that originated in the React community that processes Markdown files so that JSX can be used inline inside of them. This is an indispensable tool for anyone writing about code who wants to show on page examples.

Luckily, Svelte has [mdsvex](https://mdsvex.pngwn.io/), its own preprocessor that does exactly the same thing.

To set this up, `mdsvex` needs to be imported into the `rollup.config.js` file.

``` javascript
import { mdsvex } from 'mdsvex'
```

It then needs to be added to both the `client` and `server` configuration objects. By default it will process `.svx` file, but it can be configured work with any extension, like the more common `.md`.

``` javascript
  svelte({
    extensions: ['.svelte', '.md'],
    preprocess = [
      mdsvex({ extension: '.md' }
    ]
  })
```

Lastly, the `dev`,`build`, and `export` commands in `package.json` need to be modified to be made aware of these extensions with the `--ext` flag when they run.

``` node
"dev": "sapper dev --ext '.svelte .md'",
"build": "sapper build --legacy --ext '.svelte .md'",
"export": "sapper export --legacy --ext '.svelte .md'"
```

Now, components can be imported inside of a `<script>` tag, just like any other Svelte page, as used directly inside of markup!

```
<script>
  import Button from './_button.svelte'
</script>

<Button />
```

<Button />

Neat!