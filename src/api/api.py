from flask import Flask, jsonify, request
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests
import time
import datetime
import smtplib

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Habilita o CORS para todas as rotas

@app.route('/api/dados')
def dados():
    query = request.args.get('query')
    query = query.replace(' ', '+')
    try:
        base_url = 'https://www.amazon.com'
        url = f'{base_url}/s?k={query}'
        headers = ({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0", 'Accept-Language': 'en-US, en;q=0.5'})
        page = requests.get(url, headers=headers)
    except requests.exceptions.RequestException as e:
        print(f'Ocorreu um erro: {e}')
    else:
        soup1 = BeautifulSoup(page.content, 'html.parser')
        soup2 = BeautifulSoup(soup1.prettify(), 'html.parser')
        links = soup2.find_all('a', attrs={'class':'a-link-normal s-no-outline'})
        link_list = list()
        c = 0
        for link in links:
            link_list.append(link.get('href'))
            if c >= 3: break
            c+=1

        data_response = []
        for link in link_list:
            new_page = requests.get(f'{base_url}{link}', headers=headers)
            soup1 = BeautifulSoup(new_page.content, 'html.parser')
            soup2 = BeautifulSoup(soup1.prettify(), 'html.parser')
            title = soup2.find('span', attrs= {'id':"productTitle"})
            price = soup2.find('span', attrs={'class':"aok-offscreen"})
            rating = soup2.find(id="acrPopover")
            if title:
                title = title.get_text().strip()
            if price:
                price = price.get_text().strip()
                price = price.split()[0]
            if rating:
                rating = rating.get_text().strip()
                rating = rating.split()[0]
            data_response.append(            
                {'title': title,
                    'price': price,
                    'rating': rating,
                    'link': base_url + link,
            })
        return jsonify(data_response)

if __name__ == '__main__':
    app.run(debug=True)
