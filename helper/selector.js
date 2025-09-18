// helpers/selectors.js
export function getSelectors(page) {
  return {
    // --- Menus ---
    menuSignupLogin: page.locator('[href="/login"]'),
    menuProducts: page.locator('[href="/products"]'),
    menuCart: page.getByRole('link', { name: 'Cart' }),
    menuDeleteAccount: page.locator('[href="/delete_account"]'),

    // --- Signup form ---
    nameInputSignUp: page.getByTestId('signup-name'),
    emailInputSignUp: page.getByTestId('signup-email'),
    signUpButtons: page.getByTestId('signup-button'),

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
  };
}
