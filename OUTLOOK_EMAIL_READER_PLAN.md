# Outlook Email Reader - Implementation Plan

## What We're Building

A web application that:
- Connects to your Microsoft Outlook account
- Reads and displays your emails
- Allows searching through emails
- Works with personal Microsoft accounts (outlook.com, hotmail.com) or work/school accounts (Microsoft 365)

---

## How It Works (Simple Explanation)

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│   Your Browser  │ ──────► │   Our App       │ ──────► │   Microsoft     │
│   (React UI)    │         │   (Node.js)     │         │   Graph API     │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                    │
                                    ▼
                            ┌─────────────────┐
                            │  Your Outlook   │
                            │  Mailbox        │
                            └─────────────────┘
```

1. You open the app in your browser
2. You click "Sign in with Microsoft"
3. Microsoft shows a login page (we never see your password)
4. Microsoft gives our app permission to read your emails
5. Our app fetches and displays your emails

---

## Part 1: Setting Up Microsoft Azure (Required First!)

Before writing any code, you need to register your app with Microsoft. This is free.

### Step 1: Create a Microsoft Account (if you don't have one)

If you already have an Outlook.com, Hotmail, or Microsoft 365 account, skip this step.

1. Go to https://outlook.com
2. Click "Create free account"
3. Follow the steps to create an account

### Step 2: Access the Azure Portal

1. Go to **https://portal.azure.com**
2. Sign in with your Microsoft account
3. You'll see the Azure dashboard (don't worry - we're using the free tier)

### Step 3: Register Your Application

1. In the search bar at the top, type **"App registrations"** and click it
2. Click the **"+ New registration"** button
3. Fill in the form:
   - **Name**: `Outlook Email Reader` (or any name you like)
   - **Supported account types**: Choose based on your needs:
     - "Accounts in any organizational directory and personal Microsoft accounts" (recommended - works with all accounts)
   - **Redirect URI**:
     - Select **"Single-page application (SPA)"** from the dropdown
     - Enter: `http://localhost:3000`
4. Click **"Register"**

### Step 4: Copy Your Application (Client) ID

After registration, you'll see an overview page. **Copy these values and save them somewhere safe:**

- **Application (client) ID**: A long string like `12345678-1234-1234-1234-123456789abc`
- **Directory (tenant) ID**: Another long string (only needed for work/school accounts)

### Step 5: Configure API Permissions

1. In the left sidebar, click **"API permissions"**
2. Click **"+ Add a permission"**
3. Click **"Microsoft Graph"**
4. Click **"Delegated permissions"**
5. Search for and check these permissions:
   - `Mail.Read` - Read user's email
   - `Mail.ReadBasic` - Read basic email info
   - `User.Read` - Read user's profile (to show their name)
6. Click **"Add permissions"**

You should now see these permissions listed.

### Step 6: Configure Authentication Settings

1. In the left sidebar, click **"Authentication"**
2. Under "Single-page application", verify your redirect URI is `http://localhost:3000`
3. Scroll down to "Implicit grant and hybrid flows"
4. Check **"Access tokens"**
5. Check **"ID tokens"**
6. Click **"Save"**

### You're Done with Azure Setup!

Your Azure app is now configured. Keep your **Application (client) ID** handy - you'll need it soon.

---

## Part 2: Technology Stack

| Component | Technology | Why We're Using It |
|-----------|------------|-------------------|
| **Backend** | Node.js + TypeScript | Same as existing project |
| **Framework** | Express.js | HTTP server |
| **Frontend** | React + TypeScript | User interface |
| **Auth Library** | MSAL.js | Microsoft's official auth library |
| **API** | Microsoft Graph | Access Outlook emails |
| **Build Tool** | Vite | Fast development |

---

## Part 3: Project Structure

