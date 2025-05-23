## 🚀 **POC com Nginx: Servindo Arquivos Estáticos e Reverse Proxy**

### 📌 **Descrição**

O **Nginx** é um dos servidores web mais utilizados no mundo. Ele é amplamente adotado para:

- Servir arquivos estáticos (HTML, CSS, JS, imagens, etc.)
- Atuar como **proxy reverso**, direcionando requisições para outros serviços, como APIs

---

### 📂 **Servindo HTML Estático com Docker**

Por padrão, o Nginx utiliza o seguinte diretório para armazenar e servir arquivos de páginas web:

```bash
/usr/share/nginx/html
```

Para rodar rapidamente um container Nginx servindo conteúdo customizado, execute:

```bash
docker run -it --rm -d -p 8080:80 --name web \
  -v ~/site-content:/usr/share/nginx/html \
  nginx
```

Isso mapeia o diretório `~/site-content` da sua máquina para o caminho padrão do Nginx.

### ⚙️ **nginx.conf e Reverse Proxy**

A configuração do Nginx é feita por meio do arquivo `nginx.conf`. Abaixo, um exemplo básico de configuração para:

- Servir uma aplicação frontend (como React)
- Redirecionar chamadas para uma API específica usando proxy reverso

```
server { 
  listen 80;
  server_name frontend;

  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }

  location /services/m {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://backend:8080/services/m;
    proxy_ssl_session_reuse off;
    proxy_set_header Host $http_host;
    proxy_cache_bypass $http_upgrade;
    proxy_redirect off;
  }
}
```

---

### 🔁 **Balanceamento de Carga com Múltiplas Réplicas**

Exemplo de configuração para distribuir requisições entre múltiplas instâncias de um backend (load balancing com `least_conn`):

```
upstream api_backend {
  least_conn;
  server api:3000;
  server api-replica:3000;
}

server {
  listen 80;
  server_name localhost;

  location / {
    root /usr/share/nginx/html;
    index index.html;
  }

  location /api/ {
    proxy_pass http://api_backend/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### 🧪 **Executando o POC**

Clone o repositório contendo a POC completa:

```bash
git clone https://github.com/HanselVinicius/routing-poc.git
cd routing-poc
```

Para iniciar a aplicação, execute:

```bash
docker compose up --build
```

### 📊 **Comportamento Esperado**

Ao acessar a rota `api/product/${sku}`, o Nginx atuando como load balancer redireciona a requisição para uma das instâncias disponíveis de forma balanceada:

> A cada requisição, o Nginx distribui a carga entre os containers do backend, otimizando o desempenho e disponibilidade.
> 

![image.png](attachment:eb93a678-32ee-4e8a-b22e-1270e56ee71e:image.png)