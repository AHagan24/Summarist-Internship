# Summarist MVP

A full-stack audiobook and book summary platform inspired by Summarist, built as part of the Frontend Simplified Virtual Internship.

## Live Demo

Add deployment URL here:

```txt
https://summarist-internship-osdzq33zk-ahagan24s-projects.vercel.app/
```

## Features

### Authentication

* Email & password registration
* Email & password login
* Guest login
* Logout
* Global authentication modal
* Firebase Authentication integration

### Book Discovery

* Selected books section
* Recommended books section
* Suggested books section
* Premium book badges
* Search by title or author
* Debounced search experience

### Book Details

* Dynamic book pages
* Book descriptions
* Author information
* Premium content detection
* Library integration

### Audiobook Player

* Dynamic audiobook pages
* Custom audio player
* Play / pause controls
* Skip forward / backward
* Seek bar
* Current time and duration display
* Finished book tracking

### Library

* Save books to library
* Remove books from library
* Finished books section
* Firestore persistence

### Subscription System

* Monthly plan
* Annual plan
* 7-day free trial
* Stripe Checkout integration
* Premium content gating
* Subscription status tracking

### Settings

* Display user email
* Display subscription status
* Upgrade plan flow
* Logged-out state

### UI/UX

* Responsive design
* Mobile optimized
* Sidebar navigation
* Skeleton loading states
* Error states
* FAQ accordion
* Homepage animations

---

## Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript

### Backend & Database

* Firebase Authentication
* Firebase Firestore

### Payments

* Stripe Checkout

### Deployment

* Vercel

### Styling

* CSS Modules
* React Icons
* Custom responsive layouts

---

## Project Structure

```txt
app/
├── page.tsx
├── for-you/
├── book/[id]/
├── player/[id]/
├── library/
├── settings/
├── choose-plan/
└── api/

components/
lib/
public/
```

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

STRIPE_MONTHLY_PRICE_ID=
STRIPE_YEARLY_PRICE_ID=

NEXT_PUBLIC_BASE_URL=
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

---

## Demo Account

Guest Login:

```txt
Email: guest@gmail.com
Password: guest123
```

---

## Stripe Test Card

Use Stripe test mode:

```txt
Card Number: 4242 4242 4242 4242
Expiration: Any future date
CVC: Any 3 digits
ZIP: Any valid ZIP code
```

---

## Key Functionality

### Free Books

* Require authentication
* Accessible to all logged-in users

### Premium Books

* Require authentication
* Require active subscription
* Redirect non-subscribed users to the pricing page

### Library System

* Save books
* Remove books
* Track finished books
* Persist data in Firestore

---

## Author

Addison Hagan

Frontend Simplified Virtual Internship Project
