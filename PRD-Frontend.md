# PRD — Modern Furniture Website

## 1. Overview

### Nama Project

**[Efendy Furniture]**

### Project Type

Modern Furniture E-Commerce — Frontend

### Referensi

* Article — https://www.article.com/
* West Elm — https://www.westelm.com/

### Konsep

Website furniture modern yang menggabungkan pengalaman **e-commerce** dengan **interior lifestyle experience**.

Website tidak hanya menampilkan produk furniture, tetapi membantu pengguna membayangkan bagaimana furniture tersebut terlihat ketika digunakan di dalam sebuah ruangan.

### Design Direction

> **Modern furniture for better living.**

Karakter visual:

* Modern
* Minimal
* Warm
* Premium
* Editorial
* Clean
* Image-focused

---

# 2. Goals

## Primary Goals

1. Menampilkan furniture dengan visual yang menarik.
2. Membantu user menemukan furniture berdasarkan kategori dan ruangan.
3. Memberikan pengalaman browsing yang sederhana.
4. Membuat produk terlihat premium tanpa UI yang berlebihan.
5. Membantu user membayangkan furniture di dalam ruangan.
6. Membuat proses dari browsing sampai cart terasa sederhana.

## Secondary Goals

* Membangun brand identity yang kuat.
* Menampilkan collection sebagai satu kesatuan interior.
* Menyediakan inspiration content.
* Menyiapkan fondasi untuk fitur Room Planner di masa depan.

---

# 3. Target User

## Primary User

### Young Professional

Usia:
**20–35 tahun**

Karakter:

* Tinggal di apartment / rumah
* Suka interior modern
* Aktif menggunakan e-commerce
* Peduli terhadap desain
* Mencari furniture yang aesthetic tetapi tetap fungsional

### Young Family

Usia:
**25–40 tahun**

Kebutuhan:

* Furniture ruang keluarga
* Bedroom furniture
* Dining furniture
* Storage
* Furniture yang cocok satu sama lain

---

# 4. Core User Problems

User biasanya mengalami beberapa masalah:

### Problem 1 — Sulit membayangkan furniture

User melihat sofa secara individual tetapi tidak tahu bagaimana tampilannya ketika berada di ruangannya.

### Problem 2 — Terlalu banyak pilihan

Marketplace furniture memiliki terlalu banyak produk sehingga user sulit menentukan pilihan.

### Problem 3 — Furniture tidak matching

User membeli sofa, meja, dan cabinet secara terpisah sehingga hasil akhirnya tidak selalu terlihat harmonis.

### Problem 4 — Website furniture terlalu seperti marketplace

Banyak website hanya fokus pada:

> Product → Price → Buy

Website ini akan lebih fokus pada:

> Inspiration → Room → Collection → Product → Purchase

---

# 5. Design Principles

## 5.1 Image First

Furniture adalah produk visual.

Prioritas:

**Image > Typography > Product Information > UI decoration**

---

## 5.2 Less UI, More Product

Hindari:

* Gradient berlebihan
* Shadow berat
* Banyak badge
* Warna mencolok
* Button terlalu besar
* Card terlalu ramai

---

## 5.3 Editorial Experience

Beberapa section website harus terasa seperti majalah interior.

Contoh:

> "How to Create a Calm Living Room"

bukan hanya:

> "10% OFF SOFA"

---

## 5.4 Warm Minimalism

Website harus terasa:

**premium tetapi tidak dingin.**

Gunakan:

* Warm white
* Natural colors
* Large photography
* Serif heading
* Sans-serif body text
* Large whitespace

---

# 6. Color System

## Primary

```text
Warm White
#F7F5F0
```

## Background

```text
White
#FFFFFF
```

## Text

```text
Charcoal
#20201E
```

## Secondary Text

```text
Warm Gray
#817A71
```

## Accent

```text
Natural Brown
#A88968
```

## Border

```text
#E5E1DB
```

---

# 7. Typography

## Heading

Recommended:

* Cormorant Garamond
* DM Serif Display

Usage:

* Hero heading
* Collection title
* Editorial section
* Large marketing text

## Body

Recommended:

* Inter
* Manrope

Usage:

* Navigation
* Product name
* Description
* Button
* Filter
* Form

---

# 8. Navigation

## Desktop Navbar

```text
LOGO

Shop
Collections
Rooms
Inspiration

                         Search
                         Wishlist
                         Account
                         Cart
```

Navbar behavior:

