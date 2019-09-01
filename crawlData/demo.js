const puppeteer = require('puppeteer');
var fs = require('fs');

(async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    let datas = [];
    await page.goto('http://kenh14.vn');

    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
    const articles = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('h3.knswli-title > a');
        titleLinks = [...titleLinks];
        let articles = titleLinks.map(link => ({
            title: link.getAttribute('title'),
            url: link.getAttribute('href')
        }));
        return articles;
    });

    // In ra kết quả và đóng trình duyệt
    console.log(articles);

    let db = {
        "data": articles
    }
    let dbString = JSON.stringify(db);
    fs.writeFileSync('../data/db.json', dbString, {encoding: 'utf8'});

    await browser.close();
})();