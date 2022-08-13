Feature('multiple_windows');

const assert = require('assert');

Scenario('should open main page of configured site, open a popup, switch to main page, then switch to popup, close popup, and go back to main page', async ({ I }) => {
    I.amOnPage('/');
    const handleBeforePopup = await I.grabCurrentWindowHandle();
    const urlBeforePopup = await I.grabCurrentUrl();
    const allHandlesBeforePopup = await I.grabAllWindowHandles();
    assert.equal(allHandlesBeforePopup.length, 1, 'Single Window');

    await I.executeScript(() => {
        window.open('https://www.w3schools.com/', 'new window', 'toolbar=yes,scrollbars=yes,resizable=yes,width=400,height=400');
    });

    const allHandlesAfterPopup = await I.grabAllWindowHandles();
    assert.equal(allHandlesAfterPopup.length, 2, 'Two Windows');

    await I.switchToWindow(allHandlesAfterPopup[1]);
    const urlAfterPopup = await I.grabCurrentUrl();
    assert.equal(urlAfterPopup, 'https://www.w3schools.com/', 'Expected URL: Popup');

    assert.equal(handleBeforePopup, allHandlesAfterPopup[0], 'Expected Window: Main Window');
    await I.switchToWindow(handleBeforePopup);
    const currentURL = await I.grabCurrentUrl();
    assert.equal(currentURL, urlBeforePopup, 'Expected URL: Main URL');

    await I.switchToWindow(allHandlesAfterPopup[1]);
    const urlAfterSwitchBack = await I.grabCurrentUrl();
    assert.equal(urlAfterSwitchBack, 'https://www.w3schools.com/', 'Expected URL: Popup');
    await I.closeCurrentTab();

    const allHandlesAfterPopupClosed = await I.grabAllWindowHandles();
    assert.equal(allHandlesAfterPopupClosed.length, 1, 'Single Window');
    const currentWindowHandle = await I.grabCurrentWindowHandle();
    assert.equal(currentWindowHandle, allHandlesAfterPopup[0], 'Expected Window: Main Window');

});
