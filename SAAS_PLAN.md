# ProRefer SaaS Platform Plan

## Comprehensive Referral Platform for Licensed Professionals

> A fully-formed SaaS that enables licensed professionals (attorneys, CPAs, physicians, real estate agents, financial advisors, engineers) to create resource-sharing campaigns and grow their networks through incentivized referrals.

---

## Table of Contents

1. [Current State & Gap Analysis](#1-current-state--gap-analysis)
2. [Domain Model & Terminology](#2-domain-model--terminology)
3. [User Personas](#3-user-personas)
4. [Complete User Flows](#4-complete-user-flows)
5. [Information Architecture & Routes](#5-information-architecture--routes)
6. [Feature Specification](#6-feature-specification)
7. [Data Model](#7-data-model)
8. [API Design](#8-api-design)
9. [Tech Stack Recommendation](#9-tech-stack-recommendation)
10. [Authentication & Authorization](#10-authentication--authorization)
11. [Billing & Subscriptions](#11-billing--subscriptions)
12. [Email & Notification System](#12-email--notification-system)
13. [Analytics & Reporting](#13-analytics--reporting)
14. [Compliance & Legal](#14-compliance--legal)
15. [Infrastructure & DevOps](#15-infrastructure--devops)
16. [Implementation Phases](#16-implementation-phases)

---

## 1. Current State & Gap Analysis

### What Exists (from refer-everyone-vue)

| Area | Current Implementation |
|---|---|
| Auth | JWT in localStorage, login/signup modals, no route guards |
| State | No store -- localStorage only, component-level data |
| Campaigns | CRUD (create + read only), table list, basic dashboard |
| Conversions | Create via public form, lookup by phone, success/share page |
| Referral tracking | `referred_by` query param links conversions together |
| Analytics | 3 stat cards (conversions count, total incentive, ROI = incentive^2) |
| Styling | Bootstrap 5 with pre-compiled theme CSS |
| Deployment | Netlify (frontend), Heroku (Rails API backend) |

### Critical Gaps for SaaS

| Gap | Impact | Priority |
|---|---|---|
| No route guards | Any URL is accessible without auth | P0 |
| No email verification | Fake accounts, spam | P0 |
| No password reset | Users locked out permanently | P0 |
| No billing/subscriptions | No revenue model | P0 |
| No campaign edit/delete | Users cannot fix mistakes | P0 |
| No loading states | Blank screens during API calls | P1 |
| No pagination | Will break at scale | P1 |
| No proper error boundaries | Unhandled crashes show blank pages | P1 |
| No onboarding flow | Users don't understand the product | P1 |
| No profile/settings management | Users cannot update their info | P1 |
| No team/org support | Single-user only | P1 |
| No email notifications | No referral alerts, no engagement | P1 |
| ROI calculation is meaningless | `incentive ** 2` is not real ROI | P1 |
| Hardcoded test credentials in form | Security concern for production | P1 |
| Referral link shows `localhost:8080` | Broken in production | P1 |
| No rate limiting | Abuse vector | P2 |
| No audit logging | No accountability trail | P2 |
| No webhook/integration support | Cannot connect to CRMs, etc. | P2 |
| No admin panel | No operational visibility | P2 |
| No GDPR/privacy tooling | Legal liability | P2 |
| No custom domains for referral pages | Less professional appearance | P3 |

---

## 2. Domain Model & Terminology

### Mapping from Original to SaaS

| Original Term | SaaS Term | Description |
|---|---|---|
| Campaign | **Resource Campaign** | A comprehensive resource package (guide, toolkit, template, course) that a professional shares |
| Company | **Organization** | The firm, practice, or company the professional represents |
| Conversion | **Referral** | A colleague who signs up through a shared resource link |
| Incentive | **Credit** | Professional development credits or monetary reward per referral |
| Referral payment | **Credit Amount** | The value earned per successful referral |
| -- (new) | **Practice Area** | Professional domain (Tax Law, Cardiology, Commercial RE, etc.) |
| -- (new) | **License Type** | Professional license category (JD, CPA, MD, PE, etc.) |
| -- (new) | **Workspace** | Multi-tenant container for an organization's campaigns and team |

### Core Entities

```
Workspace (org/firm)
  └── Members (users with roles)
  └── Resource Campaigns
        └── Referrals
              └── Referred By (self-referencing)
```

---

## 3. User Personas

### Persona A: Campaign Creator (Primary)
- **Who**: Licensed professional (attorney, CPA, doctor, agent, advisor)
- **Goal**: Grow their professional network by sharing valuable resources and incentivizing referrals
- **Pain point**: Expensive, manual networking. No way to track who referred whom or measure ROI
- **Journey**: Sign up -> Create workspace -> Create resource campaign -> Share link -> Monitor dashboard -> Earn/distribute credits

### Persona B: Referred Professional
- **Who**: A colleague or peer who receives a referral link
- **Goal**: Access a valuable professional resource
- **Pain point**: Doesn't know about the resource, needs a trusted recommendation
- **Journey**: Receives link -> Views resource landing page -> Submits info -> Gets access + own referral link -> Shares further (viral loop)

### Persona C: Workspace Admin
- **Who**: Office manager, partner, or team lead at a firm
- **Goal**: Manage campaigns across the organization, track team performance, handle billing
- **Pain point**: No visibility into firm-wide referral activity
- **Journey**: Creates workspace -> Invites team members -> Sets roles -> Reviews org-wide analytics -> Manages subscription

### Persona D: Platform Admin (Internal)
- **Who**: ProRefer operations team
- **Goal**: Monitor platform health, manage workspaces, handle support
- **Journey**: Admin panel -> View metrics -> Manage users/workspaces -> Handle flags/reports

---

## 4. Complete User Flows

### Flow 1: First-Time Visitor -> Account Creation

```
Landing Page (/)
  │
  ├── [Not logged in] See hero section, value proposition, pricing preview
  │     │
  │     ├── Click "Get Started" -> Sign Up Page (/signup)
  │     │     │
  │     │     ├── Fill: first name, last name, email, phone, password, confirm password
  │     │     ├── Select: license type (dropdown), practice area (dropdown)
  │     │     ├── Submit -> POST /api/users
  │     │     ├── Success -> "Check your email" confirmation page
  │     │     ├── User clicks email verification link -> GET /api/verify/:token
  │     │     └── Redirected to /onboarding
  │     │
  │     └── Click "Login" -> Login Page (/login)
  │           ├── Fill: email, password
  │           ├── Submit -> POST /api/sessions
  │           ├── Success -> Redirect to /dashboard
  │           ├── Failure -> "Invalid email or password"
  │           └── "Forgot password?" -> /forgot-password
  │
  └── [Logged in] See hero section with "Go to Dashboard" CTA
```

**Changes from original**:
- Dedicated signup/login pages instead of modals (better for SEO, deep linking, mobile)
- Email verification required before first login
- License type + practice area collected at signup
- Onboarding flow after first login

### Flow 2: Onboarding (New User)

```
/onboarding
  │
  ├── Step 1: Create Workspace
  │     ├── Workspace name (e.g., "Smith & Associates")
  │     ├── Organization type (Solo, Small Firm, Enterprise)
  │     └── Logo upload (optional)
  │
  ├── Step 2: Invite Team (optional, skippable)
  │     ├── Email invite field (comma-separated or one-by-one)
  │     └── Role assignment (Admin, Member, Viewer)
  │
  ├── Step 3: Create First Resource Campaign
  │     ├── Resource name
  │     ├── Practice area (auto-filled from profile)
  │     ├── Description (rich text)
  │     ├── Cover image (upload or URL)
  │     ├── Credit amount per referral
  │     └── Resource type (Guide, Toolkit, Template, Course, Webinar)
  │
  └── Step 4: Share Your Link
        ├── Shows generated referral page URL
        ├── Copy button
        ├── Social share buttons (LinkedIn, Email, Twitter)
        └── "Go to Dashboard" button
```

**Why**: The original app has zero onboarding. Users create an account and land on an empty campaigns page that auto-redirects to the "new campaign" form with no context. A guided onboarding dramatically improves activation.

### Flow 3: Dashboard (Authenticated Home)

```
/dashboard
  │
  ├── Summary Cards (top row)
  │     ├── Total Referrals (across all campaigns)
  │     ├── Total Credits Earned
  │     ├── Active Campaigns count
  │     └── Conversion Rate (referrals / link views)
  │
  ├── Recent Activity Feed
  │     ├── "Jane Smith was referred to Tax Toolkit - 2h ago"
  │     ├── "3 new referrals on Estate Planning Guide - yesterday"
  │     └── etc.
  │
  ├── Top Performing Campaign (mini chart)
  │
  └── Quick Actions
        ├── "Create New Resource"
        ├── "Share a Link"
        └── "Invite Team Member"
```

**Why**: The original has no dashboard. Users go straight to a campaigns table. A dashboard gives at-a-glance value and encourages engagement.

### Flow 4: Resource Campaign Management

```
/resources
  │
  ├── Nav tabs: [All Resources] [Active] [Paused] [Draft]
  │
  ├── Resource List (table or card view toggle)
  │     ├── Columns: Name, Practice Area, Referrals, Credits Distributed, Status, Created, Actions
  │     ├── Search bar (filters across name, practice area)
  │     ├── Sort by any column
  │     ├── Pagination (25 per page)
  │     └── Per-row actions: View | Edit | Pause/Resume | Copy Link | Delete
  │
  └── "Create Resource" button -> /resources/new

/resources/new
  │
  ├── Form
  │     ├── Resource name (required)
  │     ├── Practice area (dropdown, required)
  │     ├── Organization name (auto-filled from workspace, editable)
  │     ├── Resource type (Guide, Toolkit, Template, Course, Webinar)
  │     ├── Description (rich text editor, required)
  │     ├── Cover image (drag-and-drop upload + URL input fallback)
  │     ├── Credit amount per referral (number, required)
  │     ├── Credit type (Monetary $, CPE Credits, CLE Credits, CME Credits, Custom)
  │     ├── Status (Active / Draft)
  │     ├── Expiration date (optional)
  │     └── Max referrals cap (optional)
  │
  ├── Preview button (shows how the public referral page will look)
  │
  └── Submit -> POST /api/resources -> redirect to /resources/:id

/resources/:id (Campaign Dashboard)
  │
  ├── Header: Resource name, practice area, status badge, edit button
  │
  ├── Stat Cards (row)
  │     ├── Total Referrals
  │     ├── Total Credits Distributed (sum of all referral credits)
  │     ├── Conversion Rate (referrals / page views)
  │     └── Avg. Referrals per Person (viral coefficient)
  │
  ├── Shareable Link Section
  │     ├── Full URL displayed
  │     ├── Copy button
  │     ├── QR code generator
  │     └── Social share buttons (LinkedIn, Email, Twitter)
  │
  ├── Referrals Table
  │     ├── Columns: #, Name, Email, Phone, Referred By, Credits Earned, Date, Actions
  │     ├── Search/filter bar
  │     ├── Sortable columns
  │     ├── Pagination
  │     ├── Export to CSV button
  │     └── Click row -> Referral detail modal
  │           ├── Full contact info
  │           ├── Referral chain visualization (who referred whom)
  │           ├── Total sub-referrals
  │           ├── Timestamp
  │           └── Notes field (editable)
  │
  └── Analytics Section (charts)
        ├── Referrals over time (line chart)
        ├── Top referrers (bar chart)
        └── Geographic breakdown (if location collected)

/resources/:id/edit
  │
  └── Same form as /resources/new, pre-filled with existing data
```

**Changes from original**:
- Campaign editing and deletion (original has create + read only)
- Status management (active/paused/draft)
- Card view option alongside table
- Pagination and sorting
- CSV export
- QR code generation
- Rich text description
- File upload instead of just URL input
- Referral chain visualization in modal
- Analytics charts
- Expiration dates and caps

### Flow 5: Public Referral Page (The Money Page)

```
/r/:resourceSlug (or /:resourceId/refer)
  │
  ├── [Campaign exists & active]
  │     ├── Left side: Referral form
  │     │     ├── Resource name + organization prominently displayed
  │     │     ├── Resource description
  │     │     ├── Credit incentive displayed: "You'll earn X per referral"
  │     │     ├── Form: first name, last name, email, phone
  │     │     ├── License number (optional, for verification)
  │     │     ├── Consent checkbox: "I agree to the Terms of Service and Privacy Policy"
  │     │     ├── Submit -> POST /api/referrals
  │     │     └── Redirect to /r/:resourceSlug/success/:referralId
  │     │
  │     └── Right side: Cover image (full-height, like original)
  │
  ├── [Campaign exists but paused/expired]
  │     └── "This resource is no longer accepting referrals" message
  │
  └── [Campaign doesn't exist]
        └── 404 page
```

**Changes from original**:
- Slug-based URLs instead of numeric IDs (more professional: `/r/tax-planning-toolkit` vs `/3/new`)
- Shows resource description and credit info upfront
- Consent checkbox for legal compliance
- Handles paused/expired state gracefully
- Optional license number field for professional verification

### Flow 6: Referral Success & Viral Loop

```
/r/:resourceSlug/success/:referralId
  │
  ├── Success confirmation
  │     ├── Green checkmark animation
  │     ├── "[Organization] thanks you!"
  │     ├── "You'll earn [credit amount] for each colleague you refer"
  │     │
  │     ├── Your Unique Referral Link
  │     │     ├── Full URL with referral tracking: /r/:slug?ref=:referralId
  │     │     ├── Copy button (with "Copied!" feedback)
  │     │     ├── QR code
  │     │     └── Share buttons
  │     │           ├── LinkedIn (pre-filled message)
  │     │           ├── Email (pre-filled subject + body)
  │     │           └── Twitter/X
  │     │
  │     ├── Referral Stats
  │     │     ├── "Your referrals so far: X"
  │     │     └── "Credits earned: $X.XX"
  │     │
  │     └── CTA Section
  │           ├── "Want to create your own resource campaigns?"
  │           ├── "Start Free Trial" button -> /signup
  │           └── Brief value prop
  │
  └── [Invalid referral ID] -> 404
```

**Changes from original**:
- Link uses dynamic base URL (not hardcoded localhost)
- QR code for in-person sharing
- LinkedIn/Email share with pre-filled professional messages
- Tracks credits earned (not just referral count)
- Upsell CTA to convert referred professionals into campaign creators (SaaS growth loop)

### Flow 7: Referral Lookup

```
/lookup
  │
  ├── Search Form
  │     ├── Phone number input
  │     ├── OR email input (new -- phone-only is limiting)
  │     └── Search button -> GET /api/referrals/lookup?phone=X&email=Y
  │
  ├── Results (inline, not modal -- modals are bad for this UX)
  │     ├── [Results found]
  │     │     ├── List of referral cards
  │     │     │     ├── Resource name + organization
  │     │     │     ├── Date referred
  │     │     │     ├── Credits earned
  │     │     │     └── "View Details" -> /r/:slug/success/:id
  │     │     └── Pagination if many results
  │     │
  │     └── [No results]
  │           ├── "No referrals found for this phone/email"
  │           └── "Have a referral link? Paste it here:" input
```

**Changes from original**:
- Email lookup in addition to phone
- Inline results instead of modal (original modal has UX issues)
- Shows credits earned per referral
- Fallback for pasting a referral link directly

### Flow 8: Password Reset

```
/forgot-password
  │
  ├── Email input + Submit
  ├── POST /api/password-reset
  ├── "Check your email" confirmation
  │
  └── Email contains link -> /reset-password/:token
        ├── New password + confirm password
        ├── Submit -> PUT /api/password-reset/:token
        └── Success -> redirect to /login with flash "Password updated"
```

**Why**: The original has zero password reset. Users who forget credentials are permanently locked out.

### Flow 9: Profile & Settings

```
/settings
  │
  ├── Tab: Profile
  │     ├── Name, email, phone
  │     ├── License type, license number
  │     ├── Practice area
  │     ├── Avatar upload
  │     └── Save button
  │
  ├── Tab: Workspace
  │     ├── Workspace name, logo
  │     ├── Default organization name (used in campaigns)
  │     ├── Team members list
  │     │     ├── Name, email, role, status (active/invited/deactivated)
  │     │     ├── Change role dropdown
  │     │     ├── Remove member button
  │     │     └── "Invite Member" button (opens invite form)
  │     └── Save button
  │
  ├── Tab: Billing (see Section 11)
  │     ├── Current plan
  │     ├── Usage stats
  │     ├── Payment method
  │     ├── Invoice history
  │     └── Upgrade/downgrade buttons
  │
  ├── Tab: Integrations
  │     ├── Webhook URL configuration
  │     ├── Zapier connection
  │     ├── CRM integrations (Salesforce, HubSpot)
  │     └── API key management
  │
  └── Tab: Security
        ├── Change password
        ├── Two-factor authentication toggle
        ├── Active sessions list
        └── "Delete Account" (with confirmation)
```

### Flow 10: Logout

```
/logout
  │
  ├── POST /api/sessions/logout (invalidate token server-side)
  ├── Clear all localStorage/sessionStorage
  ├── Clear auth headers
  └── Redirect to / with flash "Logged out successfully"
```

**Change from original**: Server-side token invalidation (original only clears client-side).

---

## 5. Information Architecture & Routes

### Public Routes (no auth required)

| Route | Page | Purpose |
|---|---|---|
| `/` | Landing | Marketing page, pricing, value prop |
| `/login` | Login | Dedicated login page |
| `/signup` | Sign Up | Registration with license info |
| `/forgot-password` | Forgot Password | Email input for reset |
| `/reset-password/:token` | Reset Password | New password form |
| `/verify/:token` | Email Verification | Confirms email address |
| `/r/:slug` | Public Referral Page | Where referred professionals sign up |
| `/r/:slug/success/:id` | Referral Success | Confirmation + share link |
| `/lookup` | Referral Lookup | Find referral by phone/email |
| `/pricing` | Pricing | Plan comparison |
| `/terms` | Terms of Service | Legal |
| `/privacy` | Privacy Policy | Legal |

### Authenticated Routes (auth required)

| Route | Page | Purpose |
|---|---|---|
| `/onboarding` | Onboarding Wizard | First-time setup |
| `/dashboard` | Dashboard | Overview + activity feed |
| `/resources` | Resource List | All campaigns |
| `/resources/new` | Create Resource | New campaign form |
| `/resources/:id` | Resource Dashboard | Campaign detail + stats |
| `/resources/:id/edit` | Edit Resource | Update campaign |
| `/settings` | Settings | Profile, workspace, billing |
| `/settings/billing` | Billing | Subscription management |
| `/settings/team` | Team | Member management |

### Admin Routes (admin role required)

| Route | Page | Purpose |
|---|---|---|
| `/admin` | Admin Dashboard | Platform metrics |
| `/admin/workspaces` | Workspaces | All tenants |
| `/admin/users` | Users | All users |
| `/admin/billing` | Billing | Revenue, subscriptions |
| `/admin/flags` | Flags/Reports | Abuse reports |

---

## 6. Feature Specification

### 6.1 Resource Campaign Features

| Feature | Description | Priority |
|---|---|---|
| Create resource | Form with all fields from Flow 4 | P0 |
| Edit resource | Update any field after creation | P0 |
| Delete resource | Soft delete with confirmation | P0 |
| Pause/resume | Toggle accepting new referrals | P0 |
| Draft mode | Save without publishing | P1 |
| Slug-based URLs | Auto-generated from name, editable | P1 |
| Resource types | Guide, Toolkit, Template, Course, Webinar | P1 |
| Expiration date | Auto-pause after date | P2 |
| Max referral cap | Auto-pause after N referrals | P2 |
| Custom branding | Colors, logo on referral page | P2 |
| A/B test variants | Multiple versions of referral page | P3 |

### 6.2 Referral Tracking Features

| Feature | Description | Priority |
|---|---|---|
| Basic referral chain | Track who referred whom (1 level) | P0 |
| Multi-level chain | Track full referral tree (N levels deep) | P1 |
| Credit calculation | Auto-calculate based on chain | P0 |
| Referral status | Pending, Verified, Credited, Expired | P1 |
| Duplicate detection | Prevent same email/phone registering twice per campaign | P0 |
| Fraud detection | Flag suspicious patterns (same IP, rapid submissions) | P2 |
| Manual referral add | Admin can add referrals manually | P2 |
| Referral notes | Campaign owner can add notes to any referral | P2 |

### 6.3 Analytics Features

| Feature | Description | Priority |
|---|---|---|
| Page view tracking | Count unique visits to referral page | P0 |
| Conversion rate | Referrals / page views | P0 |
| Referrals over time | Line chart, daily/weekly/monthly | P1 |
| Top referrers | Leaderboard of most active referrers | P1 |
| Viral coefficient | Avg referrals per person | P1 |
| CSV export | Download referral data | P1 |
| Real ROI calculation | Credits distributed vs. value generated | P1 |
| Funnel visualization | Views -> Form starts -> Submissions | P2 |
| Cohort analysis | Retention by signup week | P3 |

---

## 7. Data Model

```
┌─────────────────────┐
│      workspaces      │
├─────────────────────┤
│ id                   │
│ name                 │
│ slug                 │
│ logo_url             │
│ organization_type    │  -- solo, small_firm, enterprise
│ stripe_customer_id   │
│ plan                 │  -- free, professional, enterprise
│ plan_status          │  -- active, past_due, canceled
│ created_at           │
│ updated_at           │
└────────┬────────────┘
         │
         │ has_many
         ▼
┌─────────────────────┐       ┌─────────────────────┐
│      memberships     │──────>│        users         │
├─────────────────────┤       ├─────────────────────┤
│ id                   │       │ id                   │
│ workspace_id (FK)    │       │ first_name           │
│ user_id (FK)         │       │ last_name            │
│ role                 │       │ email (unique)       │
│ status               │       │ phone                │
│ invited_at           │       │ password_digest      │
│ accepted_at          │       │ license_type         │
│ created_at           │       │ license_number       │
└─────────────────────┘       │ practice_area        │
                               │ avatar_url           │
                               │ email_verified_at    │
                               │ otp_secret           │
                               │ created_at           │
                               │ updated_at           │
                               └──────────────────────┘

┌──────────────────────────┐
│     resource_campaigns    │
├──────────────────────────┤
│ id                        │
│ workspace_id (FK)         │
│ created_by_user_id (FK)   │
│ name                      │
│ slug (unique)             │
│ organization_name         │
│ practice_area             │
│ resource_type             │  -- guide, toolkit, template, course, webinar
│ description               │  -- rich text
│ image_url                 │
│ credit_amount             │  -- decimal
│ credit_type               │  -- monetary, cpe, cle, cme, custom
│ status                    │  -- draft, active, paused, expired
│ expires_at                │
│ max_referrals             │
│ page_views_count          │  -- counter cache
│ referrals_count           │  -- counter cache
│ created_at                │
│ updated_at                │
│ deleted_at                │  -- soft delete
└────────┬─────────────────┘
         │
         │ has_many
         ▼
┌──────────────────────────┐
│        referrals          │
├──────────────────────────┤
│ id                        │
│ resource_campaign_id (FK) │
│ referred_by_id (FK, self) │  -- nullable, self-referencing
│ first_name                │
│ last_name                 │
│ email                     │
│ phone                     │
│ license_number            │  -- optional
│ status                    │  -- pending, verified, credited, expired
│ credits_earned            │  -- decimal, calculated
│ total_sub_referrals       │  -- counter cache
│ ip_address                │  -- for fraud detection
│ user_agent                │
│ notes                     │
│ created_at                │
│ updated_at                │
└──────────────────────────┘

┌──────────────────────────┐
│      page_views           │
├──────────────────────────┤
│ id                        │
│ resource_campaign_id (FK) │
│ referral_id (FK, nullable)│  -- which referral link was used
│ ip_address                │
│ user_agent                │
│ referrer_url              │
│ created_at                │
└──────────────────────────┘

┌──────────────────────────┐
│     subscriptions         │
├──────────────────────────┤
│ id                        │
│ workspace_id (FK)         │
│ stripe_subscription_id    │
│ plan                      │
│ status                    │
│ current_period_start      │
│ current_period_end        │
│ canceled_at               │
│ created_at                │
│ updated_at                │
└──────────────────────────┘

┌──────────────────────────┐
│     audit_logs            │
├──────────────────────────┤
│ id                        │
│ workspace_id (FK)         │
│ user_id (FK)              │
│ action                    │  -- created, updated, deleted, exported, etc.
│ resource_type             │  -- Campaign, Referral, Membership, etc.
│ resource_id               │
│ metadata (jsonb)          │
│ ip_address                │
│ created_at                │
└──────────────────────────┘
```

### Key Relationships

- A **User** belongs to many **Workspaces** through **Memberships**
- A **Workspace** has many **Resource Campaigns**
- A **Resource Campaign** has many **Referrals**
- A **Referral** optionally belongs to another **Referral** (referred_by -- the viral chain)
- A **Referral** has many **Referrals** (sub-referrals it generated)

---

## 8. API Design

### Authentication

```
POST   /api/v1/users                    # Sign up
POST   /api/v1/sessions                 # Login -> returns JWT
DELETE /api/v1/sessions                  # Logout (invalidate)
POST   /api/v1/verify-email             # Send verification email
GET    /api/v1/verify-email/:token       # Verify email
POST   /api/v1/password-reset           # Request password reset
PUT    /api/v1/password-reset/:token     # Reset password
```

### User & Profile

```
GET    /api/v1/me                        # Current user profile
PUT    /api/v1/me                        # Update profile
DELETE /api/v1/me                        # Delete account
PUT    /api/v1/me/password               # Change password
POST   /api/v1/me/avatar                 # Upload avatar
```

### Workspaces

```
POST   /api/v1/workspaces               # Create workspace
GET    /api/v1/workspaces               # List user's workspaces
GET    /api/v1/workspaces/:id            # Get workspace details
PUT    /api/v1/workspaces/:id            # Update workspace
DELETE /api/v1/workspaces/:id            # Delete workspace
```

### Team / Memberships

```
GET    /api/v1/workspaces/:id/members    # List members
POST   /api/v1/workspaces/:id/invites    # Invite member
PUT    /api/v1/memberships/:id           # Update role
DELETE /api/v1/memberships/:id           # Remove member
POST   /api/v1/invites/:token/accept     # Accept invite
```

### Resource Campaigns

```
GET    /api/v1/resources                 # List campaigns (paginated, filterable)
POST   /api/v1/resources                 # Create campaign
GET    /api/v1/resources/:id             # Get campaign + stats
PUT    /api/v1/resources/:id             # Update campaign
DELETE /api/v1/resources/:id             # Soft-delete campaign
PUT    /api/v1/resources/:id/pause       # Pause campaign
PUT    /api/v1/resources/:id/resume      # Resume campaign
GET    /api/v1/resources/:id/analytics   # Detailed analytics
GET    /api/v1/resources/:id/export      # CSV export
```

### Referrals

```
GET    /api/v1/resources/:id/referrals   # List referrals (paginated)
POST   /api/v1/referrals                 # Create referral (public)
GET    /api/v1/referrals/:id             # Get referral details
PUT    /api/v1/referrals/:id             # Update (notes, status)
GET    /api/v1/referrals/lookup          # Lookup by phone/email (public)
```

### Public (No Auth)

```
GET    /api/v1/public/resources/:slug    # Get campaign for referral page
POST   /api/v1/public/referrals          # Submit referral
GET    /api/v1/public/referrals/:id      # Get referral for success page
GET    /api/v1/public/referrals/lookup   # Lookup referrals
```

### Billing

```
POST   /api/v1/billing/checkout          # Create Stripe checkout session
GET    /api/v1/billing/portal            # Redirect to Stripe customer portal
GET    /api/v1/billing/subscription      # Current subscription details
POST   /api/v1/billing/webhooks          # Stripe webhook handler
```

### Pagination & Filtering Convention

All list endpoints support:
```
?page=1&per_page=25
?sort=created_at&order=desc
?search=keyword
?status=active
?practice_area=tax_law
?date_from=2025-01-01&date_to=2025-12-31
```

Response format:
```json
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "per_page": 25,
    "total_pages": 4,
    "total_count": 92
  }
}
```

---

## 9. Tech Stack Recommendation

### Frontend

| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Vue 3** (Composition API) | Modern, better TS support, smaller bundle than Vue 2 |
| Build | **Vite** | 10-100x faster than Webpack/Vue CLI |
| Router | **Vue Router 4** | Vue 3 compatible |
| State | **Pinia** | Official Vue 3 store, replaces Vuex. Handles auth state, workspace context, etc. |
| HTTP | **Axios** | Keep from original, mature, interceptors for auth |
| UI Framework | **Tailwind CSS** + **Headless UI** | More flexible than Bootstrap, better for custom SaaS design |
| Forms | **VeeValidate** + **Zod** | Schema-based validation, type-safe |
| Charts | **Chart.js** via **vue-chartjs** | Lightweight, covers all needed chart types |
| Rich Text | **Tiptap** | Vue-native rich text editor for resource descriptions |
| File Upload | **vue-dropzone** or native | Drag-and-drop image upload |
| Notifications | **vue-toastification** | Toast notifications for actions |
| Date | **date-fns** | Lightweight date formatting |
| QR Code | **qrcode** (npm) | Generate QR codes for referral links |
| Testing | **Vitest** + **Vue Test Utils** + **Cypress** | Unit + E2E |

### Backend

| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Ruby on Rails 7** (API mode) | Keep from original, battle-tested for SaaS |
| Auth | **Devise** + **devise-jwt** | Industry standard Rails auth |
| Authorization | **Pundit** | Policy-based, clean |
| Background Jobs | **Sidekiq** + **Redis** | Email delivery, analytics aggregation |
| File Storage | **Active Storage** + **S3** | Image uploads |
| Search | **pg_search** or **Ransack** | Filter/search referral tables |
| Pagination | **Pagy** | Fastest Rails paginator |
| Serialization | **Alba** or **Blueprinter** | Fast JSON serialization |
| Billing | **pay** gem + **Stripe** | Subscription management |
| Email | **Action Mailer** + **SendGrid/Postmark** | Transactional email |
| Rate Limiting | **Rack::Attack** | API protection |
| Soft Delete | **Discard** | Soft-delete campaigns |
| Audit | **Audited** or **PaperTrail** | Change tracking |
| Testing | **RSpec** + **FactoryBot** + **Faker** | Comprehensive test suite |
| Database | **PostgreSQL** | JSONB support, robust, scalable |
| Caching | **Redis** | Session store, cache, Sidekiq |

### Infrastructure

| Layer | Technology | Rationale |
|---|---|---|
| Frontend Hosting | **Vercel** or **Netlify** | Keep from original pattern, auto-deploy |
| Backend Hosting | **Render** or **Railway** | Modern Heroku alternatives, simpler than AWS |
| Database | **Managed PostgreSQL** (Render/Railway) | Zero-ops database |
| File Storage | **AWS S3** or **Cloudflare R2** | Image/file uploads |
| CDN | **Cloudflare** | Asset delivery, DDoS protection |
| Email | **Postmark** or **SendGrid** | Transactional email delivery |
| Monitoring | **Sentry** (errors) + **LogRocket** (session replay) | Debug production issues |
| Analytics | **PostHog** or **Plausible** | Privacy-friendly product analytics |
| CI/CD | **GitHub Actions** | Auto-test and deploy on push |

---

## 10. Authentication & Authorization

### Authentication Flow

```
┌──────────┐    POST /sessions     ┌──────────┐
│  Client   │──────────────────────>│  Server   │
│           │                       │           │
│           │  { access_token,      │  Validates │
│           │<── refresh_token }────│  creds     │
│           │                       │           │
│  Stores   │  GET /resources       │           │
│  tokens   │──────────────────────>│  Verifies  │
│  in       │  Authorization:       │  JWT       │
│  memory + │  Bearer <access>      │           │
│  httpOnly │                       │           │
│  cookie   │                       │           │
└──────────┘                       └──────────┘
```

### Token Strategy

- **Access token**: Short-lived (15 min), stored in memory (Pinia store)
- **Refresh token**: Long-lived (7 days), stored in httpOnly cookie
- **On page load**: Attempt silent refresh via cookie
- **On 401 response**: Auto-refresh and retry the request (Axios interceptor)

**Why change from original**: The original stores JWT in localStorage, which is vulnerable to XSS attacks. httpOnly cookies + in-memory access tokens is the secure standard.

### Authorization (Roles)

| Role | Capabilities |
|---|---|
| **Owner** | Full access, billing, delete workspace, transfer ownership |
| **Admin** | Manage members, all campaign CRUD, view all analytics |
| **Member** | Create/manage own campaigns, view own analytics |
| **Viewer** | Read-only access to campaigns and analytics |

### Route Guards

```javascript
// Every authenticated route checks:
// 1. Is there a valid access token?
// 2. Does the user have the required role?
// 3. Does the user belong to the current workspace?

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiredRole && !authStore.hasRole(to.meta.requiredRole)) {
    return { name: 'dashboard' } // or show 403
  }
})
```

### Multi-Factor Authentication (P2)

- TOTP-based (Google Authenticator, Authy)
- Optional per user, enforceable per workspace (admin setting)
- Recovery codes generated on setup

---

## 11. Billing & Subscriptions

### Pricing Tiers

| Feature | Free | Professional ($29/mo) | Enterprise ($99/mo) |
|---|---|---|---|
| Resource campaigns | 1 | 10 | Unlimited |
| Referrals per campaign | 25 | 500 | Unlimited |
| Team members | 1 | 5 | 25 |
| Analytics | Basic (counts only) | Full (charts, export) | Full + API access |
| Custom branding | No | Yes | Yes |
| Integrations | No | Zapier | Zapier + API + Webhooks |
| QR codes | No | Yes | Yes |
| Support | Community | Email | Priority + Phone |
| Data export | No | CSV | CSV + API |
| Audit log | No | No | Yes |

### Billing Integration (Stripe)

```
User clicks "Upgrade"
  -> POST /api/v1/billing/checkout { plan: 'professional' }
  -> Server creates Stripe Checkout Session
  -> Client redirected to Stripe-hosted checkout page
  -> User pays
  -> Stripe redirects to /settings/billing?success=true
  -> Stripe sends webhook to POST /api/v1/billing/webhooks
  -> Server updates workspace plan + status
```

### Enforcement

- Plan limits checked server-side on every create action
- Approaching limits trigger in-app banner: "You've used 8 of 10 campaigns. Upgrade for more."
- Exceeding limits returns 402 with upgrade prompt
- Grace period on downgrade (keep existing campaigns, just can't create new ones)

---

## 12. Email & Notification System

### Transactional Emails

| Trigger | Email | Recipient |
|---|---|---|
| Sign up | Welcome + verify email link | New user |
| Email verified | "You're all set!" | User |
| Password reset requested | Reset link (expires 1h) | User |
| Password changed | Security confirmation | User |
| Team invite | Invite link + workspace info | Invitee |
| Invite accepted | "[Name] joined your workspace" | Workspace admins |
| New referral received | "[Name] was referred to [Resource]" | Campaign creator |
| Referral milestone | "You hit 50 referrals on [Resource]!" | Campaign creator |
| Approaching plan limit | "You've used 80% of your referrals" | Workspace owner |
| Subscription renewal | Receipt | Workspace owner |
| Subscription failed | "Update your payment method" | Workspace owner |
| Account deletion | Confirmation | User |

### In-App Notifications (P2)

- Bell icon in header with unread count
- Dropdown shows recent notifications
- Types: new referral, team activity, plan alerts
- Persisted in database, mark as read

### Notification Preferences (Settings)

```
Email notifications:
  [ ] New referral received
  [ ] Weekly digest
  [ ] Referral milestones (10, 25, 50, 100)
  [ ] Team activity
  [x] Security alerts (cannot disable)
  [x] Billing alerts (cannot disable)
```

---

## 13. Analytics & Reporting

### Dashboard Analytics

```
Overview (workspace-level):
  ├── Total referrals (all time, this month, this week)
  ├── Total credits distributed
  ├── Active campaigns count
  ├── Overall conversion rate
  └── Growth trend (% change from last period)

Per-Campaign Analytics:
  ├── Page views over time (line chart)
  ├── Referrals over time (line chart)
  ├── Conversion rate over time (line chart)
  ├── Top referrers (horizontal bar chart)
  ├── Referral chain depth distribution (histogram)
  ├── Viral coefficient (K-factor = avg invites * conversion rate)
  └── Credit distribution summary
```

### ROI Calculation (Replacing the Broken One)

The original calculates ROI as `incentive ** 2` which is meaningless. Replace with:

```
Total Credits Distributed = SUM(all referral credits for campaign)
Estimated Value Generated = Total Referrals * Avg Client Value (user-configurable)
ROI = ((Value Generated - Credits Distributed) / Credits Distributed) * 100

If no Avg Client Value set, show:
  Cost per Referral = Credits Distributed / Total Referrals
```

User can set "Average Client Value" per campaign in settings to enable ROI calculation.

---

## 14. Compliance & Legal

### Required Pages

- **Terms of Service**: Governs platform usage, account responsibilities
- **Privacy Policy**: GDPR/CCPA compliant, explains data collection and processing
- **Cookie Policy**: What cookies are used and why
- **Referral Terms**: Rules for credit earning, payout conditions

### GDPR Compliance

| Requirement | Implementation |
|---|---|
| Right to access | Users can export their data from settings |
| Right to erasure | "Delete Account" fully removes personal data |
| Consent | Checkbox on referral form + signup form |
| Data portability | CSV export of all user data |
| Data processing agreement | Available for Enterprise customers |
| Cookie consent | Banner on first visit |
| Data retention | Auto-delete inactive referral data after 2 years |

### Professional Compliance Considerations

- **License verification**: Optional field, not validated (liability). Display disclaimer: "ProRefer does not verify professional licenses"
- **Credit type transparency**: Clearly label whether credits are monetary or professional development (CPE/CLE/CME)
- **Anti-spam**: Rate limit referral link sharing, flag bulk submissions
- **Financial regulations**: If monetary credits exceed thresholds, may need 1099 reporting (US). Flag this in terms and Enterprise tier

---

## 15. Infrastructure & DevOps

### Environment Setup

```
Environments:
  ├── Development (local)
  │     ├── Frontend: Vite dev server (localhost:5173)
  │     ├── Backend: Rails server (localhost:3000)
  │     ├── Database: Local PostgreSQL
  │     └── Redis: Local Redis
  │
  ├── Staging (auto-deploy from develop branch)
  │     ├── Frontend: Vercel preview
  │     ├── Backend: Render staging
  │     └── Database: Render managed PG (staging)
  │
  └── Production (auto-deploy from main branch)
        ├── Frontend: Vercel production
        ├── Backend: Render production
        ├── Database: Render managed PG (production)
        ├── Redis: Render managed Redis
        ├── CDN: Cloudflare
        └── Monitoring: Sentry + LogRocket
```

### CI/CD Pipeline (GitHub Actions)

```yaml
On Pull Request:
  ├── Lint (ESLint + RuboCop)
  ├── Type check (if using TypeScript)
  ├── Unit tests (Vitest + RSpec)
  ├── E2E tests (Cypress)
  └── Security audit (npm audit + bundler-audit)

On Merge to main:
  ├── All above checks
  ├── Build frontend
  ├── Run migrations
  ├── Deploy backend
  ├── Deploy frontend
  ├── Smoke tests
  └── Notify team (Slack)
```

### Monitoring & Alerting

- **Error tracking**: Sentry (frontend + backend)
- **Uptime monitoring**: BetterUptime or UptimeRobot
- **Performance**: Sentry Performance (transaction traces)
- **Logs**: Structured logging with request IDs
- **Alerts**: PagerDuty or Slack for critical errors, high error rates, downtime

---

## 16. Implementation Phases

### Phase 1: Foundation (Weeks 1-4)

**Goal**: Core app with auth, campaign CRUD, and referral flow working end-to-end.

- [ ] Project scaffolding (Vue 3 + Vite + Tailwind frontend, Rails 7 API backend)
- [ ] Database schema + migrations for users, workspaces, resource_campaigns, referrals
- [ ] User registration with email verification
- [ ] Login / logout with JWT (access + refresh tokens)
- [ ] Password reset flow
- [ ] Workspace creation (simplified -- auto-created on signup)
- [ ] Resource campaign CRUD (create, read, update, soft-delete)
- [ ] Public referral page (submit referral form)
- [ ] Referral success page with shareable link
- [ ] Referral lookup by phone/email
- [ ] Basic route guards (authenticated vs public)
- [ ] Pinia store for auth state + workspace context
- [ ] Loading states and error handling throughout
- [ ] Pagination on all list endpoints
- [ ] Deploy to staging

### Phase 2: Polish & Analytics (Weeks 5-8)

**Goal**: Production-ready UX with analytics and onboarding.

- [ ] Onboarding wizard (3-4 steps)
- [ ] Dashboard with summary stats
- [ ] Campaign dashboard with stat cards (proper ROI calculation)
- [ ] Referrals table with search, sort, filter, pagination
- [ ] Referral detail modal with chain visualization
- [ ] Campaign pause/resume functionality
- [ ] Draft mode for campaigns
- [ ] QR code generation for referral links
- [ ] Social sharing buttons (LinkedIn, Email, Twitter)
- [ ] Page view tracking (count views on referral pages)
- [ ] CSV export for referral data
- [ ] Toast notifications for user actions
- [ ] Responsive design pass (mobile-first)
- [ ] Deploy to production

### Phase 3: SaaS & Billing (Weeks 9-12)

**Goal**: Monetization and team features.

- [ ] Stripe integration (checkout, customer portal, webhooks)
- [ ] Three pricing tiers (Free, Professional, Enterprise)
- [ ] Plan limit enforcement (server-side)
- [ ] Upgrade/downgrade flow
- [ ] Invoice history
- [ ] Team invitations (email)
- [ ] Role-based access control (Owner, Admin, Member, Viewer)
- [ ] Team member management UI
- [ ] Settings page (profile, workspace, billing, security)
- [ ] Change password
- [ ] Email notifications (new referral, milestones, billing)
- [ ] Notification preferences
- [ ] Terms of Service + Privacy Policy pages

### Phase 4: Growth & Scale (Weeks 13-16)

**Goal**: Viral growth features and integrations.

- [ ] Charts (referrals over time, top referrers, conversion rate)
- [ ] Multi-level referral chain tracking + visualization
- [ ] Viral coefficient calculation
- [ ] Custom branding on referral pages (logo, colors)
- [ ] Slug-based URLs for campaigns
- [ ] Rich text editor for resource descriptions
- [ ] Image upload (Active Storage + S3)
- [ ] Webhook configuration (notify external systems on new referral)
- [ ] Zapier integration
- [ ] Duplicate/fraud detection
- [ ] Rate limiting (Rack::Attack)
- [ ] Audit logging

### Phase 5: Enterprise (Weeks 17-20)

**Goal**: Enterprise-ready features.

- [ ] Admin panel (platform metrics, workspace management, user management)
- [ ] Two-factor authentication (TOTP)
- [ ] SSO (SAML/OAuth) for Enterprise workspaces
- [ ] API key management for external integrations
- [ ] Advanced analytics (funnel visualization, cohort analysis)
- [ ] Custom domains for referral pages
- [ ] A/B testing for referral page variants
- [ ] GDPR tools (data export, account deletion, consent management)
- [ ] In-app notification center
- [ ] Comprehensive E2E test suite
- [ ] Performance optimization (lazy loading, caching, CDN)
- [ ] Security audit

---

## Appendix: Original vs. SaaS Comparison

| Aspect | Original (refer-everyone-vue) | SaaS (ProRefer) |
|---|---|---|
| Auth storage | localStorage (XSS vulnerable) | httpOnly cookie + memory |
| Auth flow | Modal-only, no email verify | Dedicated pages, email verify, password reset, MFA |
| State management | None (localStorage) | Pinia store |
| Route protection | None | beforeEach guards with role checks |
| Campaign management | Create + read only | Full CRUD + pause/resume + draft |
| Referral URLs | `/:id/new` (numeric) | `/r/:slug` (human-readable) |
| Analytics | 3 stat cards, broken ROI | Full dashboard, charts, CSV export, real ROI |
| Referral table | Basic filter with vue2-filters | Search, sort, paginate, export, detail modal with chain viz |
| Team support | None (single user) | Multi-user workspaces with roles |
| Billing | None | Stripe, 3 tiers, usage enforcement |
| Emails | None | Full transactional email system |
| Notifications | None | Email + in-app notifications |
| Error handling | Console.log only | Toast notifications, error boundaries, Sentry |
| Loading states | None (blank during load) | Skeleton loaders, spinners |
| Mobile | Partially responsive | Mobile-first responsive |
| Testing | None | Unit + Integration + E2E |
| CI/CD | None | GitHub Actions, auto-deploy |
| Monitoring | Google Analytics only | Sentry, uptime monitoring, structured logs |
| Legal | None | ToS, Privacy Policy, GDPR tools |
