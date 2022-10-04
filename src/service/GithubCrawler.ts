import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

import { GITHUB_ALL_BRANCH_URL } from "../resources/config";


const waitAndClick = async (driver: WebDriver, elementBy: By) => {
    const element = await driver.wait(until.elementLocated(elementBy));
    await element.click();
};

const getGithubCommits = async (allGroup: [{ [k: string]: any; }]) => {

    let response = {};

    const driver = await new Builder()
        .forBrowser("chrome")
        // .setChromeOptions(new chrome.Options().headless())
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        for (let group of allGroup) {
            const groupName = group["groupName"];
            const repositoryList = group["repositoryList"];

            for (let pair of repositoryList) {

                const branchesUrl = GITHUB_ALL_BRANCH_URL
                    .replace("<<username>>", pair.username)
                    .replace("<<repository>>", pair.repository);

                let page = 1;
                let branchUrlList: string[] = [];
                while (true) {
                    let currentbranchesUrl = branchesUrl.replace("<<page>>", page.toString());
                    await driver.get(currentbranchesUrl);
                    const branches = await driver.findElements(By.className("branch-name"));
                    if (branches.length == 0) break;
                    for (let branch of branches) {
                        let branchUrl: string = await branch.getAttribute("href");
                        branchUrlList.push(branchUrl);
                    }
                    page++;
                };

                for (let branchUrl of branchUrlList) {
                    await driver.get(branchUrl);
                    let branchName: string = await driver.findElement(By.css("span[class'css-truncate-target']")).getText();
                    await waitAndClick(driver, By.css("a[class='pl-3 pr-3 py-3 p-md-0 mt-n3 mb-n3 mr-n3 m-md-0 Link--primary no-underline no-wrap']"));
                    await driver.sleep(3000);
                }
            };
        };

    } catch (error) {
        console.error(error);
    } finally {
        await driver.quit();
    }
};

export { getGithubCommits };