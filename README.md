# 🟠 Reddit Clone

A full-stack Reddit-inspired community platform where users can create communities, post content, vote, and comment — built with modern web technologies.

---

## 🌐 Live Demo

👉 **[reddit-clone-12.vercel.app](https://reddit-clone-12.vercel.app)**

---

## 📸 Video Demo

---

## ✨ Features

### 👤 Authentication
- Sign up with username, email and password
- Secure login / logout with NextAuth.js
- Session-based auth across all pages
- Username displayed in navbar after login

### 🏘 Communities
- Create new communities with a name and slug
- Browse all communities
- View community-specific posts
- Dynamic sidebar showing all communities

### 📝 Posts
- Create posts with title, content, and optional image
- Assign posts to a community
- View all posts on home feed
- Sort posts by 🔥 Hot, 🆕 New, ⬆ Top
- Click any post to view full details

### 💬 Comments
- Add comments on any post
- View comment count on feed

### ⬆⬇ Voting
- Upvote or downvote any post
- Live score updates
- Sort feed by vote count

### 📱 Responsive Design
- Desktop sidebar navigation
- Mobile bottom navigation bar
- Works on all screen sizes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Authentication | NextAuth.js |
| Image Upload | Supabase Storage |
| Deployment | Vercel |
| Validation | Zod |

---

## 📁 Project Structure
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # Auth handlers
│   │   ├── comments/             # POST comment
│   │   ├── communities/          # GET all, POST new
│   │   ├── posts/                # GET all, POST new
│   │   ├── upload/               # Image upload
│   │   └── votes/                # UP/DOWN vote
│   ├── communities/              # Browse communities
│   ├── create-community/         # New community form
│   ├── create-post/              # New post form
│   ├── login/                    # Login page
│   ├── post/[id]/                # Single post + comments
│   ├── r/[slug]/                 # Community detail page
│   ├── signup/                   # Register page
│   └── u/[username]/             # User profile
├── components/
│   ├── Navbar.tsx                # Top nav with auth
│   ├── Sidebar.tsx               # Dynamic sidebar
│   ├── CommentForm.tsx           # Add comment
│   ├── VoteButtons.tsx           # Up/down vote UI
│   ├── ShareButton.tsx           # Copy link
│   └── SortBar.tsx               # Hot/New/Top tabs
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   └── auth.ts                   # NextAuth config
├── providers/
│   └── SessionProvider.tsx       # Auth context wrapper
└── validators/
    └── post.ts                   # Zod schema for posts

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- A PostgreSQL database (Supabase free tier works great)

### 1. Clone the repo
```bash
git clone https://github.com/Shrutii2035/reddit-clone.git
cd reddit-clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:
```env
# Database (from Supabase → Settings → Database → Connection string)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="any-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Set up the database
```bash
npx prisma generate
npx prisma db push
```

### 5. Start the dev server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🗄 Database Schema

```prisma
model User {
  id        String    @id @default(cuid())
  username  String    @unique
  email     String    @unique
  password  String
  posts     Post[]
  comments  Comment[]
  votes     Vote[]
}

model Community {
  id    String  @id @default(cuid())
  name  String
  slug  String  @unique
  posts Post[]
}

model Post {
  id          String    @id @default(cuid())
  title       String
  content     String
  imageUrl    String?
  author      User      @relation(fields: [authorId], references: [id])
  authorId    String
  community   Community @relation(fields: [communityId], references: [id])
  communityId String
  comments    Comment[]
  votes       Vote[]
  createdAt   DateTime  @default(now())
}

model Comment {
  id       String @id @default(cuid())
  content  String
  post     Post   @relation(fields: [postId], references: [id])
  postId   String
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
}

model Vote {
  id       String   @id @default(cuid())
  type     VoteType
  post     Post     @relation(fields: [postId], references: [id])
  postId   String
  user     User     @relation(fields: [userId], references: [id])
  userId   String
}

enum VoteType {
  UP
  DOWN
}
```

---

## 🚢 Deployment

### Vercel (recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Add environment variables in **Settings → Environment Variables**:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → set to your live Vercel URL
4. Click **Deploy** — auto-deploys on every push to `main` ✅

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👩‍💻 Author

**Shrutii** 
- GitHub: [@Shrutii2035](https://github.com/Shrutii2035)
- Project: [reddit-clone-12.vercel.app](https://reddit-clone-12.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).