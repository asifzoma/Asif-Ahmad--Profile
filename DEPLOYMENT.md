# cPanel Deployment Guide

## Pre-Upload Checklist
- [ ] Update `.env` file with production database credentials
- [ ] Update `.env` file with production email settings
- [ ] Ensure all file permissions are correct (644 for files, 755 for directories)
- [ ] Remove any test/debug code
- [ ] Verify all file paths use relative paths

## Files/Directories to Upload
```
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   ├── home.js
│   └── contact-form.js
├── img/
├── vendor/
├── .env
├── .htaccess
├── index.php
├── about-section.php
├── contact-section.php
├── portfolio-section.php
├── code-snippets-section.php
├── scs-scheme-section.php
├── header.php
└── contact_submit.php
```

## Files/Directories to Exclude
```
├── node_modules/
├── scss/
├── *.map
├── debug.log
├── package.json
├── package-lock.json
├── README*.md
├── .git/
└── tests/
```

## cPanel Setup Steps
1. Create MySQL Database:
   - Create new database in cPanel
   - Create database user
   - Assign user to database with required privileges
   - Update `.env` with new database credentials

2. File Permissions:
   - Directories: 755 (`find . -type d -exec chmod 755 {} \;`)
   - Files: 644 (`find . -type f -exec chmod 644 {} \;`)
   - PHP Files: 644
   - .env: 600

3. Email Configuration:
   - Update SMTP settings in `.env`
   - Test contact form submission
   - Verify email notifications

## Post-Deployment Checklist
- [ ] Test database connection
- [ ] Test contact form submission
- [ ] Verify email notifications
- [ ] Check all images and assets load correctly
- [ ] Test responsive design
- [ ] Verify SSL certificate is working
- [ ] Clear browser cache and test again

## Troubleshooting
- If database connection fails, verify credentials and hostname
- If emails not sending, check SMTP settings and permissions
- If 500 error, check error_log.txt
- If assets not loading, check file permissions and paths 