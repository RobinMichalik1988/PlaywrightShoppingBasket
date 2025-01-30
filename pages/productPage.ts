import { type Locator, type Page} from "playwright/test";
import { BasePage } from "./basePage";

export class productPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }
}