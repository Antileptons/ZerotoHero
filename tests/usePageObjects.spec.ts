import {test,expect} from '@playwright/test'
import {navigationPage} from '../page-objects/navigationPage'
import { formLayoutsPage } from '../page-objects/formLayoutsPage'



test.beforeEach(async({page})=>{
    await page.goto('localhost:4200/')
})

test('Navigate to form page',async ({page})=>{
    const navigateTo = new navigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
})

test ('Parametrized methods',async ({page})=>{
    const navigateTo = new navigationPage(page)
    const onFormLayoutPage = new formLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com','Welcome1','Option 2')
    await onFormLayoutPage.submitInLineFormWithEmailAndCheckbox('John Smith', 'John@test.com',true)

})

