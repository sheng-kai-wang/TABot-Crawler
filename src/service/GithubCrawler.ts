// import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
// import chrome from "selenium-webdriver/chrome";
import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

import { github_all_branch_url } from "../resources/config";

// const waitAndClick = async (driver: WebDriver, elementBy: By) => {
//     const ele = await driver.wait(until.elementLocated(elementBy));
//     await ele.click();
// };

const getGithubCommits = async (allGroup: [{ [k: string]: any; }]) => {

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options().headless())
        .build();

    try {
        for (let group of allGroup) {
            const groupName = group["groupName"];
            const repositoryList = group["repositoryList"];

            for (let pair of repositoryList) {

                const branchesUrl = github_all_branch_url
                    .replace("<<username>>", pair.username)
                    .replace("<<repository>>", pair.repository);

                await driver.get(branchesUrl);

                const branches = await driver.findElements(By.className("branch-name"));
                for (let branch of branches) {
                    console.log(await branch.getAttribute("href"));
                    await driver.get(await branch.getAttribute("href"));
                    // driver.findElement(By.className("pl-3 pr-3 py-3 p-md-0 mt-n3 mb-n3 mr-n3 m-md-0 Link--primary no-underline no-wrap")).click();
                }
            };
        };



        // allGroup.forEach((groupData: { [k: string]: any; }) => {
        //     const groupName = groupData["groupName"];
        //     groupData["repositoryList"].forEach((pair: any) => {
        //         const url = github_all_branch_url
        //             .replace("<<username>>", pair.username)
        //             .replace("<<repository>>", pair.repository);

        //         await driver.get(url);
        //         const branches = await driver.findElements(By.className("branch-name"));
        //         branches.forEach(url => console.log(url));


        //         // await driver.get("https://ais.ntou.edu.tw/Default.aspx");
        //         // await driver.findElement(By.id("M_PORTAL_LOGIN_ACNT")).sendKeys(account);
        //         // await driver.findElement(By.id("M_PW")).sendKeys(password, Key.ENTER);
        //         // await driver.wait(until.urlIs("https://ais.ntou.edu.tw/MainFrame.aspx"));
        //         // await driver
        //         //     .switchTo()
        //         //     .frame(await driver.findElement(By.name("menuFrame")));
        //         // await waitAndClick(driver, By.css("a[title='教務系統']"));
        //         // await waitAndClick(driver, By.css("a[title='選課系統']"));
        //         // await waitAndClick(driver, By.css("a[title='學生個人選課清單課表列印']"));

        //         // await driver.switchTo().defaultContent();
        //         // await driver
        //         //     .switchTo()
        //         //     .frame(await driver.findElement(By.name("mainFrame")));

        //         // await waitAndClick(driver, By.id("QUERY_BTN3"));

        //         // const classTable = await driver.wait(until.elementLocated(By.id("table2")));
        //         // tableHTML = await classTable.getAttribute("innerHTML");
        //     });
        // });
    } catch (error) {
        console.error(error);
    } finally {
        await driver.quit();
    }
    // return tableHTML;
};

export { getGithubCommits };