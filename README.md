# 🏦 ApexDigital Banking Portal

A modern, high-performance web application designed for personal banking management, featuring real-time transaction tracking, internal money transfers, and advanced account analytics.

---

## 🚀 Getting Started

Ensure [Node.js](https://nodejs.org/) (v18+) is installed. Clone the repository, then run `npm install` to install dependencies.
To start the project, use these commands in separate terminals:

- 🛠️ `npm run mock-server` to start the backend simulation.
- 💻 `npm run dev` to launch the development server.
- Visit `http://localhost:5173` to access the portal.
- Account/password for login: phamminhan@gmail.com/123456 .
  _ Mock OTP: 123456.

---

## 💻 Tech Stack

- ⚡ **Framework:** React
- 📘 **Language:** TypeScript
- 🚀 **Build Tool:** Vite
- 🎨 **Styling:** Tailwind CSS
- 🌐 **Routing:** React Router
- 🗄️ **State Management:** Zustand

---

## ✨ Key Features

- 📊 **Dashboard Overview:** Balance and account monitoring.
- 💸 **Internal Transfers:** Secure money transfers between accounts.
- 📜 **Transaction History:** Searchable and filtered transaction logs.
- 📈 **Spending Analytics:** Insightful data visualization for financial health.

---

## 🏛️ Architecture Decisions

We follow the ADR (Architecture Decision Record) process for critical design choices, documented in the `/docs/adr` folder:

1. 🗂️ **[ADR-001: State Management with Zustand](/docs/adr/001-state-management.md)**
2. 🔌 **[ADR-002: Centralized API Service with Axios](/docs/adr/002-api-integration.md)**
3. 📐 **[ADR-003: Config-over-Convention Standards](/docs/adr/003-architecture-standards.md)**

---

## 🔒 Security Considerations & Assumptions

Building a banking portal requires a high level of security awareness. Below are the current implementation details and planned improvements:

- **Authentication Storage:** Currently, access tokens are stored in `localStorage`.
  - _Risk:_ Vulnerable to XSS (Cross-Site Scripting) attacks.
  - _Future Plan:_ Migrate to `HttpOnly` cookies to store tokens securely, preventing access via client-side scripts.
- **Transaction Validation:** Internal transfers currently rely on OTP validation.
  - _Improvement:_ To enhance security, I plan to move beyond standard SMS/Email OTPs towards **Multi-Factor Authentication (MFA)** using TOTP (Time-based One-Time Password) apps (e.g., Google Authenticator).
- **Identity Verification:**
  - _Future Plan:_ Integrate biometric authentication (FaceID/Fingerprint) via WebAuthn API for high-risk actions.
  - _Implementation:_ Enforce a strict "Step-up Authentication" process for any transactions exceeding a specific amount, requiring additional verification (2FA/Biometric) before final execution.
- **Data Integrity:** All API communications are assumed to be handled over HTTPS. In this local development mock environment, I emphasize the structure of the request headers and validation logic to mimic secure production environments.

---

## 🚀 Future Roadmap & Improvements

1/ **CI/CD Pipeline:** Automate deployment to AWS S3 via GitHub Actions:

```yaml
name: Deploy Digital Banking Platform to AWS S3

on:
  push:
    branches: [master, staging, dev]
  pull_request:
    branches: [master, staging, dev]

env:
  AWS_REGION: ap-southeast-2

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build Project
        run: npm run build

      - name: Upload Build Files
        uses: actions/upload-artifact@v4
        with:
          name: dist-files
          path: dist/

  deploy:
    needs: build
    if: github.event_name == 'push'
    runs-on: ubuntu-latest

    environment:
      name: ${{ github.ref == 'refs/heads/master' && 'production' || github.ref == 'refs/heads/staging' && 'staging' || 'development' }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download Build Files
        uses: actions/download-artifact@v4
        with:
          name: dist-files
          path: dist/

      - name: Set Bucket Name
        id: set-bucket
        run: |
          if [[ "${{ github.ref }}" == "refs/heads/master" ]]; then
            echo "bucket_name=${{ secrets.S3_BUCKET_PRODUCTION }}" >> $GITHUB_OUTPUT
            echo "env=PRODUCTION" >> $GITHUB_OUTPUT
          elif [[ "${{ github.ref }}" == "refs/heads/staging" ]]; then
            echo "bucket_name=${{ secrets.S3_BUCKET_STAGING }}" >> $GITHUB_OUTPUT
            echo "env=STAGING" >> $GITHUB_OUTPUT
          else
            echo "bucket_name=${{ secrets.S3_BUCKET_DEV }}" >> $GITHUB_OUTPUT
            echo "env=DEVELOPMENT" >> $GITHUB_OUTPUT
          fi

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Sync to S3
        run: |
          echo "Deploying to ${{ steps.set-bucket.outputs.env }} environment..."
          aws s3 sync dist/ s3://${{ steps.set-bucket.outputs.bucket_name }} --delete --region ${{ env.AWS_REGION }}
```

2/ **Mobile Responsiveness::** Refactor layout with Tailwind CSS for seamless mobile interaction.
3/ **Advanced Authentication::** Implement session management and "Step-up" authentication for critical transactions.
4/ **Modular Core::** Code more shared logic into custom hooks, utils, and shared components to maximize DRY principles and maintainability.

---

## 🛡️ License

This project is intended for private use and educational purposes.
