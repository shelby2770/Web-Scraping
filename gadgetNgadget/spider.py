import scrapy, sys, requests, json
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
        prices = []
        lst = []
        for i in range(0, len(priceWithBugs), 3):
            prices.append(priceWithBugs[i][1:])
        links = list(set(response.css('.product-gallery-item-content a').css('a::attr(href)').getall()))
        for i in range(len(images)):
            d = {"shop_img": shop_img, "device_img": images[i], "model": models[i], "price": [prices[i]],
                 "link": links[i]}
            product_list.append(d)


class Spider2(scrapy.Spider):
    name = "kry"

    def __init__(self, arg):
        self.arg = arg

    def start_requests(self):
        url = f"https://kryinternational.com/?s={self.arg}"
        yield scrapy.Request(url, callback=self.parse1, dont_filter=True)

    def parse1(self, response):
        cards = response.css('.product-type-simple')
        self.shop_img = response.css('.retina-logo').css('img::attr(src)').get()
        for i, j in enumerate(cards):
            url = j.css('a::attr(href)').extract_first()
            self.last_img = j.css('img::attr(src)').get()
            yield scrapy.Request(url, callback=self.parse2, dont_filter=True)

    def parse2(self, response):
        global product_list
        d = {"shop_img": self.shop_img, "device_img": self.last_img,
             "model": response.css('.show-product-nav::text').get(),
             "price": [response.css('.single-product-price bdi::text').get()], "link": str(response)[5:-1]}
        product_list.append(d)


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
                 "price": [cards[i].css('.text-primary::text').get()[2:-1]], "links": cards[i].css('a::attr(href)').get()}
            product_list.append(d)


def sumash_tech(q):
    global product_list
    url = f"https://api.sumashtech.com/api/filter-query?dynamic_filter=&format=json&page=1&query={q}&root=true"
    shop_img = "https://sumashtech.com/_ipx/w_200&f_webp/sumashtech-logo.webp"
    r = requests.get(url)
    data = dict(r.json())

    for item in data["results"]["products"]:
        d = {"shop_img": shop_img, "device_img": item["card_image"], "model": item["name"],
             "price": [item["price"], item["discount_price"]] if item["discount_price"] else [item["price"]]}
        slug = item["slug"]
        d["link"] = f"https://sumashtech.com/product/{slug}"
        product_list.append(d)


n= len(sys.argv)
q = ""
for i in range(1,n):
    if i==1:
        q+= sys.argv[i]
    else:
        q+= "+"+sys.argv[i]

process = CrawlerProcess()
process.crawl(Spider1, q)
process.crawl(Spider2, q)
process.crawl(Spider3, q)
process.start()
sumash_tech(q)
# print(*product_list, sep='\n')
print(json.dumps(product_list))