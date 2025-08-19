# Playwright Practice Project

This project is a hands-on practice repository for end-to-end testing using Playwright. It includes both **UI tests** and **API tests** to demonstrate automation capabilities across different layers of a web application.

---

## 🧪 Project Overview

### ✅ UI Testing
- **Target Website**: The Internet
- **Purpose**: Practice common UI automation scenarios such as login, form submission, alerts, dropdowns, file uploads, and more.
- **Goal**: Build robust UI tests that simulate real user interactions and validate expected behaviors.

### 🔗 API Testing
- **Target API**: DemoQA BookStore API
- **Purpose**: Practice API testing including user creation, token generation, book management (add, verify, delete), and authorization.
- **Goal**: Validate API endpoints and ensure data integrity through end-to-end API flows.

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnisyaPurnama/Playwright-Practice.git
   cd playwright-practice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## 🚀 Running Tests
**Run all tests (UI + API)**
   ```bash
   npx playwright test
   ```

**Run only API tests**
   ```bash
   npx playwright test --project=API
   ```

**Run only UI tests**
   ```bash
   npx playwright test --project=UI
   ```