# Editing the website copy

Edit `siteCopy.yaml` to update the introduction, About section, Learning Tango offerings, event-hiring section, or FAQ.

## Simple text

Change only the text after the colon:

```yaml
title: About Us
```

## Longer paragraphs

Keep the `|` and indent the paragraph by two extra spaces:

```yaml
description: |
  Write the full paragraph here. It can continue on another line.
```

## Introduction chapters

Each chapter has only a description and media URL. Each dash starts a new chapter:

```yaml
caption: |
  Write the About section caption here.
chapters:
  - description: |
      Write the chapter paragraph here.
    mediaUrl: /media/introduction/example.jpg
```

Add or remove as many chapter items as needed. The page adjusts its scroll length automatically.

`mediaUrl` supports:

- Images such as `.jpg`, `.png`, `.webp`, and `.gif`
- Direct videos such as `.mp4`, `.webm`, `.mov`, and `.m4v`
- Full YouTube or Vimeo links
- Local files stored in `public/media/introduction`, referenced as `/media/introduction/filename.ext`

Do not rename fields such as `introduction`, `chapters`, `description`, `mediaUrl`, `id`, or `answer`; the website uses those names to place the copy correctly.
