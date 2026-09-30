# PRD — Modern Furniture E-Commerce

## 1. Project Overview

### Project Name

**[Efendy Furniture]**

### Project Type

Modern Furniture E-Commerce Website

### Build Challenge

**Build Challenge #02 — E-Commerce Website**

### Design References

* Article
* West Elm

### Core Concept

Website e-commerce furniture modern yang menggabungkan:

* Modern furniture
* Interior inspiration
* Room-based shopping
* Collection
* E-commerce experience

Website harus terasa seperti **brand furniture sungguhan**, bukan sekadar katalog produk.

Customer dapat mengikuti seluruh proses:

```text
DISCOVER
   ↓
PRODUCT
   ↓
CART
   ↓
CHECKOUT
   ↓
SHIPPING
   ↓
PAYMENT
   ↓
ORDER CONFIRMATION
   ↓
DELIVERY TRACKING
```

---

# 2. Product Vision

> **Modern furniture designed for the way you live.**

Website membantu customer:

1. Menemukan furniture.
2. Memahami detail produk.
3. Memilih variant dan quantity.
4. Memasukkan produk ke cart.
5. Mengisi informasi checkout.
6. Memilih pengiriman.
7. Memilih metode pembayaran.
8. Melakukan simulasi pembayaran.
9. Mendapatkan konfirmasi pesanan.
10. Melihat status pengiriman.

---

# 3. Target User

## Primary User

### Young Professional

Usia 20–35 tahun.

Karakter:

* Tinggal di apartment atau rumah.
* Suka desain interior modern.
* Terbiasa belanja online.
* Mencari furniture aesthetic dan fungsional.
* Membutuhkan informasi ukuran dan material sebelum membeli.

### Young Family

Usia 25–40 tahun.

Kebutuhan:

* Sofa.
* Dining table.
* Bed.
* Cabinet.
* Storage.
* Furniture untuk ruang keluarga.

---

# 4. Design Direction

## Visual Style

**Article + West Elm inspired**

Karakter:

* Modern
* Minimal
* Warm
* Premium
* Editorial
* Clean
* Image-focused

Website tidak menggunakan tampilan marketplace yang terlalu padat.

### Design Principle

```text
Product Photography
        ↓
Clean Typography
        ↓
Large Whitespace
        ↓
Simple Interaction
        ↓
Clear Purchase Flow
```

---

# 5. Color System

### Primary Background

```text
#F7F5F0
```

Warm White.

### Main Text

```text
#20201E
```

### Secondary Text

```text
#817A71
```

### Accent

```text
#A88968
```

Natural Brown.

### Border

```text
#E5E1DB
```

### White

```text
#FFFFFF
```

---

# 6. Typography

## Heading

* Cormorant Garamond
* DM Serif Display

## Body

* Inter
* Manrope

Heading digunakan untuk memberikan nuansa editorial.

Body menggunakan sans-serif agar tetap mudah dibaca.

---

# 7. Sitemap

```text
/
│
├── /shop
│   ├── /sofas
│   ├── /chairs
│   ├── /tables
│   ├── /beds
│   ├── /storage
│   └── /lighting
│
├── /collections
│
├── /rooms
│   ├── /living-room
│   ├── /bedroom
│   ├── /dining-room
│   └── /workspace
│
├── /inspiration
│
├── /product/[slug]
│
├── /wishlist
│
├── /cart
│
├── /checkout
│
├── /payment
│
├── /order/[orderId]
│
├── /tracking/[orderId]
│
└── /search
```

---

# 8. Main Navigation

Desktop:

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

Navbar:

* Sticky.
* Responsive.
* Desktop mega menu.
* Mobile hamburger.
* Cart quantity indicator.

---

# 9. Homepage

## Section 1 — Hero

Full-width interior photography.

```text
NEW COLLECTION

Designed for everyday living.

Thoughtful furniture for
spaces that feel like home.

[ SHOP COLLECTION ]
```

CTA menuju collection.

---

## Section 2 — Shop By Room

```text
SHOP BY ROOM

Living Room
Bedroom
Dining Room
Workspace
```