* Sticky
* Transparent di hero
* berubah menjadi solid ketika scroll
* Smooth transition
* Minimal shadow / border

---

# 9. Sitemap

```text
/
│
├── /shop
│   ├── /sofas
│   ├── /chairs
│   ├── /tables
│   ├── /beds
│   ├── /storage
│   ├── /lighting
│   └── /decor
│
├── /collections
│   ├── /new-arrivals
│   ├── /best-sellers
│   ├── /nara
│   └── /minimal
│
├── /rooms
│   ├── /living-room
│   ├── /bedroom
│   ├── /dining-room
│   └── /workspace
│
├── /inspiration
│   ├── /articles
│   └── /guides
│
├── /product/[slug]
│
├── /wishlist
│
├── /cart
│
└── /search
```

---

# 10. Homepage

## Section 1 — Hero

Full-width interior photography.

Content:

```text
NEW COLLECTION

Designed for everyday living.

Thoughtful furniture for
spaces that feel like home.

[ SHOP COLLECTION ]
```

Requirements:

* Full viewport / large hero
* High-quality interior image
* Text overlay
* CTA
* Responsive image
* Mobile-specific image support

---

# 11. Shop By Room

Section:

```text
SHOP BY ROOM

Living Room
Bedroom
Dining Room
Workspace
```

Layout desktop:

```text
┌──────────────┐ ┌──────────────┐
│              │ │              │
│ Living Room  │ │ Bedroom      │
│              │ │              │
└──────────────┘ └──────────────┘

┌──────────────┐ ┌──────────────┐
│ Dining       │ │ Workspace    │
│              │ │              │
└──────────────┘ └──────────────┘
```

Interaction:

* Hover image zoom
* Overlay title
* Click → room page

---

# 12. New Arrivals

Product grid:

```text
NEW ARRIVALS

[ Product ] [ Product ] [ Product ] [ Product ]
```

Product card:

```text
┌────────────────────┐
│                    │
│       IMAGE        │
│                    │
│              ♡     │
└────────────────────┘

Sora Sofa
Sofa
Rp 8.900.000
```

Hover:

* Image swap
* Wishlist icon
* Quick View

---

# 13. Collection Feature

Example:

```text
THE NARA COLLECTION

Warm wood.
Soft curves.
Designed for slow living.

[ LARGE ROOM IMAGE ]

[ EXPLORE COLLECTION ]
```

Collection page berisi:

* Hero
* Collection story
* Room photography
* Product grid
* Related products

---

# 14. Shop The Room

Interactive room photography.

```text
SHOP THIS ROOM

        ┌─────────────────────┐
        │                     │
        │      ROOM IMAGE     │
        │                     │
        │   ● Sofa            │
        │             ● Lamp  │
        │                     │
        └─────────────────────┘

Products in this room

Sora Sofa
Luna Table
Milo Lamp

[ SHOP THE ROOM ]
```

Interaction:

* Hotspot
* Hover hotspot
* Product preview
* Click → Product detail

---

# 15. Inspiration

Editorial section.

```text
INSPIRATION

How to Create a Calm Living Room

5 Ways to Style a Small Apartment

Choosing the Right Sofa Size
```

Card:

```text
IMAGE

CATEGORY

TITLE

Read Article →
```

---

# 16. Design Service CTA

```text
MAKE YOUR SPACE YOUR OWN

Not sure where to start?

Tell us about your space and
discover furniture that fits your style.

[ GET DESIGN HELP ]
```

Frontend MVP:

* Button
* Modal
* Style selection
* Room selection
* Basic recommendation UI

---

# 17. Shop Page

URL:

```text
/shop
```

Layout:

```text
SHOP

Filter                         Sort By

────────────────────────────────────

[Product] [Product] [Product] [Product]

[Product] [Product] [Product] [Product]
```

Filter:

### Category

* Sofa
* Chair
* Table
* Bed
* Storage
* Lighting
* Decor

### Price

* Under Rp1.000.000
* Rp1.000.000–Rp5.000.000
* Rp5.000.000–Rp10.000.000
* Above Rp10.000.000

### Color

* Beige
* Brown
* Black
* White
* Gray

### Style

* Modern
* Scandinavian
* Japandi
* Mid-Century
* Minimal

---

# 18. Product Detail

URL:

```text
/product/[slug]
```

Layout:

