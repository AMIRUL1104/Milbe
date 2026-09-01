### Product Requirements Document (PRD): Milbe Academic MVP

#### 1\. Project Overview

**Milbe** is a responsive web application designed as a matching platform for students in Bangladesh to sell or donate used academic books 1, 2\. The platform facilitates **book discoverability** and **buyer-seller connection** without handling payments, shipping, or courier services 1, 2\.

#### 2\. Assignment Goal

To build a production-ready **Full Stack MVP** using **TypeScript** that demonstrates proficiency in secure authentication, CRUD operations, search/filtering logic, and responsive UI/UX 3\.

#### 3\. Target Users

* **Primary:** SSC, HSC, Admission, and University students 4\.  
* **Secondary:** Guardians and coaching center students 4\.

#### 4\. User Roles

* **Guest:** Can browse books, search, and view details 5, 6\.  
* **User (Seller/Buyer):** Can create/edit/delete posts, request books, and manage incoming requests 7\.  
* **Admin:** Manages users, removes posts, and updates the academic knowledge base (Books/Publishers) 6\.

#### 5\. Core Features

* **Authentication:** Secure email-based registration and login via **BetterAuth** 8, 9\.  
* **Book Posting:** Single post supporting multiple books with one mandatory image upload 10-12.  
* **Smart Discovery:** Search by book name/district and filter by category, condition, or post type (Sell/Donate) 10, 13\.  
* **Request System:** A controlled flow where buyers request books and sellers choose whom to accept 14, 15\.  
* **Dashboards:** Dedicated interfaces for users to manage posts/requests and for admins to moderate the platform 14, 16, 17\.

#### 6\. Functional Requirements

* **Email Verification:** Users must verify their email to create posts or send requests 9, 11, 12\.  
* **Dynamic Posting:** Users can add multiple "Book Cards" within a single post 12, 18\.  
* **Auto-Generated Titles:** The system generates post titles based on the books added (e.g., "HSC Science Books"), which users can manually override 19-21.  
* **Request Lifecycle:** Status moves from **Available** → **Reserved** (once a buyer is accepted) → **Sold/Donated** 19, 22, 23\.  
* **Contact Visibility:** Seller contact info is hidden from everyone except the **Accepted Buyer** 19, 24, 25\.

#### 7\. User Flow

1. **Guest** browses the Home/Browse page 5\.  
2. **User** registers and verifies email 26, 27\.  
3. **Seller** creates a post (adds books, location, and one image) 12, 28\.  
4. **Buyer** searches for books and submits a request with an optional message 29, 30\.  
5. **Seller** views requests in the dashboard and clicks **"Accept Buyer"** 31, 32\.  
6. **Buyer** receives seller's contact info; they coordinate offline 24, 33\.  
7. **Seller** marks the post as **Sold** or **Donated** to complete the cycle 14, 33\.

#### 8\. Business Rules

* **No Internal Payments:** The platform does not process transactions 1, 34\.  
* **No Delivery Services:** Users handle book exchange themselves 1, 34\.  
* **Single Image Limit:** Only one image per post is allowed for the MVP 11, 35\.  
* **Duplicate Prevention:** A user can only request a specific post once 19, 36\.  
* **Post Ownership:** Users cannot request their own posts 19, 37\.

#### 9\. Validation Rules

* **Post Type:** Must be "Sell" or "Donate" 38\.  
* **Price:** Required and must be $\\ge$ 0 if type is "Sell"; null if "Donate" 39, 40\.  
* **Location:** District (searchable dropdown) and Area (text input) are mandatory 40, 41\.  
* **Books:** At least one book must be added per post 11, 18\.  
* **Image:** One valid image file (JPG/PNG/WEBP) is required 35, 40, 42\.

#### 10\. UI Pages Required

* **Public:** Home (7 sections), Browse Books (with Sidebar filters), Book Details 43-46.  
* **Auth:** Login, Register, Verify Email 47\.  
* **Protected:** Create/Edit Post, User Dashboard, Admin Dashboard 28, 48-50.

#### 11\. Dashboard Requirements

* **User Dashboard:** Statistics (Total/Active/Sold), My Posts (CRUD), and Incoming Requests list 51-53.  
* **Admin Dashboard:** Platform stats, User management (Suspend/Activate), Post moderation (Hide/Delete), and Knowledge Base management (Approve pending books/publishers) 54-57.

#### 12\. Authentication Requirements

* **Technology:** BetterAuth with session management 9, 48\.  
* **Security:** Password hashing (BetterAuth default) and protected routes for dashboards and posting 48, 58, 59\.

#### 13\. Database Collections (Summary)

* **users:** Profiles and Auth data 60\.  
* **posts:** Post metadata with an **embedded books array** 60, 61\.  
* **bookRequests:** Tracks buyer requests and their status 62\.  
* **academicBooks / publishers:** The master Knowledge Base for autocomplete 62\.  
* **pendingBooks / pendingPublishers:** User-submitted items awaiting admin review 62\.

#### 14\. APIs Required (Summary)

* **Auth:** BetterAuth built-in endpoints 63\.  
* **Posts:** POST /api/posts, GET /api/posts (Search/Filter), PATCH /api/posts/:id 63, 64\.  
* **Requests:** POST /api/requests, PATCH /api/requests/:id/accept 63, 64\.  
* **General:** GET /api/statistics, POST /api/upload/image 63, 64\.

#### 15\. Features Excluded from MVP

* Online payments, delivery tracking, and live chat 14, 33\.  
* Reviews, ratings, and AI-based recommendations 14\.  
* Multiple images per post and non-academic books 14\.  
* SMS notifications (Email only for MVP) 5, 65\.

#### 16\. Definition of Done

* TypeScript used for both Frontend and Backend 3, 66\.  
* Functional email verification and protected routes 67, 68\.  
* Complete Request-Accept-Sold/Donate lifecycle 69\.  
* Responsive UI using **HeroUI** and **Tailwind CSS** 8, 70, 71\.  
* Admin can moderate users and approve new books/publishers 6, 72\.

