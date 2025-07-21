import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Тест", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: "new",
      slowMo: 250,
      devtools: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
  });

  test("Клик по кнопке, проверка содержимого текста, закрытые поповера", async () => {
    await page.goto(baseUrl);

    await page.click("#popoverBtn");

    const popover = (await page.$(".popover")) !== null;
    expect(popover).toBe(true);

    const popoverText = await page.$eval(
      ".popover-body",
      (el) => el.textContent,
    );
    expect(popoverText).toBe(
      "And here's some amazing content. It's very engaging. Right?",
    );

    await page.click("#popoverBtn");

    const popoverClose = await page.$(".popover");
    expect(popoverClose).toBeNull();
  });
});
