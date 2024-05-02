from bs4 import BeautifulSoup
import requests
import time
import datetime
import smtplib

def amazon():
    try:
        url = "https://www.amazon.com/Fitness-Pressure-Pedometer-Waterproof-Smartwatches/dp/B0CQ56R4DS/ref=sr_1_1?_encoding=UTF8&content-id=amzn1.sym.33f8f65b-b95c-44af-8b89-e59e69e79828&dib=eyJ2IjoiMSJ9.5yqF3zrGtNJfKinuFxLEOhORze-mWDa-WCJVSyC_Si47Osa1nZCJTB8N73BhE5xK0lk_uJn8SB4SlR72XGqqf9vTmLj3EnneCBCTSl_8yO5WSw3pW4TQW3h6_lM7uGp9WKhUH2r0BT8KSJqmeaBUGgPudplr4F9UB3zP4mHTrKCsxmrIsTU0a34VYmMedYk7cnhNF4ZdOBDuGlG5clgRUDOW5z-VzcIct_IITUiodZk.HNWuL2ewqtyIX6WmGKvYYt71PhBoVxxTmU7hV1q3ZUc&dib_tag=se&keywords=activity+trackers+and+smartwatches&pd_rd_r=abb35193-3b65-4bee-a5c0-a6ec091c35cd&pd_rd_w=DFkCr&pd_rd_wg=BpK5E&pf_rd_p=33f8f65b-b95c-44af-8b89-e59e69e79828&pf_rd_r=T4DAXV2WH75DNTC063FK&qid=1714656798&sr=8-1"
        headers = ({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0", 'Accept-Language': 'en-US, en;q=0.5'})
        page = requests.get(url, headers=headers) 
    except requests.exceptions.RequestException as e:
        print(f'Ocorreu um erro: {e}')
    else:
        soup1 = BeautifulSoup(page.content, "html.parser")
        soup2 = BeautifulSoup(soup1.prettify(), "html.parser")
        print(soup2)
        title = soup2.find(id='productTitle')
        price = soup2.find('span', attrs= {'class': 'aok-offscreen'})
        rating = soup2.find(id="acrPopover")
        if title:
            title = title.get_text().strip()
            price = price.get_text().strip()
            rating = rating.find('span', attrs={'class':'a-size-base'})
            rating = rating.get_text().strip()
            print(title)
            print(price)
            print(rating)
            return {'title': title,
                    'price': price,
                    'rating': rating
                    }
        else:
            print("Título não encontrado")
            return None