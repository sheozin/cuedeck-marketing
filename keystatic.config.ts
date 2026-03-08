import { config, collection, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'sheozin',
      name: 'cuedeck-marketing',
    },
  },
  ui: {
    brand: { name: 'CueDeck CMS' },
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        author: fields.text({ label: 'Author', defaultValue: 'CueDeck Team' }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
})
