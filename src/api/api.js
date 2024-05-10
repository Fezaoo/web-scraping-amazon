const axios = require('axios');
const cheerio = require('cheerio');

async function fetchData(query, limit = 4) {
    try {
        // Parâmetros
        query = query.replace(' ', '+');
        
        // URL e Headers
        const base_url = 'https://www.amazon.com';
        const url = `${base_url}/s?k=${query}`;
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0',
            'Accept-Language': 'en-US, en;q=0.5'
        };

        // Requisição à página da Amazon com a query passada
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);

        // Obtém os links dos produtos
        const links = [];
        $('a.a-link-normal.s-no-outline').each((index, element) => {
            links.push($(element).attr('href'));
            if (index + 1 >= limit) return false;
        });

        const data_response = [];
        // Obtém o conteúdo e informações de cada produto mostrado na página de pesquisa
        for (const link of links) {
            const new_response = await axios.get(`${base_url}${link}`, { headers });
            const $$ = cheerio.load(new_response.data);
            const title = $$('#productTitle').text().trim();
            const price = $$('.aok-offscreen').first().text().trim().split(' ')[0] || $$('.a-price').first().text().trim().split(' ')[0];
            const rating = $$('#acrPopover').text().trim().split(' ')[0];
            const image = $$('#imgTagWrapperId img').attr('src') || $$('.image-wrapper img').attr('src');
            
            data_response.push({
                title,
                price,
                rating,
                link: `${base_url}${link}`,
                image
            });
        }

        return data_response;
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
        throw new Error('Erro ao processar a requisição');
    }
}

// Exemplo de uso:
// fetchData('chave', 1).then(data => console.log(data)).catch(error => console.error(error));

module.exports = fetchData;
