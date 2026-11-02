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

Each chapter has only a description and photo URL. Each dash starts a new chapter:

```yaml
chapters:
  - description: |
      Write the chapter paragraph here.
    photoUrl: /images/about/example.jpg
```

Add or remove as many chapter items as needed. The page adjusts its scroll length automatically. A photo can use a full external URL beginning with `https://`, or a local path for an image stored in `public/images/about`.

Do not rename fields such as `introduction`, `chapters`, `description`, `photoUrl`, `id`, or `answer`; the website uses those names to place the copy correctly.
