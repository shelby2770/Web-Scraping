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
        cards = response.css('.product-gallery-item-content')
        for i, j in enumerate(cards):
            d = {"shop_img": shop_img, "device_img": images[i], "model": j.css('h4::text').get(),
                 "price": [j.css('span::text').get()[1:]], "link": j.css('a').css('a::attr(href)').get()}
            if j.css('del::text').get():
                d["price"].append(j.css('del::text').get()[1:])
            product_list.append(d)


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

        if response.css('.single-product-price del bdi::text').get():
            d["price"].append(response.css('.single-product-price ins bdi::text').get())
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
                 "price": [cards[i].css('.text-primary::text').get()[2:-1]], "link": cards[i].css('a::attr(href)').get()}
            if cards[i].css('.mr-1::text').get():
                d["price"].append(cards[i].css('.mr-1::text').get()[1:])
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


q = sys.argv[1]
process = CrawlerProcess()
process.crawl(Spider1, q)
# process.crawl(Spider2, q)
process.crawl(Spider3, q)
process.start()
sumash_tech(q)
print(json.dumps(product_list))