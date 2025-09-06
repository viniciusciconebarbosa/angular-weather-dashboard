# Previsão do Tempo

Aplicação de previsão do tempo desenvolvida com Angular, oferecendo animações climáticas e interface moderna.

## Configuração do Ambiente

🖥️ [Aplicaçao Frontend](https://angular-weather-seven.vercel.app/)
## APIs Necessárias

Esta aplicação requer duas APIs:

1. **API Ninja Geocoding** - Para busca de localizações
   - Registre-se em [API Ninja](https://api-ninjas.com/)
   - Obtenha sua chave de API gratuita

2. **Google Weather API** - Para dados de previsão do tempo
   - Configure o [Google Cloud Console](https://console.cloud.google.com/)
   - Habilite a API Weather
   - Crie uma chave de API


Existem duas maneiras de configurar as variáveis de ambiente neste projeto:

### Opção 1: Usando arquivos environment.ts

1. Copie o arquivo de exemplo de ambiente:
   ```bash
   npm run setup-env
   ```
   Ou manualmente:
   ```bash
   cp src/environment.example.ts src/environment.ts
   cp src/environment.example.ts src/environment.prod.ts
   ```

2. Edite os arquivos `src/environment.ts` e `src/environment.prod.ts` para incluir suas chaves de API:
   ```typescript
   export const environment = {
     production: false, // use true para environment.prod.ts
     geocodingApiKey: 'SUA_CHAVE_API_GEOCODING',
     weatherApiKey: 'SUA_CHAVE_API_WEATHER',
     geocodingApiUrl: 'https://api.api-ninjas.com/v1/geocoding',
     weatherApiUrl: 'https://weather.googleapis.com/v1/forecast/days:lookup',
     defaultDays: 10
   };
   ```

### Opção 2: Usando arquivo .env (Recomendado)

1. Crie um arquivo `.env` na raiz do projeto:
   ```bash
   touch .env
   ```

2. Adicione suas variáveis de ambiente no arquivo `.env`:
   ```
   GEOCODING_API_KEY=SUA_CHAVE_API_GEOCODING
   WEATHER_API_KEY=SUA_CHAVE_API_WEATHER
   GEOCODING_API_URL=https://api.api-ninjas.com/v1/geocoding
   WEATHER_API_URL=https://weather.googleapis.com/v1/forecast/days:lookup
   DEFAULT_DAYS=10
   ```

> **Importante**: Os arquivos `environment.ts`, `environment.prod.ts` e `.env` estão no `.gitignore` para evitar expor suas chaves de API no repositório. Nunca compartilhe ou cometa esses arquivos.


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
npm run build
```

## Recursos

- Previsão do tempo atual e para os próximos dias
- Animações climáticas interativas
- Interface responsiva e moderna
- Busca de localizações por nome
- Armazenamento da última localização pesquisada 
