# AI\_CONTEXT.md

This document serves as the **Single Source of Truth (SSoT)** for AI coding assistants. It contains the technical specifications, architectural constraints, and business logic required to implement the **Milbe Academic Marketplace** MVP.

## 1\. Project Summary

**Milbe** is a Full-Stack academic book matching platform designed for students in Bangladesh to sell or donate used books.

* **Core Purpose:** Facilitate discovery and buyer-seller connection. 1  
* **Explicit Exclusions:** No internal payment processing, no delivery/courier tracking, and no live chat in the MVP. 1, 2  
* **Key Value Prop:** Auto-generated titles based on a "Knowledge Base" and a controlled request system to protect seller privacy. 3, 4

## 2\. Technology Stack

* **Language:** TypeScript (Mandatory for both Frontend and Backend). 5  
* **Frontend:** Next.js, React, Tailwind CSS, HeroUI (formerly NextUI), React Hook Form. 6, 7  
* **Backend:** Node.js with Express.js. 6, 7  
* **Database:** MongoDB Atlas (using Mongoose). 6, 7  
* **Authentication:** BetterAuth (Email-based, secure sessions). 6-8  
* **File Storage:** Cloudinary or ImgBB (for book images). 6, 9  
* **Deployment:** Vercel (Frontend/Serverless). 6

## 3\. Folder Architecture (Recommended)

/root  
  /apps (Monorepo) or separate repos  
    /web (Next.js)  
      /components (Reusable UI)  
      /hooks (Custom logic)  
      /services (API calls)  
      /app (App Router)  
    /server (Express)  
      /controllers  
      /models (Mongoose)  
      /routes  
      /middleware (Auth/Validation)  
      /utils

* **Naming Convention:** Use camelCase for files/folders except for React components, which use PascalCase. 10

## 4\. Coding Conventions

* **Strict Typing:** No any types; define Interfaces/Types for all API responses and DB models. 5  
* **RESTful APIs:** Use plural nouns for resources (e.g., /api/posts). 11  
* **Atomic Operations:** Use MongoDB transactions for critical state changes (e.g., accepting a request). 12, 13  
* **Validation:** Use Zod or Joi for schema validation on both Client and Server. 14

## 5\. UI Guidelines & Theme

