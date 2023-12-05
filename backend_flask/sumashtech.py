import requests, sys
q= sys.argv[1] 
product_list = []
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
print(product_list)