# Editing the website copy

Edit `siteCopy.yaml` to update the introduction, About section, Learning Tango offerings, event-hiring section, or FAQ.

## Shared external links

Edit the centralized `socialLinks` block to update Facebook, Instagram, WhatsApp, or Eventbrite everywhere those links appear:

```yaml
socialLinks:
  facebook: https://www.facebook.com/example
  instagram: https://www.instagram.com/example/
  whatsapp: https://chat.whatsapp.com/example
  eventbrite: https://www.eventbrite.com/e/example
```

## Longer paragraphs

Keep the `|` and indent the paragraph by two extra spaces:

```yaml
description: |
  Write the full paragraph here. It can continue on another line.
```

## Introduction chapters

Each item under `introduction` has only a description and media URL. Each dash starts a new chapter:

```yaml
introduction:
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

## Learning Tango offerings

Every item under `learning` becomes one row in the Learning Tango section. Add or remove as many offerings as needed. The “Learning Tango” section heading is managed by the website code:

```yaml
learning:
  - title: Private lessons
    description: |
      Write the offering description here.
    images:
      - /media/learning/private-class.webp
      - /media/learning/private-class-2.webp
```

`schedule` is optional. Put optimized WebP image files in `public/media/learning`, then add their paths under that offering's `images` list. Keep high-resolution source files outside `public` so they are not copied into the deployed site. One image displays normally; two or more images automatically become a slideshow with previous and next buttons.

Learning action buttons are managed by the website code and do not need to be added here.

## Hiring performance videos

Each item under `hiring` needs only a title and video URL:

```yaml
hiring:
  - title: Salon Tango
    videoUrl: https://www.youtube.com/watch?v=example
```

Add, remove, or reorder video items as needed. YouTube, Vimeo, and direct video-file URLs are supported.

## FAQ

Every item under `faq` needs only a question and answer:

```yaml
faq:
  - question: What should I wear to class?
    answer: Wear comfortable clothes and shoes that stay securely on your feet.
```

Add, remove, or reorder FAQ items as needed.

Do not rename the remaining fields such as `introduction`, `description`, `mediaUrl`, `learning`, `images`, `hiring`, `videoUrl`, `faq`, `question`, or `answer`; the website uses those names to place the copy correctly.
