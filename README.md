# 🌍 AzEUConnect

AzEUConnect is a B2C SaaS platform designed to help Azerbaijanis living in the EU discover services, connect with providers, and manage business formation seamlessly. Users can explore verified services, make secure bookings, and handle communication and document exchange — all in one place.

---

## 🧱 Monorepo Structure

```
AzeEU/
├── apps/
│   ├── frontend       # Next.js 15 app (App Router)
│   └── backend        # Express.js API with Prisma
├── packages/
│   ├── db             # Shared Prisma Client
│   ├── typescript-config
│   └── eslint-config
└── .env / .env.production
```

---

## 🚀 Features

- 🔐 Authentication with **Google OAuth** and custom credentials (NextAuth)
- 📄 Profile and Role Management (USER / SERVICE_PROVIDER)
- 🧾 Marketplace Listings & Service Booking
- 💬 Internal Messaging System
- 📂 Document Exchange between users and providers
- ⚙️ Admin Interface for user and service moderation
- 🌐 Deployed to [Railway](https://railway.app)

---

## ⚙️ Tech Stack

- **Frontend**: Next.js 15, TailwindCSS, TypeScript
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: PostgreSQL via Prisma Accelerate (Data Proxy)
- **Auth**: NextAuth.js (Google + Credentials)
- **Deployment**: Railway
- **Monorepo Tooling**: Turborepo

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/CedeLaMat/AzEUConnect.git
cd AzeEU
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` and `.env.production` file in the root:

```env
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=your-db-url
PRISMA_SCHEMA=../../packages/db/prisma/schema.prisma
```

> Make sure to set valid URLs for both frontend & backend.

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Run Dev Server

```bash
npm run dev --filter=frontend
npm run dev --filter=backend
```

---

## 🧪 Running in Production

Deploy using Railway or your preferred platform. Make sure to:

- Set production `.env.production` variables.
- Build the apps with:

```bash
npm run build --filter=backend
npm run build --filter=frontend
```

---

## 📂 Folder Highlights

| Path | Description |
|------|-------------|
| `apps/frontend` | Main web interface (Next.js) |
| `apps/backend` | RESTful API & Auth logic |
| `packages/db` | Shared Prisma ORM setup |
| `packages/typescript-config` | Shared TSConfig |
| `packages/eslint-config` | Shared ESLint rules |

---

## 📌 License

MIT

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📬 Contact

For questions, feedback, or support, reach out at: **eyvaz.alishov@gmail.com**