User dapat memilih ruangan untuk menemukan furniture yang relevan.

---

## Section 3 — New Arrivals

Product grid:

```text
NEW ARRIVALS

[ Product ] [ Product ] [ Product ] [ Product ]
```

Product card berisi:

* Image
* Product name
* Category
* Price
* Wishlist
* Quick view

---

## Section 4 — Collection

Contoh:

```text
THE NARA COLLECTION

Warm wood.
Soft curves.
Designed for slow living.

[ EXPLORE COLLECTION ]
```

---

## Section 5 — Shop The Room

Customer dapat melihat furniture melalui foto sebuah ruangan.

```text
SHOP THIS ROOM

[ LARGE ROOM IMAGE ]

● Sofa
● Coffee Table
● Lamp
```

Hotspot dapat diklik untuk membuka produk.

---

## Section 6 — Inspiration

```text
INSPIRATION

How to Create a Calm Living Room

5 Ways to Style a Small Apartment

Choosing the Right Sofa Size
```

---

## Section 7 — CTA

```text
FIND SOMETHING
FOR YOUR SPACE

Explore our furniture collection.

[ SHOP ALL ]
```

---

# 10. Product Catalog

URL:

```text
/shop
```

Layout:

```text
SHOP ALL FURNITURE

Search products...

Filter                         Sort By

────────────────────────────────

[ Product ] [ Product ] [ Product ] [ Product ]

[ Product ] [ Product ] [ Product ] [ Product ]
```

## Search

Search berdasarkan:

* Product name
* Category
* Collection

Contoh:

```text
Search: sofa

24 products found
```

Search harus benar-benar berfungsi.

---

# 11. Product Filter

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

Filter harus mengubah product list secara nyata.

---

# 12. Product Card

```text
┌──────────────────────┐
│                      │
│       PRODUCT        │
│        IMAGE         │
│                   ♡  │
└──────────────────────┘

Sora Sofa
Sofa

Rp 8.900.000
```

Interaction:

* Click → Product Detail.
* Wishlist.
* Hover image.
* Quick View.

---

# 13. Product Detail

URL:

```text
/product/sora-sofa
```

## Product Information

Wajib:

* Product name
* Product image
* Price
* Description
* Stock
* Variant
* Quantity
* Add to Cart

Contoh:

```text
SORA SOFA

Rp 8.900.000

★★★★★ 4.9

Soft linen sofa designed
for everyday living.

Color

○ Beige
○ Brown
○ Gray

Stock:
12 available

Quantity

[-] 1 [+]

[ ADD TO CART ]
```

---

# 14. Product Variant

Furniture dapat memiliki:

### Color

```text
Beige
Brown
Gray
Black
```

### Size

```text
180 cm
220 cm
260 cm
```

Variant yang dipilih harus tersimpan di cart.

---

# 15. Product Gallery

Product memiliki beberapa foto:

```text
[ Main Image ]

[ 1 ] [ 2 ] [ 3 ] [ 4 ] [ Room ]
```

Fitur:

* Thumbnail.
* Image switching.
* Zoom.
* Fullscreen.
* Lifestyle image.

---

# 16. Stock / Availability

Product detail harus menunjukkan availability.

Contoh:

```text
In Stock
12 available
```

Jika stock habis:

```text
Out of Stock

[ NOTIFY ME ]
```

Untuk frontend prototype, stock dapat menggunakan mock data.

---

# 17. Add to Cart

Ketika user memilih:

```text
Variant
+
Quantity
+
Add to Cart
```

Product masuk ke cart.

Tampilkan feedback:

```text
✓ Sora Sofa added to cart
```

Cart counter juga bertambah.

---

# 18. Shopping Cart

URL:

```text
/cart
```

Layout:

```text
YOUR CART

──────────────────────────────────

Sora Sofa

[ IMAGE ]

Color: Beige
Size: 220 cm

[-] 1 [+]

Rp 8.900.000

Remove
♡ Wishlist

──────────────────────────────────

Luna Table

...

──────────────────────────────────

Subtotal
Rp 12.100.000

[ CONTINUE SHOPPING ]

[ CHECKOUT ]
```

---

