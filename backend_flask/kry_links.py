import scrapy, sys, json
from scrapy.crawler import CrawlerProcess

links= []
class Spider2(scrapy.Spider):
    name = "kry"

    def __init__(self, arg):
        self.arg = arg

    def start_requests(self):
        url = f"https://kryinternational.com/?s={self.arg}"
        yield scrapy.Request(url, callback=self.parse, dont_filter=True)

    def parse(self, response):
        global links
        links= response.css('.post-title a').css('a::attr(href)').getall()
            

process = CrawlerProcess()            
process.crawl(Spider2, sys.argv[1])            
process.start()
print(json.dumps(links))