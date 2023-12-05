import scrapy, sys, json
from scrapy.crawler import CrawlerProcess

product_list= []
class Spider2(scrapy.Spider):
    name = "kry"

    def __init__(self, arg):
        self.arg = arg

    def start_requests(self):
        url = self.arg
        yield scrapy.Request(url, callback=self.parse)

    def parse(self, response):
        global product_list
        images= response.css('.img-responsive').css('img::attr(src)').getall()
        d = {"shop_img": images[0], "device_img": images[1],
             "model": response.css('.show-product-nav::text').get(),
             "price": [response.css('.single-product-price bdi::text').get()], "link": str(response)[5:-1]}

        if response.css('.single-product-price del bdi::text').get():
            d["price"].append(response.css('.single-product-price ins bdi::text').get())
        product_list.append(d)
            

process = CrawlerProcess()            
process.crawl(Spider2, sys.argv[1])            
process.start()
print(json.dumps(product_list))