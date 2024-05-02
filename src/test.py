from bs4 import BeautifulSoup
import requests
import time
import datetime
import smtplib
url = "https://www.amazon.com.br/Pomada-Capilar-Walk-QOD-Barber/dp/B071Y2M2MV?pd_rd_w=FXA9U&content-id=amzn1.sym.b974940a-622b-4945-b512-cd56c1eeca7a&pf_rd_p=b974940a-622b-4945-b512-cd56c1eeca7a&pf_rd_r=HE13ZFSM90AX17870AV2&pd_rd_wg=zeRfd&pd_rd_r=23c018a0-d626-4ed8-89a1-629700f00a91&pd_rd_i=B071Y2M2MV&psc=1&ref_=pd_bap_d_grid_rp_0_1_ec_pd_gwd_bag_pd_gw_rp_1_i"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0"}

page = requests.get(url, headers=headers)

soup1 = BeautifulSoup(page.content, "html.parser")
print(soup1)
