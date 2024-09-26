# Shophekart - Decentralized Marketplace for Buying and Selling Products through Crypto.

## Overview

Shophekart is a decentralized e-commerce platform where users can buy and sell products using cryptocurrency. Sellers from anywhere in the world can list items, and buyers can make purchases from any country. All transactions are secured through blockchain technology, ensuring the authenticity of products via NFTs, and funds are handled by a secure escrow system. The platform also integrates off-chain features like user profiles, shipping management, and product listings for optimized performance.

## Features

### 1. User Profiles & Preferences (Off-Chain)

**Purpose:** Manage user information such as usernames, shipping addresses, favorite categories, shopping history, and notification preferences.
**Backend:** Data stored in a centralized database (e.g., MongoDB) for fast access.
**Details:**

- Update shipping addresses
- Save favorite categories
- View shopping and transaction history

### 2. Product Listing (Seller-Side)

**Backend (Off-Chain):**

- Sellers connect their wallets, then upload product details (description, images, price, shipping info).
- Sellers set auction details like starting bid, reserve price, and duration (if applicable).
- Data is stored centrally for fast retrieval.
  **Smart Contract (On-Chain):**
- A unique NFT is minted for each listed product for authenticity.
- The NFT stores product metadata and links to the seller’s wallet address.

### 3. Product Visibility & Browsing (Buyer-Side)

**Backend (Off-Chain):**

- Buyers can browse product listings, which are filtered by categories and search criteria.
- Product details (e.g., images, price, availability) are served from the database.
- Fixed-price products and auction items are both available.
  **Interaction:**
- Buyers choose between direct purchases or bidding in auctions.

### 4. Buying Process (Direct Purchase)

**Backend (Off-Chain):**

- The backend sends transaction requests to the blockchain.
  **Smart Contract (On-Chain):**
- Escrow Smart Contract ensures the buyer’s funds and the NFT are locked until transaction completion.
- The product is marked as "sold" in the database once payment is processed.

### 5. Auction Process (Bidding)

**Backend (Off-Chain):**

- Bidding details (bid amount, user wallet) are stored temporarily in the database.
  **Smart Contract (On-Chain):**
- Smart contracts handle live updates (e.g., highest bid, remaining time, etc.).
- After the auction ends, funds are returned to participants who didn’t win, and the winning bid is processed via escrow.

### 6. Escrow & Shipping (Order Fulfillment)

**Backend (Off-Chain):**

- Sellers are notified and arrange shipment after a successful purchase.
- Shipment details (tracking numbers, carrier, delivery status) are stored and updated in real-time.
  **Smart Contract (On-Chain):**
- The buyer's payment remains in escrow until they confirm receipt of the product.
- Once confirmed, the funds are released to the seller, and the NFT is transferred to the buyer.

### 7. Post-Purchase (Rating & Review)

**Backend (Off-Chain):**

- After completing a transaction, both buyers and sellers can leave ratings and reviews, which are stored and displayed on their profiles.
  **Smart Contract (On-Chain):**
- Trust Score: A trust score is maintained on-chain. It is based on factors like staked tokens and on-chain assets, rewarding trusted users with a higher score.

### 8. Dispute Resolution

**Backend (Off-Chain):**

- In case of a dispute (e.g., non-delivery), Shophekart admins gather all order details and messages to resolve the issue.
  **Smart Contract (On-Chain):**
- The Escrow Smart Contract is called by the Shophekart team, who decide whether to release funds to the buyer or seller based on the evidence.

## Technology Stack

- Frontend: Next.js, TypeScript, Tailwind CSS

## Deployment

The project is deployed using Vercel. Visit the live deployment here:
[https://shophekart-frontend.vercel.app/](https://shophekart-frontend.vercel.app/)
