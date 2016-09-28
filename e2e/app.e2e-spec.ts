import { MyStockTickersUIPage } from './app.po';

describe('my-stock-tickers-ui App', function() {
  let page: MyStockTickersUIPage;

  beforeEach(() => {
    page = new MyStockTickersUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
