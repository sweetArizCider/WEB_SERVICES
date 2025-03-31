const { response } = require("express");

class DeepSeek {

    constructor(){
        this.prompt = "Genera un libro de texto, donde debes poner el contenido en un JSON; tu respuesta no debe incluir nada más que solo el JSON con los siguientes campos, ESTRICTAMENTE NO ESCRIBAS NADA MAS: 'isbn' es un texto alfanumérico ESTRICTAMENTE DE 16 caracteres sin guiones ni espacios DEBE SER UNICO Y RANDOM POR FAVOR ASEGURATE QUE SEA MUY RANDOM PARA QUE NO SEA IGUAL A NINGUNO DE MI BASE DE DATOS Y SIEMPRE QUE TE PIDA QUE GENERES UN LIBRO GENERA UN NUEVO isbn,'img' que es un campo donde siempre debes incluir este valor 'https://libreria-y5ka.onrender.com/img/deepseek.webp', 'title' es el campo que contien el título de el libro ficticio pero estrictamente unico, por favor piensa muy bien el titulo,autor_license: aqui siempre debes poner el valor de 'AI-DEEPSEEK', 'editorial' es una editorial ficticia para el libro, 'pages' el número de páginas, 'year' es un año real no mayor al actual, 'genre' es el género del libro ficticio, 'language' es el idioma del libro ficticio puede ser español o ingles, 'format' puede ser entre PDF, DOC, TXT, FISICO o COPIA, 'sinopsis' es la sinopsis de tu libro ficticio, 'content' es el contenido del libro que debe ser un texto que coincida con las características anteriores";
    }

    async createBook () {
        return fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.AI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'deepseek/deepseek-chat-v3-0324:free',
              messages: [
                {
                  role: 'user',
                  content: `${this.prompt}`,
                },
              ],
            }),
          })
          .then(response => response.json())
          .then(response => response.choices[0].message.content)
          .catch(error => console.log('Error:', error));
    }

    cleanAIResponse (response) {
        const regex = /```json\n|```/g
        const cleanedResponse = response.replace(regex, '').trim();

        try{
            const json = JSON.parse(cleanedResponse);
            return json;
        } catch (error){
            console.log('Error parsing JSON:', error);
            return null;
        }
    }
}

module.exports = DeepSeek;