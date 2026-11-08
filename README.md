# timotei.blog

This is Gabe and Elyse's personal website. It has four parts:

- **Home**: the front page, with a short hello and links to everything else.
- **Travel**: write-ups (and videos) of trips we've taken together.
- **Recipes**: our recipe book, with a meal planner, grocery lists, and cooking-day calendar events.
- **Wedding**: one page about our wedding, with the story, a video, and photos.

You don't need to know how to code to add or change posts. Every post is a plain text file,
and this guide walks through everything you need.

---

## Where things live

You only need to know about two folders:

| Folder             | What's in it                                             |
| ------------------ | -------------------------------------------------------- |
| `src/lib/content/` | All the writing. One text file per post.                 |
| `static/images/`   | All the pictures used on the site (covers, photos, etc). |

Inside `src/lib/content/` there is one folder per section:

| Folder             | Shows up on                                      |
| ------------------ | ------------------------------------------------ |
| `content/travel/`  | The **Travel** page                              |
| `content/wedding/` | The **Wedding** page (one file only, `index.md`) |

The recipes aren't text files. They live in `src/lib/recipes/data.ts`.

Everything else in the project is the machinery that turns these files into a website. You can
leave it alone.

---

## Writing a new post

### 1. Make a new file

Create a new file in the right folder (for example `src/lib/content/travel/`). The easiest way is
to copy an existing post and change it.

The **file name becomes the web address**, so keep it short, lowercase, and use dashes instead
of spaces. It must end in `.md`.

- `rome-in-april.md` (in `travel/`) becomes `timotei.blog/travel/rome-in-april`

Two travel posts can't have the same file name.

### 2. Fill in the details at the top

Every post starts with a small block of details between two lines of three dashes (`---`).
This tells the site the title, date, and so on. It looks like this:

```
---
title: 'The Garden Project'
date: '2026-08-05'
excerpt: 'An update on the raised beds, and an honest accounting of what has survived.'
cover: '/images/garden-cover.jpg'
---
```

What each line means:

| Line       | Required? | What it does                                                                                                       |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `title`    | Yes       | The post's headline.                                                                                               |
| `date`     | Yes       | Written as year-month-day, like `'2026-08-05'`. Posts are listed newest first using this date.                     |
| `excerpt`  | Yes       | One or two sentences shown on the post's card on the Travel page.                                                  |
| `cover`    | No        | The main picture. See "Adding pictures" below.                                                                     |
| `location` | No        | Where it happened, like `'Lisbon, Portugal'`. Shows next to the date on cards, travel posts, and the wedding page. |
| `video`    | No        | Travel posts only. A YouTube link, like `'https://www.youtube.com/watch?v=abc123'`.                                |

A few rules that are easy to trip over:

- Keep the single quotes `'...'` around each value.
- If your text contains an apostrophe (like "we're"), write it twice: `'We''re home'`. Two
  apostrophes in a row show up as one on the site.
- Don't change the words before the colons (`title:`, `date:` etc.).

### 3. Write the post

Everything after the second `---` line is the post itself. Write it like a normal email. A few
symbols add formatting:

| Type this                           | To get                              |
| ----------------------------------- | ----------------------------------- |
| A blank line between paragraphs     | A new paragraph                     |
| `## Some heading`                   | A section heading                   |
| `**bold words**`                    | **bold words**                      |
| `*italic words*`                    | _italic words_                      |
| `- item` on each line               | A bulleted list                     |
| `[link text](https://...)`          | A clickable link                    |
| `![description](/images/photo.jpg)` | A picture in the middle of the post |

That's all you need.

**Two characters to avoid:** curly braces `{ }` and the less-than sign `<` stop a post from
loading (so `<3` or `{sigh}` will break it). If you really need them, type `&lt;` instead of
`<` and `&#123;` / `&#125;` instead of `{` / `}`. They show up as the normal characters on
the site.

---

## Adding pictures

1. Put the picture in the `static/images/` folder. Give it a simple name with no spaces, like
   `rome-colosseum.jpg`.
2. Refer to it as `/images/` followed by the file name, like `/images/rome-colosseum.jpg`. Leave
   out the `static` part. That's the same for covers and for pictures inside a post.

Pictures straight off a phone are often very large and make the site slow. Shrinking them to
about 2000 pixels wide before adding them helps a lot.

---

## The wedding page

The wedding page is a single file: `src/lib/content/wedding/index.md`. It works like a post,
with one extra detail, `gallery`, which is the list of photos shown at the bottom:

```
gallery:
  - '/images/wedding-first-dance.jpg'
  - '/images/wedding-cake.jpg'
```

Each photo goes on its own line, starting with two spaces, a dash, and a space. Add or remove
lines to change the photos. They show up in the same order as the list.

---

## Changing or removing a post

- **To change a post**, edit its file.
- **To remove a post**, delete its file. If nothing else uses its pictures, you can delete those
  from `static/images/` too.

---

## Seeing your changes before publishing

This part needs a little setup the first time, and Gabe can help with it.

**One-time setup:** install [Node.js](https://nodejs.org) (the "LTS" version). Then open the
Terminal app, go to this project's folder, and run:

```sh
npm install
```

**Every time:** in the Terminal, from this project's folder, run:

```sh
npm run dev
```

It prints a web address (usually `http://localhost:5173`). Open it in your browser to see the
site exactly as it will look, including your unsaved-to-the-internet changes. It updates by
itself every time you save a file. When you're done, go back to the Terminal and press
`Control` + `C` to stop it.

If something on the page looks broken after an edit, the most common cause is the details
block at the top of a post: a missing quote, a missing `---` line, or an apostrophe that wasn't
doubled. The next most common cause is a `{`, `}` or `<` in the post text (see "Two characters
to avoid" above).

---

## Publishing

The site's files are stored on GitHub, at
[github.com/ProTimmy/timotei-blog](https://github.com/ProTimmy/timotei-blog). Saving your
changes there is called a "commit". Committing saves your changes, but it doesn't put them on
the live site by itself yet. After you commit, let Gabe know, and Gabe will publish them.

You can also make small edits right on the GitHub website, without installing anything: open a
file, click the pencil icon, make your change, and click **Commit changes**. To add pictures,
open the `static/images` folder on GitHub and use **Add file → Upload files**.

---

## For the technically curious

The site is built with [SvelteKit](https://svelte.dev/docs/kit) and
[Tailwind CSS](https://tailwindcss.com), and posts are Markdown files processed by
[mdsvex](https://mdsvex.pngwn.io). It's set up to be exported as a plain static website.

| Command           | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Run the site locally, updating as files change. |
| `npm run build`   | Build the static site into the `build/` folder. |
| `npm run preview` | Preview the built site.                         |
| `npm run check`   | Check the code for type errors.                 |
| `npm run format`  | Tidy up the formatting of every file.           |

Animations respect the "reduce motion" setting on your computer or phone. If it's turned on,
the bigger animations (fading in, page transitions) are switched off.
