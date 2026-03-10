import { config, collection, fields, singleton } from '@keystatic/core'

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
        featuredImage: fields.image({
          label: 'Featured Image',
          description: 'Hero image shown at top of post and as thumbnail on listing. Recommended: 1200x630px.',
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'content/singletons/homepage',
      schema: {
        heroHeadline: fields.text({ label: 'Hero Headline' }),
        heroSubheadline: fields.text({ label: 'Hero Subheadline', multiline: true }),
        ctaText: fields.text({ label: 'CTA Button Text' }),
        ctaUrl: fields.text({ label: 'CTA URL' }),
      },
    }),
    about: singleton({
      label: 'About Page',
      path: 'content/singletons/about',
      schema: {
        heroHeadline: fields.text({ label: 'Hero Headline' }),
        heroTagline: fields.text({ label: 'Tagline (below headline)', multiline: true }),
        missionHeading: fields.text({ label: 'Mission Heading' }),
        missionBody: fields.text({ label: 'Mission Body (separate paragraphs with blank line)', multiline: true }),
        quoteText: fields.text({ label: 'Pull Quote', multiline: true }),
        quoteAuthor: fields.text({ label: 'Quote Author' }),
        ctaHeading: fields.text({ label: 'CTA Heading' }),
        ctaSubtext: fields.text({ label: 'CTA Subtext' }),
      },
    }),
    contact: singleton({
      label: 'Contact Page',
      path: 'content/singletons/contact',
      schema: {
        heroHeadline: fields.text({ label: 'Hero Headline' }),
        heroSubheadline: fields.text({ label: 'Hero Subheadline' }),
        emailGeneral: fields.text({ label: 'General Email' }),
        emailSupport: fields.text({ label: 'Support Email' }),
        emailEnterprise: fields.text({ label: 'Enterprise Email' }),
      },
    }),
    privacy: singleton({
      label: 'Privacy Policy',
      path: 'content/singletons/privacy',
      schema: {
        intro: fields.text({ label: 'Introduction', multiline: true }),
        dataCollection: fields.text({ label: 'Information We Collect', multiline: true }),
        howWeUse: fields.text({ label: 'How We Use Your Information', multiline: true }),
        dataSharing: fields.text({ label: 'Data Sharing', multiline: true }),
        dataRetention: fields.text({ label: 'Data Retention', multiline: true }),
        security: fields.text({ label: 'Security', multiline: true }),
        gdprRights: fields.text({ label: 'Your Rights (GDPR)', multiline: true }),
        cookies: fields.text({ label: 'Cookies', multiline: true }),
        contactUs: fields.text({ label: 'Contact', multiline: true }),
      },
    }),
    terms: singleton({
      label: 'Terms of Service',
      path: 'content/singletons/terms',
      schema: {
        acceptance: fields.text({ label: '1. Acceptance of Terms', multiline: true }),
        serviceDesc: fields.text({ label: '2. Service Description', multiline: true }),
        accountReg: fields.text({ label: '3. Account Registration', multiline: true }),
        billing: fields.text({ label: '4. Subscription and Billing', multiline: true }),
        acceptableUse: fields.text({ label: '5. Acceptable Use', multiline: true }),
        intellectualProp: fields.text({ label: '6. Intellectual Property', multiline: true }),
        warranties: fields.text({ label: '7. Disclaimer of Warranties', multiline: true }),
        liability: fields.text({ label: '8. Limitation of Liability', multiline: true }),
        termination: fields.text({ label: '9. Termination', multiline: true }),
        changes: fields.text({ label: '10. Changes to Terms', multiline: true }),
        governingLaw: fields.text({ label: '11. Governing Law', multiline: true }),
        contactUs: fields.text({ label: '12. Contact', multiline: true }),
      },
    }),
  },
})