# 19. Cart Requirements

Customer dapat:

* Add product.
* Increase quantity.
* Decrease quantity.
* Remove product.
* Change variant.
* View subtotal.
* View total.
* Continue shopping.
* Checkout.

Cart harus tetap konsisten selama user menggunakan website.

### Frontend Persistence

Gunakan:

```text
localStorage
```

sehingga refresh halaman tidak menghapus cart.

---

# 20. Checkout

URL:

```text
/checkout
```

Checkout dibagi menjadi beberapa section.

```text
CHECKOUT

1. Contact
2. Shipping
3. Payment
4. Order Summary
```

---

# 21. Customer Information

Form wajib:

### Full Name

```text
Your name
```

### Phone Number

```text
08xxxxxxxxxx
```

### Address

```text
Street address
```

### City / Region

```text
Jakarta
```

### Order Note

```text
Optional note
```

Validasi:

* Required field.
* Nomor HP valid.
* Tidak boleh kosong.
* Error message jelas.

---

# 22. Shipping

Customer memilih metode pengiriman.

## Regular

```text
Regular Delivery

Estimated:
3–5 days

Rp 25.000
```

## Express

```text
Express Delivery

Estimated:
1–2 days

Rp 45.000
```

## Same Day

```text
Same Day

Estimated:
Today

Rp 65.000
```

Pemilihan shipping harus mengubah:

```text
Shipping Cost
+
Estimated Delivery
+
Total Payment
```

---

# 23. Order Summary

Checkout harus menampilkan:

```text
ORDER SUMMARY

Sora Sofa
Rp 8.900.000

Luna Table
Rp 3.200.000

────────────────

Subtotal
Rp 12.100.000

Shipping
Rp 45.000

────────────────

TOTAL
Rp 12.145.000
```

Customer dapat memeriksa semua informasi sebelum pembayaran.

---

# 24. Payment

URL:

```text
/payment
```

Metode pembayaran:

### Bank Transfer

```text
○ BCA
○ BNI
○ BRI
○ Mandiri
```

### Virtual Account

```text
○ BCA Virtual Account
○ BNI Virtual Account
○ Mandiri Virtual Account
```

### E-Wallet

```text
○ GoPay
○ OVO
○ DANA
```

### QRIS

```text
○ QRIS
```

### COD

Jika tersedia:

```text
○ Cash on Delivery
```

---

# 25. Payment Simulation

Tidak menggunakan payment gateway sungguhan.

Flow:

```text
Select Payment
       ↓
Payment Summary
       ↓
[ SIMULATE PAYMENT ]
       ↓
Payment Success
```

Contoh:

```text
PAYMENT

Total

Rp 12.145.000

QRIS

[ SIMULATE PAYMENT ]
```

Setelah tombol ditekan:

```text
✓ PAYMENT SUCCESSFUL
```

---

# 26. Order Confirmation

URL:

```text
/order/[orderId]
```

Halaman:

```text
✓ ORDER CONFIRMED

Thank you for your order.

Order ID
#ORD-20260930-001

──────────────────────

Payment
QRIS

Shipping
Express

Total
Rp 12.145.000

──────────────────────

Shipping Address

Kevin
Jakarta, Indonesia

[ TRACK ORDER ]
```

---

# 27. Order Status

Status pesanan:

```text
Pesanan Dibuat
      ↓
Pembayaran Berhasil
      ↓
Pesanan Diproses
      ↓
Diserahkan ke Kurir
      ↓
Dalam Pengiriman
      ↓
Pesanan Sampai
```

---

# 28. Delivery Tracking

URL:

```text
/tracking/[orderId]
```

UI:

```text
TRACK YOUR ORDER

Order #ORD-20260930-001

● Pesanan Dibuat
│
● Pembayaran Berhasil
│
● Pesanan Diproses
│
● Diserahkan ke Kurir
│
○ Dalam Pengiriman
│
○ Pesanan Sampai
```

Tambahkan:

```text
Courier
Express Delivery

Estimated Arrival
2 October 2026
```

Status tracking merupakan simulasi frontend.

---

# 29. Order Progress

