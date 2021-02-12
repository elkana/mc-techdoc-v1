module.exports = {
  title: 'Mobile Collection System',
  tagline: 'Technical Documentation for MCS',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/techdoc/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.ico',
  organizationName: 'ellkana', // Usually your GitHub org/user name.
  projectName: 'mc-support', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Mobile Collection System',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo_mfast.png',
      },
      items: [
        {
          to: 'docs/installation',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        { to: 'docs/api/interfaces/api1', activeBasePath: 'docs/api', label: 'API', position: 'right' },
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
        { to: 'support', label: 'Support', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'User Manual Android',
              to: 'docs/',
            },
            {
              label: 'FSD',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/docusaurus',
            // },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PT. Perkasa Pilar Utama.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
