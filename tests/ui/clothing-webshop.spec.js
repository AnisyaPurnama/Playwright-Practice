import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSelectors } from '../../helpers/selectors';
import { registerUser } from '../../helpers/register-user';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  const consentCookies = page.locator('button.fc-button.fc-cta-consent.fc-primary-button');
  const cookiesBanner = page.locator('div.fc-dialog.fc-choice-dialog');

  if (await cookiesBanner.isVisible()) {
    await consentCookies.click();
  }
  await expect(cookiesBanner).toHaveCount(0);
});

test.describe('Clothing webshop test automation', () => {
  //FEATURE ===================== SIGN UP

  test('should register new user successfully', async ({ page }) => {
    const { username, email } = await registerUser(page);

    //----VALIDATION----
    const { createdAccountText } = getSelectors(page);
    await expect(createdAccountText).toBeVisible();

    console.log(`✅ User created: ${username} (${email})`);
  });

  test('should show error when registering with existed email', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuSignupLogin, nameInputSignUp, emailInputSignUp, signUpButtons } =
      getSelectors(page);
    const errorMessage = page.locator('text=Email Address already exist!');

    //-----ACTION-----
    await menuSignupLogin.click();
    await nameInputSignUp.fill('Johny Depp');
    await emailInputSignUp.fill('john@playwright.com');
    await signUpButtons.click();

    //----VALIDATION----
    await expect(errorMessage).toBeVisible();
  });

  //FEATURE ===================== SIGN IN

  test('should successfully login with valid data', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuSignupLogin } = getSelectors(page);
    const emailLoginInput = page.getByTestId('login-email');
    const passwordLoginInput = page.getByTestId('login-password');
    const loginBtn = page.getByTestId('login-button');
    const loggedInText = page.locator('text=Logged in as');

    //-----ACTION-----
    await menuSignupLogin.click();
    await emailLoginInput.fill('john@playwright.com');
    await passwordLoginInput.fill('password123');
    await loginBtn.click();

    //----VALIDATION----
    await expect(loggedInText).toBeVisible();
  });

  test('should show error when login with incorrest email and password', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuSignupLogin } = getSelectors(page);
    const emailLoginInput = page.getByTestId('login-email');
    const passwordLoginInput = page.getByTestId('login-password');
    const loginBtn = page.getByTestId('login-button');
    const errorLoginText = page.locator('text=Your email or password is incorrect!');

    //-----ACTION-----
    await menuSignupLogin.click();
    await emailLoginInput.fill('john@playwright');
    await passwordLoginInput.fill('password1234');
    await loginBtn.click();

    //----VALIDATION----
    await expect(errorLoginText).toBeVisible();
  });

  //FEATURE ===================== SIGN OUT

  test('should successfully logout', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuSignupLogin } = getSelectors(page);
    const emailLoginInput = page.getByTestId('login-email');
    const passwordLoginInput = page.getByTestId('login-password');
    const loginBtn = page.getByTestId('login-button');
    const menuLogout = page.locator('[href="/logout"]');

    //-----ACTION-----
    await menuSignupLogin.click();
    await emailLoginInput.fill('john@playwright.com');
    await passwordLoginInput.fill('password123');
    await loginBtn.click();
    await menuLogout.click();

    //----VALIDATION----
    await expect(emailLoginInput).toBeVisible();
  });

  //FEATURE ===================== CONTACT US

  test('should successfully submit contact us form', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const menuContactUs = page.locator('[href="/contact_us"]');
    const nameField = page.getByTestId('name');
    const emailField = page.getByTestId('email');
    const subjectField = page.getByTestId('subject');
    const messageField = page.getByTestId('message');
    const uploadFileBtn = page.locator('input[name="upload_file"]');
    const submitBtn = page.getByTestId('submit-button');

    //-----ACTION-----
    await menuContactUs.click();
    await nameField.fill('Dirk Gently');
    await emailField.fill('gently@holistic.com');
    await subjectField.fill('Refund');
    await messageField.fill('Dear, still looking forward for the refund for purchased number 888');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.resolve(__dirname, 'files/InvoiceSimple.pdf');
    await uploadFileBtn.setInputFiles(filePath);

    //Browser dialog prompt
    page.on('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept(); // or dialog.dismiss()
    });
    await submitBtn.click();

    //----VALIDATION----
    await expect(page.locator('.status.alert.alert-success')).toContainText(
      'submitted successfully'
    );
  });

  //FEATURE ===================== PRODUCTS PAGE

  test('product details should be visible', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuProducts } = getSelectors(page);
    const firstViewProductBtn = page.locator('[href="/product_details/1"]');
    const productDetailsElements = [
      { name: 'productName', locator: page.locator('.google-anno-t') },
      { name: 'category', locator: page.locator('p', { hasText: 'Category' }) },
      { name: 'Price', locator: page.locator('span span').first() },
      { name: 'Availability', locator: page.locator('p', { hasText: 'Availability:' }) },
      { name: 'Condition', locator: page.locator('p', { hasText: 'Condition:' }) },
      { name: 'Brand', locator: page.locator('p', { hasText: 'Brand:' }) },
    ];

    //-----ACTION-----
    await menuProducts.click();
    await firstViewProductBtn.click();

    //----VALIDATION----
    for (const { name, locator } of productDetailsElements) {
      await expect(locator, `${name} should be visible`).toBeVisible();
    }
  });

  test('should able to search product', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuProducts } = getSelectors(page);
    const searchInput = page.locator('#search_product');
    const searchBtn = page.locator('#submit_search');
    const productTiles = page.locator('div.product-image-wrapper');

    //-----ACTION-----
    await menuProducts.click();
    await searchInput.fill('unicorn patch gown');
    await searchBtn.click();

    //----VALIDATION----
    await expect(productTiles).toContainText('Unicorn Patch Gown');
  });

  //FEATURE ===================== SUBSCRIPTION

  test('should display confirmation after successful subscription registration', async ({
    page,
  }) => {
    //-----ELEMENT SELECTOR-----
    const { subscriptionContainer, subscriptionInput, subscribeBtn, subscribeConfirmation } =
      getSelectors(page);

    //-----ACTION-----
    await subscriptionContainer.scrollIntoViewIfNeeded();
    await subscriptionInput.fill('dummy@email.com');
    await subscribeBtn.click();

    //----VALIDATION----
    await expect(subscribeConfirmation).toBeVisible();
  });

  test('should display confirmation after successful subscription registration in cart page', async ({
    page,
  }) => {
    //-----ELEMENT SELECTOR-----
    const {
      menuCart,
      subscriptionContainer,
      subscriptionInput,
      subscribeBtn,
      subscribeConfirmation,
    } = getSelectors(page);

    //-----ACTION-----
    await menuCart.click();
    await subscriptionContainer.scrollIntoViewIfNeeded();
    await subscriptionInput.fill('cartpage@email.com');
    await subscribeBtn.click();

    //----VALIDATION----
    await expect(subscribeConfirmation).toBeVisible();
  });

  //FEATURE ===================== CART PAGE
  test('product should successfully be added in cart', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuProducts } = getSelectors(page);
    const firstViewProductBtn = page.locator('[href="/product_details/1"]');
    const secondViewProductBtn = page.locator('[href="/product_details/2"]');
    const firstAddToCartBtn = page.locator('a.add-to-cart[data-product-id="1"]').nth(0);
    const secondAddToCartBtn = page.locator('a.add-to-cart[data-product-id="2"]').nth(1);
    const continueShoppingBtn = page.locator('button.btn.btn-success.close-modal.btn-block');
    const viewCartBtn = page.locator('.modal-body a[href="/view_cart"]');

    //-----ACTION-----
    await menuProducts.click();
    await firstViewProductBtn.hover();
    await firstAddToCartBtn.click();
    await continueShoppingBtn.click();
    await secondViewProductBtn.hover();
    await secondAddToCartBtn.click();
    await viewCartBtn.click();

    //----VALIDATION----
    //Products are visible in the cart page
    const productCount = 2;
    for (let i = 1; i <= productCount; i++) {
      const productSelector = `#product-${i}`;
      await expect(page.locator(productSelector)).toBeVisible();
    }

    // Verify their prices, quantity and total price dynamically
    const rows = page.locator('table.cart tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);

      const priceText = await row.locator('.cart_price p').innerText();
      const quantityText = await row.locator('.cart_quantity button').innerText();
      const totalText = await row.locator('.cart_total_price').innerText();

      const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
      const quantity = parseInt(quantityText, 10);
      const total = parseInt(totalText.replace(/[^0-9]/g, ''), 10);

      console.log(`Row ${i + 1} → price: ${price}, qty: ${quantity}, total: ${total}`);

      expect(total).toBe(price * quantity);
    }
  });

  test('product quantity should correctly displayed in cart', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuProducts } = getSelectors(page);
    const firstViewProductBtn = page.locator('[href="/product_details/1"]');
    const prdDetailsQuantityInput = page.locator('#quantity');
    const prdDetailsAddToCartBtn = page.locator('button.btn.btn-default.cart');
    const viewCartBtn = page.locator('.modal-body a[href="/view_cart"]');
    const quantityCartValue = page.locator('.cart_quantity button');

    //-----ACTION-----
    await menuProducts.click();
    await firstViewProductBtn.click();
    await prdDetailsQuantityInput.fill('4');
    await prdDetailsAddToCartBtn.click();
    await viewCartBtn.click();

    //----VALIDATION----
    await expect(quantityCartValue).toHaveText('4');
  });

  //FEATURE ===================== PLACE ORDER
  test('place order: register while checkout', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuProducts, menuSignupLogin } = getSelectors(page);
    const firstViewProductBtn = page.locator('[href="/product_details/1"]');
    const firstAddToCartBtn = page.locator('a.add-to-cart[data-product-id="1"]').nth(0);
    const viewCartBtn = page.locator('.modal-body a[href="/view_cart"]');
    const proceedToCheckoutBtn = page.locator('btn btn-default check_out');
    //const accCreatedContinueBtn = page.locator('a.btn.btn-primary');
    const accCreatedContinueBtn = page.getByTestId('continue-button');

    //-----ACTION-----
    await menuProducts.click();
    await firstViewProductBtn.click();
    await firstAddToCartBtn.click();
    await viewCartBtn.click();
    await proceedToCheckoutBtn.click();
    await menuSignupLogin.click();
    const { username, email } = await registerUser(page);

    console.log(`✅ User created: ${username} (${email})`);
    await accCreatedContinueBtn.click();

    //TODO: verify logged in as user xx

    //----VALIDATION----
  });
});
