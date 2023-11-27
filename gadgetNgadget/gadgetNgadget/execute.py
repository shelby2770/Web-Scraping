from scrapy import cmdline
command= "cd gadgetNgadget; scrapy crawl spider1 -a my_argument=Iphone"
cmdline.execute(command.split())