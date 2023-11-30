import scrapy

class Spider1(scrapy.Spider):
    name = "spider1"

    # start_urls = [
    #     f"https://gngbd.com/product/search?search={s}"
    # ]

    def start_requests(self):
        s = getattr(self, 'my_argument', None)
        url = f"https://gngbd.com/product/search?search={s}"
        yield scrapy.Request(url, callback=self.parse)

    def parse(self, response):
        img = response.css('div.product-img img::attr(src)').getall()
        model = response.css('.product-gallery-item-content h4::text').extract()
        priceWithBugs = response.css('.product-gallery-item-content span::text').extract()
        price = []
        lst = []
        for i in range(0, len(priceWithBugs), 3):
            price.append(priceWithBugs[i][1:])
        for i in range(len(img)):
            lst.append((img[i], model[i], price[i]))
        # print(len(img),len(model),len(price))
        # print("Hastalavista")
        returned_str = ""
        for i in lst:
            returned_str += f"{i[0]}|||{i[1]}|||{i[2]}\n"
        print(returned_str)
