import { Selector, ClientFunction } from 'testcafe';

fixture('My test fixture for blogifier register')
    .page('http://localhost:9888/admin/register');

test('RegistrationMissingInputs', async t => {
    await t
        .click('#app > div > form > button')
        .expect(Selector('#app > div > form > div:nth-child(1) > div').innerText).eql('The Email field is required.')
        .expect(Selector('#app > div > form > div:nth-child(2) > div').innerText).eql('The Name field is required.')
        .expect(Selector('#app > div > form > div:nth-child(3) > div').innerText).eql('The Password field is required.')
        .expect(Selector('#app > div > form > div:nth-child(4) > div').innerText).eql('The PasswordConfirm field is required.')
});

test('RegistrationPasswordDoesNotMatch', async t => {
    await t
        .typeText('#registerEmail', 'minemail@gmail.com')
        .typeText('#registerName', 'Mit Navn')
        .typeText('#registerPassword', '123nice')
        .typeText('#registerConfirmPassword', 'nice123')
        .click('#app > div > form > button')
        .expect(Selector('#app > div > form > div:nth-child(4) > div').innerText).eql('Passwords do not match')
});

test('RegistrationSuccess', async t => {

    const getLocation = ClientFunction(() => document.location.href);

    await t
        .typeText('#registerEmail', 'minemail@gmail.com')
        .typeText('#registerName', 'Mit Navn')
        .typeText('#registerPassword', '123nice')
        .typeText('#registerConfirmPassword', '123nice')
        .click('#app > div > form > button')
        .expect(getLocation()).contains('http://localhost:9888/admin/login')
});

fixture('My test fixture for blogifier login')
    .page('http://localhost:9888/admin/login');

test('LoginEmailDoesNotExist', async t => {
    await t
        .typeText('#loginEmail', 'fejlemail@gmail.com')
        .typeText('#loginPassword', '123nice')
        .click('#app > div > form > button')
        .expect(Selector('#app > div > div').innerText).eql('Login failed, please try again.')
});

test('LoginWrongPassword', async test => {
    await test
        .typeText('#loginEmail', 'Enemail@gmail.com')
        .typeText('#loginPassword', '1234jan')
        .click('#app > div > form > button')
        .takeScreenshot()
        .expect(Selector('#app > div > div').innerText).eql('Login failed, please try again.')
});

test('LoginSuccess', async test => {
    const getLocation = ClientFunction(() => document.location.href)

    await test
        .typeText('#loginEmail', 'minemail@gmail.com')
        .typeText('#loginPassword', '123nice')
        .click('#app > div > form > button')
        .expect(getLocation()).eql('http://localhost:9888/admin/')
});