Progress dapat dibuat menggunakan timeline.

Status aktif:

```text
Completed
Completed
Completed
Current
Upcoming
Upcoming
```

Customer dapat melihat posisi pesanan secara jelas.

---

# 30. Wishlist

Customer dapat menyimpan furniture:

```text
♡ Add to Wishlist
```

Wishlist page:

```text
MY WISHLIST

[ Product ] [ Product ] [ Product ] [ Product ]
```

Gunakan localStorage untuk prototype.

---

# 31. Quick View

Customer dapat melihat informasi singkat tanpa meninggalkan halaman catalog.

```text
SORA SOFA

Rp 8.900.000

Beige

[ ADD TO CART ]

View Full Details →
```

---

# 32. Cart Drawer

Ketika product ditambahkan:

```text
┌─────────────────────────┐
│ YOUR CART            ×  │
├─────────────────────────┤
│ Sora Sofa               │
│ Rp 8.900.000            │
│ [-] 1 [+]               │
├─────────────────────────┤
│ Luna Table              │
│ Rp 3.200.000            │
├─────────────────────────┤
│ Subtotal                │
│ Rp 12.100.000           │
│                         │
│ [ VIEW CART ]           │
│ [ CHECKOUT ]            │
└─────────────────────────┘
```

---

# 33. Mobile Experience

Mobile navigation:

```text
☰     LOGO      🛒
```

Product grid:

```text
[Product] [Product]

[Product] [Product]
```

Checkout harus menggunakan single-column layout.

Shipping dan payment menggunakan selectable cards.

---

# 34. Responsive Breakpoints

### Desktop

```text
≥ 1280px
```

### Tablet

```text
768px – 1279px
```

### Mobile

```text
< 768px
```

Semua halaman wajib responsive:

* Homepage
* Catalog
* Product
* Cart
* Checkout
* Payment
* Confirmation
* Tracking

---

# 35. Frontend State

Frontend harus mengelola:

```text
Cart
Wishlist
Search
Filter
Sort
Product Variant
Quantity
Shipping Method
Payment Method
Customer Information
Order
Order Status
```

Untuk challenge:

```text
React State
+
localStorage
```

sudah cukup.

---

# 36. Mock Data

Karena frontend-only, gunakan mock data.

Contoh:

```ts
type Product = {
  id: string
  name: string
  slug: string
  category: string
  price: number
  stock: number
  description: string
  images: string[]
  colors: string[]
  sizes?: string[]
  material: string
}
```

Order:

```ts
type Order = {
  id: string
  items: CartItem[]
  customer: Customer
  shipping: ShippingMethod
  payment: PaymentMethod
  subtotal: number
  shippingCost: number
  total: number
  status: OrderStatus
}
```

---

# 37. Order Status State

```ts
type OrderStatus =
  | "created"
  | "paid"
  | "processing"
  | "shipped"
  | "in_transit"
  | "delivered"
```

Frontend dapat menggunakan tombol simulasi:

```text
[ NEXT STATUS ]
```

atau otomatis mengubah status untuk demo.

---

# 38. Main Components

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
│   ├── ProductVariant
│   ├── ProductFilter
│   └── QuickView
│
├── room/
│   ├── RoomCard
│   └── RoomHotspot
│
├── cart/
│   ├── CartItem
│   ├── CartDrawer
│   └── CartSummary
│
├── checkout/
│   ├── CustomerForm
│   ├── ShippingSelector
│   ├── PaymentSelector
│   └── OrderSummary
│
├── order/
│   ├── OrderConfirmation
│   ├── OrderTimeline
│   └── OrderTracking
│
└── ui/
    ├── Button
    ├── Input
    ├── Modal
    ├── Select
    ├── Badge
    ├── Toast
    └── Accordion
