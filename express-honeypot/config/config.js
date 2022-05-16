  exports.config = {
    files_dir: './files/',
    ips_dir: './ip/'
}

const pageData = ({title, description, content}) => {
    return `
    <!DOCTYPE html>
    <html lang="bee">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="${description}">
          <meta name="title" content="${title}">
        </head>
        <body>
          <title>${title} : ${description}</title>
          <h1>${title}</h1>
          <h2>${description}</h2>
          <nav><a href="../">Home</a></nav>
          <h3>${content}</h3>
          <div style="padding:15px;">
          </div>
          <h3>${content}</h3>
          <div style="padding:15px;">
          </div>
          <div style="padding:15px;">
          </div>
        </body>
    </html>`;
  };


exports.pages = [
    {
        url: '/web/?path%5Bdocroot%5D=',
        page: pageData({title: 'web', description: 'web page', content:''})
    },
    {
        url: '/phphtml.php?htmlclass_path=',
        page: pageData({title: 'phphtml.php', description: 'phphtml', content:''})
    },
    {
        url: '/test',
        page: pageData({title: 'test', description: 'test', content:''})
    }
]
