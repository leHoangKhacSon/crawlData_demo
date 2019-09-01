const puppeteer = require('puppeteer');
const download = require('image-downloader');

(async() => {
    const browser = await puppeteer.launch();
    console.log('Browser openned');
    const page = await browser.newPage();
    const url = 'https://xkcn.tumblr.com/';
    await page.goto(url);
    console.log('Page loaded');
    await page.waitForSelector('.photo-wrapper-inner a > img');

    const imgLinks = await page.evaluate(() => {
        let imgElements = document.querySelectorAll('.photo-wrapper-inner a > img');
        imgElements = [...imgElements];
        let imgLinks = imgElements.map(i => i.getAttribute('src'));
        return imgLinks;
    });
    console.log(imgLinks);

    // Tải các ảnh này về thư mục hiện tại
    await Promise.all(imgLinks.map(imgUrl => download.image({
        url: imgUrl,
        dest: __dirname + '/photo'
    })));

    await browser.close();
})();