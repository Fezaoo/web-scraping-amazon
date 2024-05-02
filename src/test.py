from bs4 import BeautifulSoup
import requests
import time
import datetime
import smtplib

try:
    url = "https://www.amazon.com/Funny-Data-Systems-Business-Analyst/dp/B07FNW9FGJ"
    headers = ({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0", 'Accept-Language': 'en-US, en;q=0.5'})
    page = requests.get(url, headers=headers) 
    stt = page.status_code
except requests.exceptions.RequestException as e:
    print(f'Ocorreu um erro: {e}')
else:
    soup1 = BeautifulSoup(page.content, "html.parser")
    soup2 = BeautifulSoup(soup1.prettify(), "html.parser")
    print(soup2)
    title = soup2.find(id='productTitle')
    price = soup2.find(id="corePriceDisplay_desktop_feature_div")
    if title:
        title = title.get_text().strip()
        price = price.get_text().strip()
        print(title)
        print(price)
    else:
        print("Título não encontrado")
print(stt)