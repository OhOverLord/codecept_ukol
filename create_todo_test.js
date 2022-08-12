Feature('create_todo');

Scenario('create todo item', ({ I }) => {
    I.amOnPage('https://todomvc.com/examples/vue/#/all');
    I.waitForElement('.todoapp');
    I.fillField('.new-todo', 'Write a test')
    I.pressKey('Enter');
    I.see('1 item left', '.todo-count');
});
