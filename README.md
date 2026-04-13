# Merwa App

A React + Vite service website built for simple customization, service browsing, and request submission.

## Features

- Homepage hero section with clear service call-to-action
- Service cards and about section
- Request a service form with name, email, phone, and service details
- Direct form submission using FormSubmit to send details to `amirditamo@gmail.com`
- GitHub Pages-ready build output in `docs/`
- Responsive layout and modern styling

## Local Development

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal to preview the site.

## Build for Production

```bash
npm run build
```

The production output will be generated in the `docs/` folder.

## GitHub Pages Deployment

This project is configured to build into `docs/`, which can be served by GitHub Pages from the `master` branch with `docs/` as the publishing source.

1. Build the site with `npm run build`
2. Commit the generated `docs/` folder and push to `master`
3. In GitHub Pages settings, select `master branch /docs folder`

## Email Submission

The request form uses `https://formsubmit.co/ajax/amirditamo@gmail.com` to send submission details directly to the admin email.

> If you want a hosted backend or database later, the form is already structured to make that integration simple.
