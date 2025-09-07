# Previsão do Tempo

Aplicação de previsão do tempo desenvolvida com Angular, oferecendo animações climáticas e interface moderna.

🖥️ [Aplicação Frontend](https://angular-weather-dashboard.vercel.app/)

## APIs Necessárias

Esta aplicação requer duas APIs:

1. **API Ninja Geocoding** - Para busca de localizações
   - Registre-se em [API Ninja](https://api-ninjas.com/)
   - Obtenha sua chave de API gratuita

2. **Google Weather API** - Para dados de previsão do tempo
   - Configure o [Google Cloud Console](https://console.cloud.google.com/)
   - Habilite a API Weather
   - Crie uma chave de API

## Configuração das Variáveis de Ambiente

### Para Desenvolvimento Local

1. **Crie um arquivo `.env` na raiz do projeto:**
   ```bash
   cp .env.example .env
   ```

2. **Adicione suas chaves de API no arquivo `.env`:**
   ```env
   GEOCODING_API_KEY=sua_chave_aqui
   WEATHER_API_KEY=sua_chave_aqui
   ```

### Para Deploy na Vercel/Netlify

Configure as mesmas variáveis no dashboard da plataforma:
- `GEOCODING_API_KEY`
- `WEATHER_API_KEY`
- `GEOCODING_API_URL` (opcional)
- `WEATHER_API_URL` (opcional)
- `DEFAULT_DAYS` (opcional)

> **⚠️ IMPORTANTE**: O arquivo `.env` está no `.gitignore` para proteger suas chaves de API. Nunca commite chaves de API para o repositório!

## Instalação

```bash
npm install
```

## Execução em Desenvolvimento

```bash
npm start
```

## Build para Produção

```bash
npm run build:prod
```

## Recursos

- Previsão do tempo atual e para os próximos dias
- Animações climáticas interativas
- Interface responsiva e moderna
- Busca de localizações por nome
- Armazenamento da última localização pesquisada 
