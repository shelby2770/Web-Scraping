import scrapy, sys
from scrapy.crawler import CrawlerProcess

product_list= []
class Spider3(scrapy.Spider):
    name = "gadgetMonkey"

    def __init__(self, arg):
        self.arg = arg

    def start_requests(self):
        url = f"https://www.gadgetmonkeybd.com/search?keyword={self.arg}"
        yield scrapy.Request(url, callback=self.parse)

    def parse(self, response):
        global product_list
        shop_img = response.css('.h-md-40px').css('img::attr(src)').get()
        images = response.css('.z-1').css('img::attr(data-src)').getall()
        cards = response.css('.z-1')
        for i in range(len(cards) - 1):
            d = {"shop_img": shop_img, "device_img": images[i], "model": cards[i].css('.hov-text-primary::text').get(),
                 "price": [cards[i].css('.text-primary::text').get()[2:-1]], "link": cards[i].css('a::attr(href)').get()}
            if cards[i].css('.mr-1::text').get():
                d["price"].append(cards[i].css('.mr-1::text').get()[1:])
            product_list.append(d)
            

process = CrawlerProcess()            
process.crawl(Spider3, sys.argv[1])            
process.start()
print(product_list)