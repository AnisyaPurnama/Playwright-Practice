// helpers/selectors.js
export function getSelectors(page) {
  return {
    // --- Menus ---
    menuSignupLogin: page.locator('[href="/login"]'),
    menuProducts: page.locator('[href="/products"]'),
    menuCart: page.getByRole('link', { name: 'Cart' }),
    menuDeleteAccount: page.locator('[href="/delete_account"]'),
    menuLogout: page.locator('[href="/logout"]'),
    menuContactUs: page.locator('[href="/contact_us"]'),

    // --- Signup form ---
    nameInputSignUp: page.getByTestId('signup-name'),
    emailInputSignUp: page.getByTestId('signup-email'),
    signUpButtons: page.getByTestId('signup-button'),

    // --- Login ---
    emailLoginInput: page.getByTestId('login-email'),
    passwordLoginInput: page.getByTestId('login-password'),
    loginBtn: page.getByTestId('login-button'),
    loggedInText: page.locator('text=Logged in as'),
    errorLoginText: page.locator('text=Your email or password is incorrect!'),

    // --- Subscription ---
    subscriptionContainer: page.locator('div.single-widget'),
    subscriptionInput: page.locator('#susbscribe_email'),
    subscribeBtn: page.locator('#subscribe'),
    subscribeConfirmation: page.locator('#success-subscribe'),

    // --- Account creation ---
    maleRadioBtn: page.locator('#id_gender1'),
    femaleRadioBtn: page.locator('#id_gender2'),
    passwordInputSignUp: page.getByTestId('password'),
    daysDropdown: page.locator('#days'),
    monthsDropdown: page.locator('#months'),
    yearsDropdown: page.locator('#years'),
    firstNameInput: page.getByTestId('first_name'),
    lastNameInput: page.getByTestId('last_name'),
    companyInput: page.getByTestId('company'),
    addressInput: page.getByTestId('address'),
    countryDropdown: page.locator('#country'),
    stateInput: page.getByTestId('state'),
    cityInput: page.getByTestId('city'),
    zipcodeInput: page.getByTestId('zipcode'),
    mobileNumberInput: page.getByTestId('mobile_number'),
    createAccountBtn: page.getByTestId('create-account'),
    createdAccountText: page.getByTestId('account-created'),

    // --- Contact us form ---
    nameField: page.getByTestId('name'),
    emailField: page.getByTestId('email'),
    subjectField: page.getByTestId('subject'),
    messageField: page.getByTestId('message'),
    uploadFileBtn: page.locator('input[name="upload_file"]'),
    submitBtn: page.getByTestId('submit-button'),

    // --- Search product---
    searchInput: page.locator('#search_product'),
    searchBtn: page.locator('#submit_search'),

    // --- Product page---
    firstViewProductBtn: page.locator('[href="/product_details/1"]'),
    productTiles: page.locator('div.product-image-wrapper'),
    secondViewProductBtn: page.locator('[href="/product_details/2"]'),
    firstAddToCartBtn: page.locator('a.add-to-cart[data-product-id="1"]').nth(0),
    secondAddToCartBtn: page.locator('a.add-to-cart[data-product-id="2"]').nth(1),
    continueShoppingBtn: page.locator('button.btn.btn-success.close-modal.btn-block'),
    viewCartBtn: page.locator('.modal-body a[href="/view_cart"]'),

    // --- Product details---
    prdDetailsQuantityInput: page.locator('#quantity'),
    prdDetailsAddToCartBtn: page.locator('button.btn.btn-default.cart'),
    quantityCartValue: page.locator('.cart_quantity button'),

    // --- Checkout---
    proceedToCheckoutBtn: page.locator('a.btn.btn-default.check_out'),
    registerLoginModalLink: page.getByRole('link', { name: 'Register / Login' }),
    continueBtn: page.getByTestId('continue-button'),
    checkoutInfo: page.getByTestId('checkout-info'),
    orderCommentInput: page.locator('textarea.form-control'),
    placeOrderBtn: page.locator('[href="/payment"]'),

    // --- Payment ---
    cardNameInput: page.getByTestId('name-on-card'),
    cardNumberInput: page.getByTestId('card-number'),
    cvcInput: page.getByTestId('cvc'),
    cardExpirationMonthInput: page.getByTestId('expiry-month'),
    cardExpirationYearInput: page.getByTestId('expiry-year'),
    payBtn: page.getByTestId('pay-button'),
    orderPlacedText: page.getByTestId('order-placed'),

    // --- Confirmation ---
    accDeletedText: page.getByTestId('account-deleted'),
  };
}

export function getProductDetailsElements(page) {
  return {
    productName: page.locator('.google-anno-t'),
    category: page.locator('p', { hasText: 'Category' }),
    price: page.locator('span span').first(),
    availability: page.locator('p', { hasText: 'Availability:' }),
    condition: page.locator('p', { hasText: 'Condition:' }),
    brand: page.locator('p', { hasText: 'Brand:' }),
  };
}
