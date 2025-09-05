import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  const consentCookies = page.locator('button.fc-button.fc-cta-consent.fc-primary-button');
  const cookiesBanner = page.locator('div.fc-dialog.fc-choice-dialog');

  if (await cookiesBanner.isVisible()) {
    await consentCookies.click();
  }
  await expect(cookiesBanner).toHaveCount(0);
});

function getSelectors(page) {
  return {
    menuSignupLogin: page.locator('[href="/login"]'),
    menuProducts: page.locator('[href="/products"]'),
    nameInputSignUp: page.getByTestId('signup-name'),
    emailInputSignUp: page.getByTestId('signup-email'),
    signUpButtons: page.getByTestId('signup-button'),
  };
}

test.describe('Clothing webshop test automation', () => {
  test('should register new user successfully', async ({ page }) => {
    //-----ELEMENT SELECTOR-----
    const { menuSignupLogin, nameInputSignUp, emailInputSignUp, signUpButtons } =
      getSelectors(page);
    const maleRadioBtn = page.locator('#id_gender1');
    //const femaleRadioBtn = page.locator('#id_gender2');
    const passwordInputSignUp = page.getByTestId('password');
    const daysDropdown = page.locator('#days');
    const monthsDropdown = page.locator('#months');
    const yearsDropdown = page.locator('#years');
    const firstNameInput = page.getByTestId('first_name');
    const lastNameInput = page.getByTestId('last_name');
    const companyInput = page.getByTestId('company');
    const addressInput = page.getByTestId('address');
    const countryDropdown = page.locator('#country');
    const stateInput = page.getByTestId('state');
    const cityInput = page.getByTestId('city');
    const zipcodeInput = page.getByTestId('zipcode');
    const mobileNumberInput = page.getByTestId('mobile_number');
    const createAccountBtn = page.getByTestId('create-account');
    const createdAccountText = page.getByTestId('account-created');

    //-----ACTION-----
    const randomString = Math.random().toString(36).substring(2, 10);
    const randomUsername = `user_${randomString}`;
    const randomEmail = `user_${Math.random().toString(36).substring(2, 10)}@playwright.com`;

    await menuSignupLogin.click();
    await nameInputSignUp.fill(randomUsername);
    await emailInputSignUp.fill(randomEmail);
    await signUpButtons.click();
    await maleRadioBtn.click();
    await passwordInputSignUp.fill('password123');
    await daysDropdown.selectOption('8');
    await monthsDropdown.selectOption('3');
    await yearsDropdown.selectOption('1995');
    await firstNameInput.fill('Johny');
    await lastNameInput.fill('Depp Singh');
    await companyInput.fill('Tahi kotok BV');
    await addressInput.fill('Green forest street 188');
    await countryDropdown.selectOption('Canada');
    await stateInput.fill('Baileys');
    await cityInput.fill('Calgary');
    await zipcodeInput.fill('T0L 0X0');
    await mobileNumberInput.fill('+1 587 2345 2345');
    await createAccountBtn.click();

    //----VALIDATION----
    await expect(createdAccountText).toBeVisible();
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
});
