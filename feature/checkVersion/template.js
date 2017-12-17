const templateHtml = (text) => `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Modular Dependency Check list</title>
      <link rel="stylesheet" href="bulma.css">
      <style>
      </style>
    </head>
    <body>
      <section class="hero is-dark is-bold is-medium" style="background-color: #1f2739;  background-image: none;">
        <div class="hero-body">
          <div class="container">
            <h1 class="title" style="color: #ffeb3b;">
              Modular
            </h1>
            <h2 class="subtitle" style="color: #e91e63;">
              Dependency check list
            </h2>
           ${text}
          </div>
        </div>
      </section>
    </body>
  </html>
`
// tone color
// #ff3c41
// #fcd000
// #46aadb
// #323c50

module.exports = templateHtml