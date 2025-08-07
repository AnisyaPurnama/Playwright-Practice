import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
});

//-----ADD/REMOVE ELEMENTS----

test.describe('The internet herokuapp test automation', () => {
  test('should add and remove element', async ({ page }) => {
    const addRemoveLink = page.locator('a', { hasText: 'Add/Remove Elements' });
    const addButton = page.locator('button', { hasText: 'Add Element' });
    const deleteButtons = page.locator('.added-manually');

    await addRemoveLink.click();
    await addButton.click();
    await expect(deleteButtons).toBeVisible();
    await deleteButtons.click();
    await expect(deleteButtons).toBeHidden();
  });

  //-----BASIC AUTH----

  // test('should be able to access Basic Auth page with credentials', async ({ page }) => {
  //   const basicAuthLink = page.locator('a', { hasText: 'Basic Auth' });
  //   const authHref = await basicAuthLink.getAttribute('href');
  //   const authenticatedUrl = authHref?.replace('https://', 'https://admin:admin@');
  //   const successMessage = page.locator('p');

  //   await page.goto(authenticatedUrl || '');
  //   await expect(successMessage).toBeVisible();
  //   await expect(successMessage).toContainText(
  //     'Congratulations! You must have the proper credentials.'
  //   );
  // });

  //-----BROKEN IMAGES----

  test('should detect broken images on the page', async ({ page }) => {
    const brokenImagesLink = page.locator('a', { hasText: 'Broken Images' });
    await brokenImagesLink.click();

    const images = await page.locator('img').elementHandles();

    const brokenImages = await Promise.all(
      images.map(async (img) => {
        const src = await img.getAttribute('src');
        const isBroken = await img.evaluate((imgEl) => imgEl.naturalWidth === 0);
        return isBroken ? src : null;
      })
    );

    const filteredBrokenImages = brokenImages.filter(Boolean);

    expect(filteredBrokenImages).not.toHaveLength(0); // Expect at least one broken
  });

  //-----CHALLENGING DOM----

  test('should navigate to Challenging DOM and verify table headers', async ({ page }) => {
    const challengingDomLink = page.locator('a', { hasText: 'Challenging DOM' });
    await challengingDomLink.click();

    const tableHeaders = page.locator('table thead tr th');
    const expectedHeaders = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Diceret', 'Action'];

    for (let i = 0; i < expectedHeaders.length; i++) {
      await expect(tableHeaders.nth(i)).toHaveText(expectedHeaders[i]);
    }
  });

  //-----CHECKBOXES----

  test('should able select and unselect checkboxes', async ({ page }) => {
    const checkboxesLink = page.locator('a', { hasText: 'Checkboxes' });
    const checkbox1 = page.locator('form#checkboxes input[type="checkbox"]').nth(0);
    const checkbox2 = page.locator('form#checkboxes input[type="checkbox"]').nth(1);

    await checkboxesLink.click();

    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();

    await checkbox1.check();
    await checkbox2.uncheck();

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });

  //-----HOVERS----

  test('should able to hover over a figure', async ({ page }) => {
    const hoversLink = page.locator('a', { hasText: 'Hovers' });
    const firstFigure = page.locator('.figure').nth(0);
    const userText = firstFigure.locator('.figcaption h5');

    await hoversLink.click();
    await firstFigure.hover();
    await expect(userText).toBeVisible();
    await expect(userText).toHaveText('name: user1');
  });

  //-----CONTEXT MENU----

  test('should show alert on right-clicking the hotspot', async ({ page }) => {
    const contextMenuLink = page.locator('a', { hasText: 'Context Menu' });
    await contextMenuLink.click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('You selected a context menu');
      await dialog.dismiss();
    });

    const box = page.locator('#hot-spot');
    await box.click({ button: 'right' });
  });

  //-----DISAPPEARING ELEMENTS----

  test('should load Disappearing Elements page and verify menu items', async ({ page }) => {
    const disappearingElementsLink = page.locator('a', { hasText: 'Disappearing Elements' });
    await disappearingElementsLink.click();

    const menuItems = page.locator('ul li a');
    const visibleTexts = (await menuItems.allTextContents()).map((text) =>
      text.trim().toLowerCase()
    );

    const expectedItems = ['home', 'about', 'contact', 'portfolio'];

    for (const expected of expectedItems) {
      const matchFound = visibleTexts.some((text) => text.includes(expected));
      expect(matchFound).toBeTruthy(); // Each expected item should be found in some
    }

    expect(visibleTexts.length).toBeGreaterThanOrEqual(4);
    expect(visibleTexts.length).toBeLessThanOrEqual(5);
  });

  //-----DRAG AND DROP----

  test('should drag column A and drop it onto column B', async ({ page }) => {
    const dragAndDropLink = page.locator('a', { hasText: 'Drag and Drop' });
    await dragAndDropLink.click();

    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');

    await columnA.dragTo(columnB);

    await expect(columnA.locator('header')).toHaveText('B');
    await expect(columnB.locator('header')).toHaveText('A');
  });

  //-----DROPDOWN----

  test('should able to select a dropdown value', async ({ page }) => {
    const dropdownLink = page.locator('a', { hasText: 'Dropdown' });
    const dropdownBtn = page.locator('#dropdown');

    await dropdownLink.click();
    await dropdownBtn.click();
    await dropdownBtn.selectOption('1');
    await expect(dropdownBtn).toHaveValue('1');
  });

  //-----DYNAMIC CONTENT----

  test('should verify that content changes on reload', async ({ page }) => {
    const dynamicContentLink = page.locator('a', { hasText: 'Dynamic Content' });
    await dynamicContentLink.click();

    const contentLocator = page.locator('#content .row .large-10');
    const contentsBefore = await contentLocator.allTextContents();

    await page.reload();

    const contentsAfter = await contentLocator.allTextContents();

    expect(contentsBefore).not.toEqual(contentsAfter);
  });

  //-----DYNAMIC CONTROLS----

  test('should remove and add checkbox dynamically', async ({ page }) => {
    const dynamicControlsLink = page.locator('a', { hasText: 'Dynamic Controls' });
    await dynamicControlsLink.click();

    const checkbox = page.locator('#checkbox');
    const toggleButton = page.locator('#checkbox-example button');
    const message = page.locator('#message');

    // Remove checkbox
    await toggleButton.click();
    await expect(checkbox).toBeHidden();
    await expect(message).toHaveText("It's gone!"); //'It\'s gone!'

    // Add checkbox
    await toggleButton.click();
    await expect(checkbox).toBeVisible();
    await expect(message).toHaveText("It's back!"); //'It\'s gone!'
  });

  test('should enable and disable input field dynamically', async ({ page }) => {
    const dynamicControlsLink = page.locator('a', { hasText: 'Dynamic Controls' });
    await dynamicControlsLink.click();

    const input = page.locator('#input-example input');
    const enableButton = page.locator('#input-example button');

    // Enable input
    await enableButton.click();
    await expect(input).toBeEnabled();
    await expect(page.locator('#message')).toHaveText("It's enabled!");
    // Disable input
    await enableButton.click();
    await expect(input).toBeDisabled();
    await expect(page.locator('#message')).toHaveText("It's disabled!");

    //-----DYNAMIC LOADING----

    test('should wait for hidden element to appear - Example 1', async ({ page }) => {
      const dynamicLoadingLink = page.locator('a', { hasText: 'Dynamic Loading' });
      await dynamicLoadingLink.click();

      const example1Link = page.locator('a', { hasText: 'Example 1' });
      await example1Link.click();

      const startButton = page.locator('button', { hasText: 'Start' });
      await startButton.click();

      const finishText = page.locator('#finish h4');
      await expect(finishText).toBeVisible({ timeout: 10000 });
      await expect(finishText).toHaveText('Hello World!');
    });

    test('should wait for element that is rendered after load - Example 2', async ({ page }) => {
      const dynamicLoadingLink = page.locator('a', { hasText: 'Dynamic Loading' });
      await dynamicLoadingLink.click();

      const example2Link = page.locator('a', { hasText: 'Example 2' });
      await example2Link.click();

      const startButton = page.locator('button', { hasText: 'Start' });
      await startButton.click();

      const finishText = page.locator('#finish h4');
      await expect(finishText).toBeVisible({ timeout: 10000 });
      await expect(finishText).toHaveText('Hello World!');
    });

    //-----ENTRY AD----

    test('should close the modal in Entry Ad', async ({ page }) => {
      const entryAdLink = page.locator('a', { hasText: 'Entry Ad' });
      await entryAdLink.click();

      const modal = page.locator('.modal');
      await expect(modal).toBeVisible();

      const closeModal = page.locator('.modal-footer > p');
      await closeModal.click();
      await expect(modal).toBeHidden();
    });

    //-----EXIT INTENT----

    // test('should trigger modal on mouse leaving viewport - Exit Intent', async ({ page }) => {
    //   const exitIntentLink = page.locator('a', { hasText: 'Exit Intent' });
    //   await exitIntentLink.click();

    //   if (testInfo.project.name === 'firefox') {
    //     test.skip('Exit intent may not work reliably in Firefox');
    //   }

    //   await page.mouse.move(300, 300); // move inside first
    //   await page.mouse.move(300, 0); // simulate exit to top

    //   const modal = page.locator('.modal');
    //   await expect(modal).toBeVisible({ timeout: 10000 });

    //   const close = page.locator('.modal .modal-footer > p');
    //   await close.click();
    //   await expect(modal).toBeHidden();
    // });

    //-----FILE DOWNLOAD----

    test('should download a file', async ({ page }) => {
      const fileDownloadLink = page.getByRole('link', { name: 'File Download', exact: true });
      await fileDownloadLink.click();

      const downloadLink = page.locator('div.example a').first();

      const [download] = await Promise.all([page.waitForEvent('download'), downloadLink.click()]);

      const suggestedFilename = download.suggestedFilename();
      expect(suggestedFilename).toBeTruthy();
    });

    //-----FILE UPLOAD----

    test('should upload a file', async ({ page }) => {
      const fileUploadLink = page.locator('a', { hasText: 'File Upload' });
      await fileUploadLink.click();

      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles('tests/fixtures/sample.txt'); // adjust path to your fixture file

      const uploadButton = page.locator('input[type="submit"]');
      await uploadButton.click();

      const uploadedFile = page.locator('#uploaded-files');
      await expect(uploadedFile).toHaveText('sample.txt');
    });

    //-----FLOATING MENU----

    test('should keep floating menu visible on scroll', async ({ page }) => {
      const floatingMenuLink = page.locator('a', { hasText: 'Floating Menu' });
      await floatingMenuLink.click();

      const menu = page.locator('#menu');
      await page.mouse.wheel(0, 2000); // scroll down

      await expect(menu).toBeVisible();
    });

    //-----FORGOT PASSWORD----

    test('should request password reset', async ({ page }) => {
      const forgotPasswordLink = page.locator('a', { hasText: 'Forgot Password' });
      await forgotPasswordLink.click();

      const emailInput = page.locator('#email');
      await emailInput.fill('user@example.com');

      const retrieveBtn = page.locator('#form_submit');
      await retrieveBtn.click();

      const confirmation = page.locator('#content');
      await expect(confirmation).toContainText("Your e-mail's been sent!");
    });

    //-----FORM AUTHENTICATION----

    test('should login and logout successfully', async ({ page }) => {
      const authLink = page.locator('a', { hasText: 'Form Authentication' });
      await authLink.click();

      await page.locator('#username').fill('tomsmith');
      await page.locator('#password').fill('SuperSecretPassword!');
      await page.locator('button[type="submit"]').click();

      const flash = page.locator('#flash');
      await expect(flash).toContainText('You logged into a secure area!');

      const logoutBtn = page.locator('a.button');
      await logoutBtn.click();

      await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
    });

    //-----FRAMES----

    test('should navigate nested frames and verify content', async ({ page }) => {
      const framesLink = page.locator('a', { hasText: 'Frames' });
      await framesLink.click();

      const nestedFramesLink = page.locator('a', { hasText: 'Nested Frames' });
      await nestedFramesLink.click();

      const frameTop = page.frame({ name: 'frame-top' });
      const frameMiddle = await frameTop?.frame({ name: 'frame-middle' });

      const middleText = await frameMiddle?.locator('#content').innerText();
      expect(middleText).toBe('MIDDLE');
    });

    //-----GEOLOCATION----

    //-----HORIZONTAL SLIDER----

    test('should slide to value 3.5 on Horizontal Slider', async ({ page }) => {
      const sliderLink = page.locator('a', { hasText: 'Horizontal Slider' });
      await sliderLink.click();

      const slider = page.locator('input[type="range"]');
      const valueText = page.locator('#range');

      for (let i = 0; i < 7; i++) {
        await slider.press('ArrowRight');
      }

      await expect(valueText).toHaveText('3.5');
    });

    //-----INFINITE SCROLL----

    test('should load more content when scrolling down - Infinite Scroll', async ({ page }) => {
      const infiniteScrollLink = page.locator('a', { hasText: 'Infinite Scroll' });
      await infiniteScrollLink.click();

      const paragraphs = page.locator('.jscroll-added');
      const initialCount = await paragraphs.count();

      await page.mouse.wheel(0, 2000); // simulate scroll

      const newCount = await paragraphs.count();
      expect(newCount).toBeGreaterThan(initialCount);
    });

    //-----INPUTS----

    test('should accept numeric input in Inputs field', async ({ page }) => {
      const inputsLink = page.locator('a', { hasText: 'Inputs' });
      await inputsLink.click();

      const numberInput = page.locator('input[type="number"]');
      await numberInput.fill('12345');

      await expect(numberInput).toHaveValue('12345');
    });

    //-----JQUERY UI MENUS----
    //-----JAVASCRIPT ALERTS----
    //-----JAVASCRIPT ONLOAD EVENT ERROR----
    //-----KEY PRESSES----
    //-----LARGE & DEEP DOM----

    //-----MULTIPLES WINDOWS----

    test('should open a new window and verify content', async ({ page, context }) => {
      const windowsLink = page.locator('a', { hasText: 'Multiple Windows' });
      await windowsLink.click();

      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('a', { hasText: 'Click Here' }).click(),
      ]);

      await newPage.waitForLoadState();
      const heading = newPage.locator('h3');
      await expect(heading).toHaveText('New Window');
    });

    //-----NESTED FRAMES----

    test('should access middle frame inside nested frames', async ({ page }) => {
      const framesLink = page.locator('a', { hasText: 'Frames' });
      await framesLink.click();

      const nestedFramesLink = page.locator('a', { hasText: 'Nested Frames' });
      await nestedFramesLink.click();

      const topFrame = await page.frame({ name: 'frame-top' });
      const middleFrame = await topFrame?.frame({ name: 'frame-middle' });

      const middleText = await middleFrame?.locator('#content').innerText();
      expect(middleText).toBe('MIDDLE');
    });

    //-----NOTIFICATION MESSAGES----

    test('should display a notification message after clicking link', async ({ page }) => {
      const notificationLink = page.locator('a', { hasText: 'Notification Messages' });
      await notificationLink.click();

      const clickHereLink = page.locator('a', { hasText: 'Click here' });

      await clickHereLink.click();

      const message = page.locator('#flash');
      await expect(message).toBeVisible();
      await expect(message).toContainText('Action'); // success or failure message
    });

    //-----REDIRECT LINK----

    test('should follow redirect to status code page', async ({ page }) => {
      const redirectLink = page.locator('a', { hasText: 'Redirect Link' });
      await redirectLink.click();

      const redirectButton = page.locator('a', { hasText: 'here' });
      await redirectButton.click();

      const header = page.locator('h3');
      await expect(header).toHaveText('Status Codes');
    });

    //-----SECURE FILE DOWNLOAD----
    //-----SHADOW DOM----
    //-----SHIFTING CONTENT----
    //-----SLOW RESOURCES----
    //-----SORTABLE DATA TABLES----
    //-----STATUS CODES----
    //-----TYPOS----
    //-----WYSIWYG EDITOR----
  });
});
