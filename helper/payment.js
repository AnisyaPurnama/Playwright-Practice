import { getSelectors } from './selector';

export async function enterPaymentDetails(page) {
  const {
    cardNameInput,
    cardNumberInput,
    cvcInput,
    cardExpirationMonthInput,
    cardExpirationYearInput,
    payBtn,
  } = getSelectors(page);

  await cardNameInput.fill('Lorem lorem');
  await cardNumberInput.fill('1234567891011');
  await cvcInput.fill('121');
  await cardExpirationMonthInput.fill('02');
  await cardExpirationYearInput.fill('2027');
  await payBtn.click();
}
