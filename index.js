const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = "https://instagram.com/hira.clau";
  await page.goto(url);

  const imgList = await page.evaluate(() => {
    // toda essa função será executada no browser;

    // pegar todas imagens em posts
    const nodeList = document.querySelectorAll("article img");
    // transformar o nodelist em array
    const imgArray = [...nodeList];
    // transformar os nodes (elementos) em objtos JS
    const imgList = imgArray.map(({ src }) => ({
      src,
    }));
    // colocar para fora da função
    console.log(imgList);
    return imgList;
  });

  //escrever os dados em um arquivo local json
  fs.writeFile("instagram.json", JSON.stringify(imgList, null, 2), (err) => {
    if (err) throw new Error(err);
    console.log("well done");
  });

  //await page.waitForSelector(".success", { visible: true });
  //await page.screenshot({ path: "captura.png" });

  await browser.close();
})();
