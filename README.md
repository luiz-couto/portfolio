# Portfolio

Personal portfolio site built with React + TypeScript + Vite, deployed to GitHub Pages.

**Live:** https://luiz-couto.github.io/portfolio/

## Development

```bash
npm install
npm run dev        # start dev server
npm test           # run tests once
npm run test:watch # run tests in watch mode
npm run lint       # lint
npm run build      # typecheck + production build
```

## CI/CD

- `CI` workflow: lint, test, and build on every pull request and push to `main`.
- `Deploy to GitHub Pages` workflow: on push to `main`, runs tests, builds, and publishes `dist/` to GitHub Pages.
