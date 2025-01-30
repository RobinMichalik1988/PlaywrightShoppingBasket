import { type Locator, type Page} from "playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
    readonly radiantTee: Locator;

    constructor(page: Page) {
        super(page);
        this.radiantTee = page.getByRole('link', { name: 'Radiant Tee' }).first();
    }

    async navigateToRadiantTee(): Promise<void> {
        await this.radiantTee.click();
    }
}