```text
┌──────────────────┐ ┌─────────────────────────┐
│                  │ │ SORA SOFA               │
│                  │ │                         │
│ PRODUCT IMAGE    │ │ Rp 8.900.000            │
│                  │ │                         │
│                  │ │ ★★★★★                  │
│                  │ │                         │
│                  │ │ Color                   │
│                  │ │ ○ Beige ○ Brown ○ Gray  │
│                  │ │                         │
│                  │ │ Quantity                │
│                  │ │ [-] 1 [+]               │
│                  │ │                         │
│                  │ │ [ ADD TO CART ]          │
└──────────────────┘ └─────────────────────────┘
```

Below:

### Description

### Materials

### Dimensions

### Care

### Delivery

### Reviews

### See It In A Room

### You May Also Like

---

# 19. Image Gallery

Product gallery harus mendukung:

* Main image
* Thumbnail
* Multiple angles
* Room photography
* Zoom
* Fullscreen

Contoh:

```text
[ Main Image ]

[ 1 ] [ 2 ] [ 3 ] [ 4 ] [ Room ]
```

---

# 20. Cart

URL:

```text
/cart
```

Layout:

```text
YOUR CART

──────────────────────────────

Sora Sofa
Qty: [-] 1 [+]
Rp 8.900.000

Luna Table
Qty: [-] 1 [+]
Rp 3.200.000

──────────────────────────────

Subtotal
Rp 12.100.000

[ CHECKOUT ]
```

Frontend state:

* Add product
* Remove product
* Increase quantity
* Decrease quantity
* Calculate subtotal
* Persist cart menggunakan localStorage

---

# 21. Wishlist

User dapat:

* Add wishlist
* Remove wishlist
* View wishlist

Product card menggunakan icon:

```text
♡
```

Ketika aktif:

```text
♥
```

Untuk frontend prototype, wishlist dapat disimpan menggunakan localStorage.

---

# 22. Search

Search overlay:

```text
SEARCH

[ Search furniture... ]

Popular searches

Sofa
Dining Table
Bed
Chair
Lighting
```

Search result:

```text
SEARCH RESULTS FOR "SOFA"

24 Products

[Product] [Product] [Product] [Product]
```

---

# 23. Quick View

Ketika user memilih Quick View:

```text
┌──────────────────────────────────────┐
│                              ×       │
│                                      │
│ IMAGE          SORA SOFA             │
│                Rp 8.900.000          │
│                                      │
│                Beige                 │
│                ○ ○ ○                 │
│                                      │
│                [ ADD TO CART ]       │
│                                      │
│                View Full Details →   │
└──────────────────────────────────────┘
```

---

# 24. Responsive Design

## Desktop

Breakpoint:

```text
≥ 1280px
```

Prioritas:

* Large photography
* 4-column product grid
* Mega menu
* Spacious layout

## Tablet

```text
768px – 1279px
```

* 2–3 column grid
* Simplified navbar
* Smaller hero

## Mobile

```text
< 768px
```

* Hamburger menu
* 2-column product grid
* Horizontal category scroll
* Full-width CTA
* Smaller typography
* Touch-friendly controls

---

# 25. Animation

Animation harus subtle.

Gunakan:

### Page

* Fade in
* Slight slide

### Product

* Image zoom on hover
* Smooth image transition

### Button

* Background transition
* Slight movement

### Navigation

* Smooth dropdown

### Cart

* Slide-in cart drawer

Hindari:

* Excessive bounce
* Parallax berlebihan
* Loading animation yang lama
* Animasi yang mengganggu browsing

---

# 26. Component Architecture

Frontend components:

```text
components/
│
├── layout/
│   ├── Navbar
│   ├── Footer
│   ├── MobileMenu
│   └── AnnouncementBar
│
├── product/
│   ├── ProductCard
│   ├── ProductGrid
│   ├── ProductGallery
│   ├── ProductInfo
│   ├── ProductFilter
│   └── QuickView
│
├── collection/
│   ├── CollectionCard
│   └── CollectionHero
│
├── room/
│   ├── RoomCard
│   ├── RoomHero
│   └── RoomHotspot
│
├── cart/
│   ├── CartItem
│   ├── CartDrawer
│   └── CartSummary
│
├── search/
│   └── SearchOverlay
│
└── ui/
    ├── Button
    ├── Modal
    ├── Badge
    ├── Input
    ├── Select
    └── Accordion
```

---

# 27. Recommended Tech Stack

## Framework

**Next.js**

## Language

**TypeScript**

## Styling

**Tailwind CSS**

## UI

**shadcn/ui**

