// const next = require("next");

// // note the "https" not "http" required module. You will get an error if trying to connect with https
// const https = require("https");
// // const { parse } = require("url");

// const fs = require("fs");

// const hostname = "localhost";
// const port = 5086;
// const dev = true;

// const app = next({ dev, hostname, port });

// const sslOptions = {
//   key: fs.readFileSync("/etc/ssl/domain/sangaraahi.org/ssl.key"),
//   cert: fs.readFileSync("/etc/ssl/domain/sangaraahi.org/sangaraahi_org.crt"),
//   ca: [
//     fs.readFileSync(
//       "/etc/ssl/domain/sangaraahi.com/api/api_sangaraahi_net.ca-bundle"
//     ),
//   ],
// };

// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = https.createServer(sslOptions, (req, res) => {
//     // custom api middleware
//     if (req.url.startsWith("/api")) {
//       return handle(req, res);
//     } else {
//       // Handle Next.js routes
//       return handle(req, res);
//     }
//   });
//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log("> Ready on https://localhost:" + port);
//   });
// });

const next = require("next");
const https = require("https");
const fs = require("fs");

const hostname = "localhost";
const port = process.env.PORT;
const dev = true;

const app = next({ dev, hostname, port });

const sslOptions = {
  key: process.env.NEXT_HTTPS_KEY,
  cert: process.env.NEXT_HTTPS_CERT,
  ca: process.env.NEXT_HTTPS_BUNDLE,
};

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = https.createServer(sslOptions, (req, res) => {
    // Remove the 'ch-ua-form-factor' feature from the Permissions-Policy header
    res.setHeader("Permissions-Policy", "camera=(), microphone=()");

    // custom api middleware
    if (req.url.startsWith("/api")) {
      return handle(req, res);
    } else {
      // Handle Next.js routes
      return handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log("> Ready on https://localhost:" + port);
  });
});
