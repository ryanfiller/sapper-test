---
title: Colocation of Images & Components
date: 2020-05-04
order: 50
emoji: ✅
---

# I want to put images in the same folder as my markdown and have them still work at build time.

For better organization and shorter import paths, its easier to keep content related to a blog post in the same directory.

``` text
└─ blog/
  └─ post-name/
    ├─ index.md
    | └─ images/
    |   └─ image.jpg
    └─ component.js
```

<img alt="Dale Gribble" src="images/_image.jpg" />

According to the [docs](https://sapper.svelte.dev/docs#static), Sapper _absolutely_ wants images inside the `static` directory. This means that during compilation, the images _have to_ end up there.

This can be done by using [`rollup-plugin-copy`](https://www.npmjs.com/package/rollup-plugin-copy) and configuring it to copy any files from post's image directory to `static/images`

``` javascript
import copy from 'rollup-plugin-copy'

export default {
  client: {
    ...
    plugins: [
      copy({
        targets: [
          { src: 'src/**/images/*.*', dest: 'static/images' }
        ]
      }),
    ]
  }
}
```

So that these don't end up in the repo twice, I also added `/static/images/*` to the main `.gitignore` file.