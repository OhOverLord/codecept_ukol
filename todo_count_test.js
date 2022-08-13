Feature('todo_count');

const assert = require('assert');
Scenario('get value of current tasks', async ({ I }) => {
    I.amOnPage('https://todomvc.com/examples/vue/#/all');
    I.waitForElement('.todoapp');
    I.fillField('.new-todo', 'my first item');
    I.pressKey('Enter')
    I.fillField('.new-todo', 'my second item');
    I.pressKey('Enter')
    let numTodos = await I.grabTextFrom('.todo-count strong');
    assert.equal(2, numTodos);
});
