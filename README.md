# travisduncansecurity.com
 
Personal portfolio site. React + Vite, deployed to AWS S3 behind CloudFront.
 
**Live:** [travisduncansecurity.com](https://www.travisduncansecurity.com)
 
## Stack
 
- React 18 + React Router
- Vite 7 (build)
- Tailwind CSS 3
- Framer Motion (animations), Lucide React (icons)
- AWS S3 + CloudFront, provisioned via CloudFormation
## Local development
 
Requires Node 20+.
 
```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```
 
## Deployment
 
```bash
npm run build
aws s3 sync dist/ s3://$S3_BUCKET --delete
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
```
 
Sync `dist/`, not the project root — syncing source produces a blank page.
The CloudFront invalidation is required or visitors keep the cached version.
 
Bucket name and distribution ID are in `.env` (see `.env.example`).
Infrastructure is defined in `portfolio-infrastructure.yaml`.
 
See [DEPLOY.md](DEPLOY.md) for the full runbook and troubleshooting.
 
## Structure
 
```
├── src/
│   ├── components/     # Hero, About, Skills, Projects, Certifications, Contact, ...
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css       # Tailwind entry + global styles
├── public/             # static assets served as-is (resume.pdf, etc.)
├── index.html          # HTML shell, page title and meta tags
├── vite.config.js
├── tailwind.config.js
└── portfolio-infrastructure.yaml   # CloudFormation: S3 + CloudFront
```
 
Content lives in the component files — project entries in `src/components/Projects.jsx`,
credentials in `src/components/Certifications.jsx`, contact links in `src/components/Contact.jsx`.
 
## Notes
 
- No secrets in the repo. `.env` holds resource identifiers only (bucket name,
  distribution ID, region); AWS credentials live in `~/.aws/credentials`.
- The S3 bucket blocks all public access. Content is served through CloudFront
  using an Origin Access Control.
- External links use `rel="noopener noreferrer"`.
---
 
© 2026 Travis Duncan
