Feature('login');

Scenario('login test', ({ I }) => {
    I.amOnPage('https://github.com/login');
    I.fillField('Username or email address', 'john');
    I.fillField('Password', '123456');
    I.click('Sign in');
    I.seeElement({xpath: '//div[@class="flash flash-full flash-error "]'});
  });