* **Primary Color:** \#35858E (Trust/Education) \- Used for Navbar, CTA, Links. 9, 15  
* **Secondary Color:** \#7DA78C (Community/Donate) \- Used for Badges, Icons. 9, 15  
* **Accent Color:** \#FCDE70 (Attention) \- Used for Featured/Popular badges. 9, 15  
* **Background:** \#F5F7F8 (Off-white/Academic). 9, 15  
* **Typography:** Heading (\#185519), Text (\#4B5563). 9, 15  
* **Layout:** Responsive grid (4 columns Desktop, 2 Tablet, 1 Mobile). 16, 17  
* **Components:** HeroUI library for consistent inputs, buttons, and modals. 7, 18

## 6\. Database Collections

### Posts (Primary Collection)

* **Rule:** Do NOT create a separate books collection. **Embed** a books\[\] array inside the posts document. 11, 19-21  
* **Fields:** title, postType (sell/donate), district, area, contact (phone/messenger), description, images (string), status (available/reserved/sold/donated), authorId, books (array of objects).

### Knowledge Base (Academic Books & Publishers)

* **academicBooks:** Used for autocomplete and auto-title generation. Includes name, level, subject, group. 20, 22  
* **publishers:** Master list of publishers. 20, 22

### User/Request Tracking

* **users:** Integrated with BetterAuth. 23  
* **bookRequests:** Tracks buyerId, sellerId, postId, message, and status (pending/accepted/closed). 20

## 7\. Authentication Flow

1. **Registration:** Collect Name, Email, Password. Send verification email via BetterAuth. 24, 25  
2. **Verification:** User must click the link to change emailVerified to true. 14, 26  
3. **Restriction:** Unverified users can browse but **cannot** create posts or send requests. 14, 27  
4. **Session:** Use secure, HttpOnly cookies for session management. 28

## 8\. API Summary

* **Auth:** Built-in BetterAuth endpoints. 29  
* **Posts:**  
* GET /api/posts (Search/Filter/Pagination). 29, 30  
* POST /api/posts (Create post with embedded books). 29  
* PATCH /api/posts/:id (Update status or content). 29  
* **Requests:**  
* POST /api/requests (Buyer sends request). 29  
* PATCH /api/requests/:id/accept (Seller accepts specific buyer). 29, 31  
* **Admin:**  
* GET /api/statistics (Aggregated dashboard data). 29  
* PATCH /api/admin/users/:id (Suspend/Activate). 32, 33

## 9\. User Roles & Permissions

* **Guest:** Can view Home, Browse, and Book Details. Redirected to login for any action. 34, 35  
* **Verified User:**  
* Create/Edit/Delete own posts. 36  
* Request others' books (once per post). 4, 37  
* Accept buyers for their own posts. 36  
* **Admin:**  
* Moderation: Hide/Delete any post. 38, 39  
* User Management: Suspend/Activate accounts. 32, 38  
* Knowledge Base: Approve pendingBooks or pendingPublishers. 38, 40

## 10\. Core Business Logic & Workflows

### Post Lifecycle

Available → Reserved (Buyer Accepted) → Sold/Donated. 4, 41

* If a reservation is cancelled, status reverts to Available. 4, 42

### Smart Title Generation

* System analyzes books in a post. If multiple "HSC Physics" and "HSC Chemistry" books exist, generate "HSC Science Books". 43-45  
* User can manually override this; manual edits disable auto-generation. 43, 46

### Contact Privacy

* **Strict Rule:** Phone numbers and social links are **hidden** from all users except the **Accepted Buyer**. 4, 47, 48

## 11\. Validation Rules

* **Price:** Must be $\\ge 0$ if postType is "Sell"; must be null if "Donate". 49, 50  
* **Images:** Exactly **one** image required per post for MVP. 27, 51  
* **Location:** District must be selected from a pre-defined list of 64 Bangladesh districts. 52  
* **Requests:** Users cannot request their own post. 4, 53

## 12\. Reusable Components

* **BookCard:** Unified card for Browse and Recent sections. 16, 54  
* **SkeletonLoader:** For book grids and details pages. 30, 54, 55  
* **StatusBadge:** Color-coded badges for Available, Reserved, Sold, Donated. 56  
* **SearchSidebar:** Multi-field filtering (District, Category, Condition, Price). 57

## 13\. Remaining Assignment Features (MVP Priority)

* **Email Verification Logic:** Ensure protected routes block unverified users. 14  
* **Dynamic Post Form:** Implementation of "Add More Book" logic using useFieldArray. 45, 58  
* **Knowledge Base Autocomplete:** Integration of academicBooks collection with the posting form. 59, 60  
* **Request Milestone Emails:** Trigger emails on the 1st, 3rd, 6th, and 10th request. 61, 62  
* **Admin Dashboard:** Basic user suspension and post removal tools. 63, 64

## 14\. Important Implementation Notes

* **Image Handling:** Upload images to Cloudinary **before** saving the post record to MongoDB. If DB save fails, delete the orphan image from Cloudinary. 12, 65, 66  
* **Search Performance:** Use MongoDB partial/case-insensitive indexes for book name and district. 67, 68  
* **Home Page Sections:** Must include exactly 7 sections (Hero, Featured, How It Works, Categories, etc.). 69, 70

## 15\. Things the AI Should NEVER Change

1. **Database Pattern:** Do not move books to a separate collection. Keep them **embedded** in posts. 21  
2. **Contact Privacy:** Never expose seller phone numbers via API to unauthenticated or non-accepted users. 4, 48, 71  
3. **Post Status:** Do not allow status to revert to Available once marked Sold or Donated. 72, 73

## 16\. Common Mistakes to Avoid

* **Placeholder Data:** Do not use "Lorem Ipsum"; use realistic academic book titles (e.g., "Nirod Baran Chemistry"). 17, 74  
* **Duplicate Requests:** Forgetting to check if a user has already requested a post before creating a new bookRequest. 75, 76  
* **Sync Issues:** Failing to update the post.status to "Reserved" when a bookRequest is accepted. 13, 77

