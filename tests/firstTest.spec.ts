import {test,expect} from '@playwright/test'
import exp from 'constants';




test.beforeEach (async ({page})=> {

    await page.goto('localhost:4200/');
    await page.getByText('forms').click()
    await page.getByText('Form Layouts').click()

})

test ('User Facing locator', async ({page})=> {

    await page.getByRole('textbox',{name : "Email"}).first().click()

    await page.getByRole('button',{name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()

})


test ('locate child element',async ({page})=>{

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click()


})

test ('locate parent element',async ({page})=>{

    await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name : "Email"}).first().click()

    await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox',{name : "Email"}).first().click()

    await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('textbox',{name : "Email"}).first().click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name : "Password"}).first().click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox',{name:"Email"}).click()


})


test ('reusing the locators',async ({page})=>{

    const basicForm = page.locator('nb-card').filter({hasText:'Basic form'})
    const emailField = basicForm.getByRole('textbox',{name : "Email"}).first()
    const passwordField = basicForm.getByRole('textbox',{name : "Password"}).first()

    await emailField.fill('test@test.com')
    await passwordField.fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test ('extracting values',async ({page})=>{

    const basicForm = page.locator('nb-card').filter({hasText:'Basic form'})
    const buttonText = await basicForm.locator('button').textContent()

    expect (buttonText).toEqual('Submit')

    const allRadioButtonsLabels =  await page.locator('nb-radio').allTextContents()
    expect (allRadioButtonsLabels).toContain("Option 1")


    const emailField = basicForm.getByRole('textbox',{name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect (emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect (placeholderValue).toEqual('Email')
})


test('assertion',async ({page}) => {

    const basicFormButton = page.locator('nb-card').filter({hasText:'Basic form'}).locator('button')

    const value = 5
    expect (value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect (text).toEqual("Submit")

    await expect (basicFormButton).toHaveText('Submit')

    await expect.soft (basicFormButton).toHaveText('Submit')
    await basicFormButton.click()


})
