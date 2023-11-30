import scrapy, sys
from scrapy.crawler import CrawlerProcess

product_list = []


class Spider1(scrapy.Spider):
    name = "gadgetNgadget"

    def __init__(self, arg):
        self.arg = arg

    def start_requests(self):
        url = f"https://gngbd.com/product/search?search={self.arg}"
        yield scrapy.Request(url, callback=self.parse)

    def parse(self, response):
        global product_list
        shop_img = response.css('.sticky_nav').css('img::attr(src)').get()
        images = response.css('div.product-img img::attr(src)').getall()
        models = response.css('.product-gallery-item-content h4::text').extract()
        priceWithBugs = response.css('.product-gallery-item-content span::text').extract()
        print(priceWithBugs)
        prices = []
        for i in range(0, len(priceWithBugs), 3):
            prices.append(priceWithBugs[i][1:])
        linksWithBugs = response.css('.product-gallery-item-content a').css('a::attr(href)').getall()
        links = []
        cards = response.css('.product-gallery-item-content')
        for i in range(0, len(linksWithBugs), 2):
            links.append(linksWithBugs[i])
        for i, j in enumerate(cards):
            d = {"shop_img": shop_img, "device_img": images[i], "model": j.css('h4::text').extract(),
                 "price": [j.css('span::text').get()[1:]], "link": j.css('a').css('a::attr(href)').get()}
            if j.css('del::text').get():
                d["price"].append(j.css('del::text').get()[1:])
            product_list.append(d)


q = "Samsung"
process = CrawlerProcess()
process.crawl(Spider1, q)
process.start()
print(*product_list, sep='\n')
# print(len(product_list))
