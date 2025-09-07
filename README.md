# 🌦️ Weather App

## Descrição do Projeto

Uma aplicação moderna de previsão do tempo desenvolvida com Angular, oferecendo uma interface intuitiva e responsiva para consulta de condições meteorológicas em tempo real.

### Funcionalidades Principais

- **Busca de Localização**: Pesquise cidades e obtenha informações meteorológicas precisas
- **Previsão Atual**: Detalhes meteorológicos em tempo real
- **Previsão Estendida**: Visualização da previsão para os próximos dias
- **Animações Climáticas**: Ícones e animações interativas representando condições meteorológicas
- **Design Responsivo**: Interface adaptável para dispositivos móveis e desktop

### Tecnologias Utilizadas

- **Frontend**: Angular 19
- **Linguagem**: TypeScript
- **Estilização**: CSS
- **Gerenciamento de Estado**: RxJS
- **Testes**: Jasmine, Karma
- **Deploy**: Vercel

### 🛠️ Pré-requisitos

- Node.js (v20+)
- npm (v10+)
- Angular CLI

### 🔧 Configuração do Ambiente

1. **Clonar o Repositório**
```bash
git clone https://github.com/seu-usuario/weather-app.git
cd weather-app
```

2. **Instalar Dependências**
```bash
npm install
```

3. **Configurar Variáveis de Ambiente**
- Crie um arquivo `.env` na raiz do projeto
- Use `.env.example` como referência
- Adicione suas chaves de API:
  ```
  GEOCODING_API_KEY=sua_chave_aqui
  WEATHER_API_KEY=sua_chave_aqui
  ```

### 🌐 APIs Utilizadas

1. **Geocoding API**
   - Fonte: API Ninjas
   - Função: Conversão de nomes de cidades para coordenadas geográficas

2. **Weather API**
   - Fonte: Google Weather API
   - Função: Obtenção de dados meteorológicos detalhados

### 🖥️ Executando o Projeto

**Desenvolvimento**:
```bash
npm start
```
<img width="1103" height="505" alt="image" src="https://github.com/user-attachments/assets/d9941c00-fc65-4aa9-b59b-92c6f1cfb6e8" />


- Acesse: `http://localhost:4200`



**Produção**:
```bash
npm run build:prod
```

### 🧪 Executando Testes

**Testes Unitários**:
```bash
npm test
```

<img width="1004" height="960" alt="image" src="https://github.com/user-attachments/assets/dd613adf-d5e0-4ab0-9dd2-351d8da11dd0" />


**Cobertura de Testes**:
```bash
npm run test:coverage
```

### 📦 Build

```bash
npm run build
```
- Arquivos de build serão gerados em `dist/demo`

### 🤝 Contribuição

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

###  Autor

[Seu Nome]
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Nome](https://www.linkedin.com/in/seu-usuario)

### 🚨 Avisos Importantes

- Certifique-se de não commitar chaves de API
- Use variáveis de ambiente para configurações sensíveis
- Verifique os requisitos de uso das APIs utilizadas

---

