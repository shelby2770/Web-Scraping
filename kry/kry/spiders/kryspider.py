import scrapy, sys
from scrapy.crawler import CrawlerProcess

product_list= []
class Spider2(scrapy.Spider):
    name = "kry"

    def __init__(self, arg):
        self.arg = arg

    def start_requests(self):
        url = f"https://kryinternational.com/?s={self.arg}"
        yield scrapy.Request(url, callback=self.parse1, dont_filter=True)

    def parse1(self, response):
        links= response.css('.post-title a').css('a::attr(href)').getall()
        for i in links:
            yield scrapy.Request(i, callback=self.parse2, dont_filter=True)

    def parse2(self, response):
        global product_list
        images= response.css('.img-responsive').css('img::attr(src)').getall()
        d = {"shop_img": images[0], "device_img": images[1],
             "model": response.css('.show-product-nav::text').get(),
             "price": [response.css('.single-product-price bdi::text').get()], "link": str(response)[5:-1]}
        product_list.append(d)


q = "Samsung"
process = CrawlerProcess()
process.crawl(Spider2, q)
process.start()
# print(*product_list, sep='\n')
# print(len(product_list))
