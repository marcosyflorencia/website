import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveMediaUrl } from '../src/utils/mediaUrl.js'

test('recognizes image and direct video URLs', () => {
  assert.equal(resolveMediaUrl('/media/introduction/photo.png').kind, 'image')
  assert.equal(resolveMediaUrl('https://example.com/clip.mp4?version=2').kind, 'video')
  assert.equal(resolveMediaUrl('/media/introduction/clip.webm').kind, 'video')
})

test('converts common YouTube URLs into privacy-enhanced embeds', () => {
  const watch = resolveMediaUrl('https://www.youtube.com/watch?v=DBRWDRs3u5A')
  const short = resolveMediaUrl('https://youtu.be/DBRWDRs3u5A')
  assert.deepEqual(watch, short)
  assert.equal(watch.kind, 'youtube')
  assert.equal(watch.src, 'https://www.youtube-nocookie.com/embed/DBRWDRs3u5A')
})

test('converts Vimeo links into embeds and handles an empty value', () => {
  assert.deepEqual(resolveMediaUrl('https://vimeo.com/123456789'), {
    kind: 'vimeo',
    src: 'https://player.vimeo.com/video/123456789',
    id: '123456789',
  })
  assert.deepEqual(resolveMediaUrl(''), { kind: 'empty', src: '' })
})
