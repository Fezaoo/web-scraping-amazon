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
    try:
        url = f"https://www.amazon.com/{query}"
        headers = ({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0", 'Accept-Language': 'en-US, en;q=0.5'})
        page = requests.get(url, headers=headers) 
    except requests.exceptions.RequestException as e:
        print(f'Ocorreu um erro: {e}')
    else:
        soup1 = BeautifulSoup(page.content, "html.parser")
        soup2 = BeautifulSoup(soup1.prettify(), "html.parser")
        title = soup2.find(id='productTitle')
        price = soup2.find('span', attrs= {'class': 'aok-offscreen'})
        rating = soup2.find(id="acrPopover")
        if title:
            title = title.get_text().strip()
            price = price.get_text().split()[0]
            price = price.strip()
            rating = rating.find('span', attrs={'class':'a-size-base'})
            rating = rating.get_text().strip()
            return jsonify({'title': title,
                    'price': price,
                    'rating': rating
                    })
        else:
            print("Título não encontrado")
            return None

if __name__ == '__main__':
    app.run(debug=True)
