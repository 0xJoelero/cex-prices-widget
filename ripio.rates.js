const w = new ListWidget();
w.backgroundColor = new Color("#7606FF");
const stack = w.addStack();
stack.layoutHorizontally();

const title = stack.addText("Ripio");
title.textColor = Color.white();
title.font = Font.blackMonospacedSystemFont(16);
stack.setPadding(0, 0, 0, 15);
stack.centerAlignContent();
const rates = await get({
  url: "https://app.ripio.com/api/v3/public/rates/?country=AR",
});
const currencyArs = "USDT_ARS";
const currencyUsd = "USDC_USD";

const usdt = rates
  .filter((data) => data.ticker.includes("USD"))
  .map((rate) => {
    const { ticker, buy_rate, sell_rate } = rate;
    return {
      pair: ticker,
      buyPrice: buy_rate,
      sellPrice: sell_rate,
    };
  });

const newRatesUsd = usdt
  .filter((data) => data?.pair?.includes(currencyUsd))
  .sort((a, b) => b.pair.localeCompare(a.pair))
  .map((val) => {
    const stack = w.addStack();
    stack.layoutVertically();
    stack.addSpacer(0);
    const pairw = stack.addText("🇺🇸" + val.pair.replace("_", "/"));
    pairw.textColor = Color.white();
    pairw.font = Font.blackMonospacedSystemFont(14);
    //       stack.addSpacer(10)
    const stackRow = w.addStack();
    const sellAt = stackRow.addText("Venta:");
    sellAt.textColor = Color.white();
    sellAt.font = Font.blackMonospacedSystemFont(14);

    stackRow.addSpacer(5);

    const sellP = stackRow.addText("$" + val.buyPrice.toString());
    sellP.textColor = Color.white();
    sellP.font = Font.mediumRoundedSystemFont(14);
    const stackV = w.addStack();

    const buyAt = stackV.addText("Compra:");
    buyAt.textColor = Color.white();
    buyAt.font = Font.blackMonospacedSystemFont(14);

    stackV.addSpacer(5);
    const buyP = stackV.addText("$" + val.sellPrice.toString());
    buyP.textColor = Color.white();
    buyP.font = Font.mediumRoundedSystemFont(14);
  });

const stack2 = w.addStack();
stack2.setPadding(0, 0, 5, 0);

const newRatesArs = usdt
  .filter((data) => data?.pair?.includes(currencyArs))
  .sort((a, b) => b.pair.localeCompare(a.pair))
  .map((val) => {
    const stack = w.addStack();
    stack.layoutVertically();
    stack.addSpacer(0);
    const stackRow = w.addStack();

    const pairw = stack.addText("🇦🇷" + val.pair.replace("_", "/"));
    pairw.textColor = Color.white();
    pairw.font = Font.blackMonospacedSystemFont(14);
    const buyAt = stackRow.addText("Venta:");
    buyAt.textColor = Color.white();
    buyAt.font = Font.blackMonospacedSystemFont(14);

    stackRow.addSpacer(5);

    const sellP = stackRow.addText("$" + val.buyPrice.toString());
    sellP.textColor = Color.white();
    sellP.font = Font.mediumRoundedSystemFont(14);
    stackRow.addSpacer(8);
    const stackV = w.addStack();
    const sellAt = stackV.addText("Compra:");
    sellAt.textColor = Color.white();
    sellAt.font = Font.blackMonospacedSystemFont(14);
    stackV.addSpacer(5);

    const buyP = stackV.addText("$" + val.sellPrice.toString());
    buyP.textColor = Color.white();
    buyP.font = Font.mediumRoundedSystemFont(14);
  });

Script.setWidget(w);
Script.complete();
w.presentSmall();
async function get(opts) {
  const request = new Request(opts.url);
  request.headers = {
    ...opts.headers,
    ...this.defaultHeaders,
  };
  var result = await request.loadJSON();
  console.log(result);
  return result;
}

async function loadImage(imgUrl) {
  let req = new Request(imgUrl);
  let image = await req.loadImage();
  return image;
}