```
First-Idea/
├── src/
│   ├── server/
│   │   ├── outlook/           # NEW: Outlook-specific code
│   │   │   ├── index.ts       # Outlook routes entry
│   │   │   └── types.ts       # TypeScript types for emails
│   │
│   └── client/
│       ├── outlook/           # NEW: Outlook frontend
│       │   ├── OutlookApp.tsx # Main Outlook app
│       │   ├── components/
│       │   │   ├── EmailList.tsx
│       │   │   ├── EmailView.tsx
│       │   │   ├── LoginButton.tsx
│       │   │   └── SearchBar.tsx
│       │   ├── hooks/
│       │   │   └── useMsal.ts # Microsoft auth hook
│       │   └── config/
│       │       └── authConfig.ts
│       └── styles/
│           └── outlook.css
│
├── .env.example              # Updated with Outlook vars
└── OUTLOOK_EMAIL_READER_PLAN.md  # This file
```

---

## Part 4: Environment Variables Needed

```bash
# Microsoft/Outlook Configuration
MICROSOFT_CLIENT_ID=your-application-client-id-from-azure
MICROSOFT_TENANT_ID=common  # Use 'common' for personal accounts

# Server Configuration
PORT=3000
NODE_ENV=development
```

---

## Part 5: Implementation Phases

### Phase 1: Authentication Setup
- [ ] Install MSAL.js library
- [ ] Create authentication configuration
- [ ] Build "Sign in with Microsoft" button
- [ ] Handle login/logout flow
- [ ] Store and manage access tokens

### Phase 2: Email Fetching
- [ ] Create Microsoft Graph API client
- [ ] Fetch list of emails from inbox
- [ ] Fetch individual email details
- [ ] Handle pagination (loading more emails)

### Phase 3: User Interface
- [ ] Create email list component
- [ ] Create email detail view
- [ ] Add search functionality
- [ ] Add folder navigation (Inbox, Sent, etc.)

### Phase 4: Additional Features
- [ ] Filter emails by date
- [ ] Mark emails as read/unread
- [ ] Export emails (optional)

---

## Part 6: API Endpoints We'll Create

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/outlook/emails` | List emails (paginated) |
| GET | `/api/outlook/emails/:id` | Get single email |
| GET | `/api/outlook/folders` | List mail folders |
| GET | `/api/outlook/search?q=term` | Search emails |
| GET | `/api/outlook/me` | Get current user info |

---

## Part 7: Microsoft Graph API Endpoints We'll Use

| Endpoint | Purpose |
|----------|---------|
| `GET /me` | Get logged-in user's profile |
| `GET /me/messages` | List emails |
| `GET /me/messages/{id}` | Get specific email |
| `GET /me/mailFolders` | List folders (Inbox, Sent, etc.) |
| `GET /me/messages?$search="keyword"` | Search emails |

Base URL: `https://graph.microsoft.com/v1.0`

---

## Part 8: Security Considerations

1. **Never store tokens in code** - Use environment variables
2. **Use HTTPS in production** - Required by Microsoft
3. **Token refresh** - MSAL handles this automatically
4. **Minimal permissions** - We only request Mail.Read, not Mail.ReadWrite
5. **No password handling** - Microsoft handles all authentication

---

## Part 9: Running the App (After Implementation)

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your MICROSOFT_CLIENT_ID

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

---

## Part 10: Troubleshooting Common Issues

### "AADSTS50011: The reply URL specified in the request does not match"
**Solution**: Make sure `http://localhost:3000` is added as a redirect URI in Azure

### "AADSTS65001: The user or administrator has not consented"
**Solution**: Make sure you added the correct API permissions in Azure

### "Access token is empty"
**Solution**: Check that you enabled "Access tokens" in Authentication settings

### "Network Error" when calling Graph API
**Solution**: Make sure you're passing the access token in the Authorization header

---

## Summary: What You Need Before Starting

1. A Microsoft account (personal or work/school)
2. An Azure App Registration with:
   - Application (client) ID copied
   - Redirect URI set to `http://localhost:3000`
   - API permissions: `Mail.Read`, `Mail.ReadBasic`, `User.Read`
   - Access tokens and ID tokens enabled
3. Node.js installed on your computer

---

## Ready to Start?

Once you've completed the Azure setup in Part 1 and have your **Application (client) ID**, let me know and we can start writing the code!
