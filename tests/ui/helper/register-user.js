// helpers/register-user.js
import { getSelectors } from './selectors';

export async function registerUser(page) {
  const {
    menuSignupLogin,
    nameInputSignUp,
    emailInputSignUp,
    signUpButtons,
    maleRadioBtn,
    passwordInputSignUp,
    daysDropdown,
    monthsDropdown,
    yearsDropdown,
    firstNameInput,
    lastNameInput,
    companyInput,
    addressInput,
    countryDropdown,
    stateInput,
    cityInput,
    zipcodeInput,
    mobileNumberInput,
    createAccountBtn,
  } = getSelectors(page);

  // Generate random user
  const randomString = Math.random().toString(36).substring(2, 10);
  const randomUsername = `user_${randomString}`;
  const randomEmail = `user_${Math.random().toString(36).substring(2, 10)}@playwright.com`;

  // Perform actions
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

  // Return data for the test
  return { username: randomUsername, email: randomEmail };
}