Gunakan shadcn hanya untuk component yang memang membutuhkan interaction.

Jangan membuat seluruh website terlihat seperti dashboard SaaS.

---

## Icons

**Lucide React**

---

## Animation

**Framer Motion**

Gunakan seperlunya.

---

## State

Untuk MVP:

```text
React State
+
localStorage
```

State yang diperlukan:

* Cart
* Wishlist
* Search
* Filter
* Quick View

---

# 28. Frontend Data Structure

Karena frontend-only, gunakan mock data.

Contoh:

```ts
type Product = {
  id: string
  name: string
  slug: string
  category: string
  price: number
  image: string
  images: string[]
  colors: string[]
  material: string
  dimensions: string
  style: string
}
```

Collection:

```ts
type Collection = {
  id: string
  name: string
  description: string
  image: string
  products: string[]
}
```

Room:

```ts
type Room = {
  id: string
  name: string
  image: string
  products: string[]
}
```

---

# 29. Image Requirements

Furniture website sangat bergantung pada image quality.

Setiap product idealnya memiliki:

1. Product front
2. Product side
3. Detail material
4. Lifestyle image
5. Room image

Image harus:

* High resolution
* Consistent aspect ratio
* Natural lighting
* Minimal background
* Tidak terlalu banyak watermark

---

# 30. Performance

Target:

* Fast initial load
* Optimized images
* Lazy loading
* Responsive images
* Avoid unnecessary JavaScript
* Use Next.js Image
* Use server components jika memungkinkan

Target UX:

> User harus bisa melihat produk utama tanpa menunggu halaman terlalu lama.

---

# 31. Accessibility

Wajib:

* Semantic HTML
* Alt text untuk image
* Keyboard navigation
* Focus state
* Accessible button
* Proper contrast
* Form label
* Screen-reader friendly navigation

---

# 32. SEO Frontend

Setiap product page harus memiliki:

```text
Title
Meta Description
Canonical URL
Open Graph Image
```

Contoh:

```text
Sora Sofa — Modern Linen Sofa | [Brand]
```

URL:

```text
/product/sora-sofa
```

Bukan:

```text
/product?id=123
```

---

# 33. Homepage User Flow

```text
Landing
   ↓
Hero
   ↓
Shop by Room
   ↓
New Arrivals
   ↓
Collection
   ↓
Shop the Room
   ↓
Inspiration
   ↓
Product
   ↓
Add to Cart
   ↓
Cart
   ↓
Checkout
```

---

# 34. Product Discovery Flow

```text
Homepage
   ↓
Shop
   ↓
Filter
   ↓
Product Grid
   ↓
Quick View
   ↓
Product Detail
   ↓
Choose Variant
   ↓
Add Cart
```

---

# 35. MVP Scope

## Must Have

* Homepage
* Navbar
* Footer
* Shop page
* Category
* Product card
* Product detail
* Search
* Filter
* Cart
* Wishlist
* Responsive design
* Mock product data

## Should Have

* Collection
* Shop by Room
* Quick View
* Cart drawer
* Product image gallery
* Inspiration

## Later

* Room Planner
* AR Furniture
* AI Room Recommendation
* User Account
* Real Checkout
* Payment
* Order Tracking

---

# 36. Success Criteria

Frontend dianggap berhasil jika:

### Visual

* Website terlihat modern dan premium.
* Product photography menjadi fokus.
* Layout tidak terlihat seperti marketplace.
* Typography dan spacing konsisten.

### UX

* User dapat menemukan produk maksimal dalam beberapa langkah.
* Filter mudah digunakan.
* Product detail mudah dipahami.
* Cart dapat digunakan tanpa login.
* Website nyaman digunakan di mobile.

### Brand

Website harus memberikan kesan:

> **"Gue bukan cuma beli furniture. Gue sedang membangun style rumah gue."**

---

# 37. Final Design Direction

Referensi utama:

**Article**
→ Product simplicity
→ Collection system
→ Minimal UI
→ Modern furniture

**West Elm**
→ Lifestyle
→ Room inspiration
→ Editorial content
→ Design experience

### Final Formula

```text
ARTICLE
Product + Collection
        +
WEST ELM
Lifestyle + Room Inspiration
        ↓
YOUR BRAND
Modern Furniture
+
Interior Inspiration
+
Simple E-Commerce
```

Tujuan akhirnya bukan membuat website yang terlihat seperti **toko furniture online**, tetapi seperti **brand interior modern yang kebetulan memiliki e-commerce**.
