import {test,expect} from '@playwright/test'
import {navigationPage} from '../page-objects/navigationPage'



test.beforeEach(async({page})=>{
    await page.goto('localhost:4200/')
})

test('Navigate to form page',async ({page})=>{
    const navigateTo = new navigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
})