import {selector} from 'testcafe';

fixture('My test')
    .page('https://weeknumber.net');

test('My First Test', async t => {
    await t
        .typeText('#q', '1/1 2023')
        .takeScreenshot()
        .click('#querybox > form > button')
        .expect(Selector('#ugenr').innerText).eql('week 52')
        .takeScreenshot()
        .pressKey("delete")
        .takeScreenshot()
        .expect(Selector('#q').innerText).eql('')
});