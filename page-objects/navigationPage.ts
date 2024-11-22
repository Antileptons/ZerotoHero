import { Locator, Page } from "@playwright/test";

export class navigationPage {

    readonly page: Page
    readonly fromLayoutsManuItem: Locator
    readonly datePickerMenuITem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator





    constructor(page: Page){

        this.page = page
        this.fromLayoutsManuItem = this.page.getByText('Form Layouts')
        this.datePickerMenuITem = this.page.getByText('Datepicker')
        this.smartTableMenuItem = this.page.getByText('Smart Table')
        this.toastrMenuItem = this.page.getByText('Toastr')
        this.tooltipMenuItem = this.page.getByText('Tooltip')

    }

    async formLayoutsPage () { 
        await this.selectGroupMenuItems('Forms')
        await this.fromLayoutsManuItem.click()

    }
    async datepickerPage () { 
        await this.selectGroupMenuItems('Forms')
        await this.datePickerMenuITem.click()

    }
    async smartTablePage () { 
        await this.selectGroupMenuItems('Tables & Data')
        await this.smartTableMenuItem.click()

    }
    async toastrPage () { 
        await this.selectGroupMenuItems('Modal & Overlays')
        await this.toastrMenuItem.click()

    }
    async tooltipPage () { 
        await this.selectGroupMenuItems('Modal & Overlays')
        await this.tooltipMenuItem.click()

    }

    private async selectGroupMenuItems (groupItemTitle:string) {
        const groupMenuItems = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItems.getAttribute('aria-expanded')
        if (expandedState == "false")
            await groupMenuItems.click()




    }




}