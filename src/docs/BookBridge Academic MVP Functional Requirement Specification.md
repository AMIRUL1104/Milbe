### Functional Requirement Specification (FRS): Milbe Academic MVP

### 1\. System Overview

**Milbe** is a full-stack academic book matching platform for students in Bangladesh. It enables users to sell or donate used books. The system facilitates discovery and connection but explicitly **excludes** internal payments, delivery, or courier services 1, 2\.

### 2\. Functional Modules

1. **Authentication & Profile:** User registration, email verification, and session management 3\.  
2. **Book Posting:** Dynamic form for posting one or more books with a single image 4\.  
3. **Discovery (Search & Filter):** Multi-criteria search and filtered browsing 5\.  
4. **Request & Matching:** Interaction flow between buyers and sellers 6\.  
5. **Dashboards:** Role-specific management interfaces for Users and Admins 7, 8\.  
6. **Knowledge Base:** Master database for books/publishers to power autocomplete 9, 10\.

### 3\. User Authentication

* **Purpose:** Secure system access and ensure only verified users can post or request books 3\.  
* **Inputs:** Full Name, Email, Password, Confirm Password 11\.  
* **Process:**  
* User registers; system hashes password via BetterAuth and generates a secure verification token 12, 13\.  
* Verification email is sent; user must click the link to activate the account 12, 14\.  
* **Outputs:** Secure session (cookie-based), user profile record, and "Verified" status 15, 16\.  
* **Validation:**  
* Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number 11\.  
* Email: Unique, valid academic/standard format 11, 12\.  
* **Edge Cases:**  
* Login attempt before email verification redirects to the verification notice page 17\.  
* Expired verification tokens allow a "Resend Link" request 14\.

### 4\. Authorization Rules

* **Guest:** Browse/Search books, view details, view Login/Register 18, 19\.  
* **Verified User:** Create posts, edit/delete own posts, send requests, accept requests for own posts, manage own dashboard 19, 20\.  
* **Unverified User:** Access browse/details but restricted from posting or requesting 3, 21\.  
* **Admin:** Full access to manage users (suspend/activate), moderate all posts (hide/delete), and approve knowledge base entries 19\.

### 5\. User Functionalities

#### Feature: Multi-Book Posting

* **Purpose:** Allow sellers to list multiple books under a single post header 4, 22\.  
* **Inputs:** Post Type (Sell/Donate), 1 Image, District (Dropdown), Area (Text), Book Details (Name, Publisher, Condition, Price for sell) 23-25.  
* **Process:**  
* Dynamic "Add More Book" cards are populated 26\.  
* System auto-generates a title based on book metadata (e.g., "HSC Science Books") unless overridden 27-29.  
* Image is uploaded to Cloudinary; metadata is saved to MongoDB 30\.  
* **Outputs:** Live post in the "Browse" section with "Available" status 31\.  
* **Validation:**  
* At least one book card required 24\.  
* Price must be $\\ge 0$ for "Sell" posts; null for "Donate" 32, 33\.  
* **Edge Cases:** Refreshing during upload results in data loss (no draft mode in MVP) 34, 35\.

#### Feature: Book Request System

1. **Purpose:** Enable buyers to express interest in a post 6\.  
2. **Inputs:** Optional message (max 300 chars) 36\.  
3. **Process:**  
4. Buyer submits request.  
5. Seller notified via dashboard (and milestone emails) 37, 38\.  
6. Seller clicks "Accept Buyer"; system marks post as "Reserved" 39\.  
7. **Outputs:** Seller's contact info (Phone/Messenger) becomes visible **only** to the accepted buyer 40, 41\.  
8. **Validation:** Users cannot request their own posts; one request per user per post 42, 43\.  
9. **Edge Cases:** If a seller cancels a reservation, the post returns to "Available" status 40, 44\.

### 6\. Admin Functionalities

#### Feature: Post Moderation

* **Purpose:** Remove or hide invalid/spam content 45, 46\.  
* **Inputs:** Selection of post, action (Hide/Delete) 47\.  
* **Process:** Admin hides a post; it is removed from public browse but remains in the seller's dashboard marked as "Hidden by Admin" 48\.  
* **Outputs:** Updated post status in DB 48\.  
* **Validation:** Admin credentials required.  
* **Edge Cases:** Hiding a "Reserved" post cancels current requests 49\.

### 7\. Database Operations

* **Post Embedding:** Book details must be stored as an **embedded array** inside the posts document for atomic retrieval 50-52.  
* **Status Lifecycle:** Strict transition: Available $\\rightarrow$ Reserved $\\rightarrow$ Sold/Donated 31, 40\.  
* **Transactions:** Accepting a request must be an atomic operation updating both the request status and the post status 53, 54\.

### 8\. API Endpoints Required

* **Auth:** /api/auth/\* (BetterAuth built-in) 50, 55\.  
* **Posts:** POST /api/posts (Create), GET /api/posts (Browse/Search), PATCH /api/posts/:id (Update/Status) 50, 55, 56\.  
* **Requests:** POST /api/requests (Send), PATCH /api/requests/:id/accept (Accept) 55\.  
* **Knowledge Base:** GET /api/academic-books (Autocomplete) 10, 55\.  
* **Upload:** POST /api/upload/image (Cloudinary/ImgBB) 50, 55, 57\.

### 9\. Form Validation Rules

* **District:** Must select from the provided 64-district searchable dropdown 25, 58\.  
* **Phone Number:** Valid Bangladesh mobile format 59\.  
* **Book Condition:** Must be "Like New", "Good", or "Fair" 60\.  
* **Images:** Strictly 1 image per post (JPG/PNG/WEBP) 32, 61\.

### 10\. Error Handling

* **UI Notifications:** Use Toasts for success/failure (e.g., "Post published successfully", "Network Error") 35, 62\.  
* **Loading States:** Skeleton loaders for book grids and disabled buttons (with "Publishing..." text) during API calls 62-64.  
* **Fallback:** Show default placeholder images if a book image fails to load 65, 66\.

### 11\. Business Logic

* **Contact Privacy:** Seller contact information (Phone/Social) is hidden from Guests and non-accepted Buyers 40, 41\.  
* **No Internal Payments:** The UI must never ask for or display credit card/banking info 1, 67\.  
* **Email Milestones:** Sellers receive notifications at the 1st, 3rd, 6th, and 10th requests to prevent spamming 68, 69\.

### 12\. UI Behaviors

* **Responsive Layout:** Desktop (4 columns), Tablet (2 columns), Mobile (1 column) 70\.  
* **Home Page:** Must contain exactly 7 sections (Hero, Featured, How It Works, etc.) 71, 72\.  
* **Search:** Instant filtering by book name or district 73, 74\.

### 13\. Success Criteria

* Successful end-to-end flow: Post Creation $\\rightarrow$ Buyer Request $\\rightarrow$ Seller Accept $\\rightarrow$ Mark as Sold 75\.  
* Email verification successfully blocks unauthorized posting 75, 76\.  
* Responsive UI with no placeholder/lorem-ipsum content 77\.

### 14\. Assignment Deliverables

* **Live URL:** Hosted on Vercel 78, 79\.  
* **Repositories:** Separate or monorepo links for Frontend and Backend 79\.  
* **Demo Credentials:** Separate User and Admin login accounts for the evaluator 79\.