```

---

# 39. Main User Flow

## Complete Challenge Flow

```text
                    HOMEPAGE
                       │
                       ↓
                 PRODUCT CATALOG
                       │
              ┌────────┴────────┐
              ↓                 ↓
           SEARCH             FILTER
              └────────┬────────┘
                       ↓
                PRODUCT DETAIL
                       │
                Select Variant
                       │
                   Quantity
                       │
                       ↓
                  ADD TO CART
                       │
                       ↓
                     CART
                       │
                       ↓
                   CHECKOUT
                       │
              Customer Information
                       │
                       ↓
                   SHIPPING
                       │
                       ↓
                    PAYMENT
                       │
                       ↓
              SIMULATE PAYMENT
                       │
                       ↓
                PAYMENT SUCCESS
                       │
                       ↓
              ORDER CONFIRMATION
                       │
                       ↓
               DELIVERY TRACKING
                       │
                       ↓
                 ORDER ARRIVED
```

---

# 40. Required Features Checklist

## Discover Product

* [x] Homepage
* [x] Product Catalog
* [x] Search
* [x] Category
* [x] Filter
* [x] Sort
* [x] Product Card

## Product Detail

* [x] Product Name
* [x] Product Image
* [x] Price
* [x] Description
* [x] Stock
* [x] Variant
* [x] Quantity
* [x] Add to Cart

## Cart

* [x] Add Product
* [x] Change Quantity
* [x] Remove Product
* [x] Subtotal
* [x] Total
* [x] Continue Shopping
* [x] Checkout

## Checkout

* [x] Name
* [x] Phone
* [x] Address
* [x] City / Region
* [x] Order Note
* [x] Product Summary
* [x] Shipping Cost
* [x] Total

## Delivery

* [x] Regular
* [x] Express
* [x] Same Day
* [x] Shipping Price
* [x] Estimated Delivery
* [x] Order Tracking

## Payment

* [x] Bank Transfer
* [x] Virtual Account
* [x] E-Wallet
* [x] QRIS
* [x] Payment Simulation
* [x] Payment Success

## Order

* [x] Order ID
* [x] Product
* [x] Total
* [x] Address
* [x] Payment Method
* [x] Shipping Method
* [x] Order Status
* [x] Delivery Tracking

---

# 41. Tech Stack

```text
Framework
Next.js

Language
TypeScript

Styling
Tailwind CSS

UI Components
shadcn/ui

Icons
Lucide React

Animation
Framer Motion

State
React State / Context

Persistence
localStorage
```

---

# 42. Performance

Requirements:

* Next.js Image
* Lazy loading
* Responsive image
* Optimized asset size
* Minimal client-side JavaScript
* Avoid unnecessary animation
* Fast page transition

---

# 43. Accessibility

Wajib:

* Semantic HTML
* Alt text
* Keyboard navigation
* Visible focus state
* Accessible form label
* Proper contrast
* Touch-friendly button
* Error message yang jelas

---

# 44. Definition of Done

Project dianggap selesai apabila customer dapat:

```text
1. Membuka homepage
        ↓
2. Menemukan produk
        ↓
3. Menggunakan search
        ↓
4. Menggunakan filter
        ↓
5. Membuka product detail
        ↓
6. Memilih variant
        ↓
7. Mengatur quantity
        ↓
8. Add to Cart
        ↓
9. Mengubah cart
        ↓
10. Checkout
        ↓
11. Mengisi informasi customer
        ↓
12. Memilih shipping
        ↓
13. Melihat ongkir
        ↓
14. Melihat total
        ↓
15. Memilih payment
        ↓
16. Simulasi pembayaran
        ↓
17. Mendapat Order ID
        ↓
18. Melihat order status
        ↓
19. Melihat delivery tracking
        ↓
20. Melihat status Pesanan Sampai
```

---

# 45. Final Product Concept

Website ini mengambil:

### From Article

* Minimal product presentation
* Modern furniture
* Collection-based shopping
* Clean visual

### From West Elm

* Room inspiration
* Lifestyle presentation
* Shop by room
* Editorial content

### Added for Build Challenge

* Search
* Functional filter
* Product detail
* Variant
* Cart
* Checkout
* Shipping simulation
* Payment simulation
* Order confirmation
* Delivery tracking

Sehingga konsep akhirnya:

> **A modern furniture e-commerce website that combines premium interior inspiration with a complete and usable online shopping journey.**

Core experience:

**Discover → Product → Cart → Checkout → Payment → Delivery**
