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

## Lists

Each list item begins with a dash. Keep the dash and indentation:

```yaml
statementLines:
  - From Argentina,
  - For Everyone,
  - Through Connection.
```

Do not rename fields such as `introduction`, `description`, `id`, or `answer`; the website uses those names to place the copy correctly.
