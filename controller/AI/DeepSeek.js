const { response } = require("express");

class DeepSeek {

    constructor(){
        this.prompt = "Genera un libro de texto, donde debes poner el contenido en un JSON; tu respuesta no debe incluir nada más que solo el JSON con los siguientes campos: 'isbn' es un texto alfanumérico de entre 16 caracteres sin guiones ni espacios DEBE SER UNICO Y RANDOM,'img' que es un campo donde siempre debes incluir este valor 'https://i.pinimg.com/736x/93/e4/eb/93e4ebab2bddef8f1af7d4988419234f.jpg', 'title' es el campo que contien el título de el libro ficticio,autor_license: aqui siempre debes poner el valor de 'AI-DEEPSEEK', 'editorial' es una editorial ficticia para el libro, 'pages' el número de páginas, 'year' es un año real no mayor al actual, 'genre' es el género del libro ficticio, 'language' es el idioma del libro ficticio, 'format' puede ser entre PDF, DOC, TXT, FISICO o COPIA, 'sinopsis' es la sinopsis de tu libro ficticio, 'content' es el contenido del libro que debe ser un texto que coincida con las características anteriores";
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