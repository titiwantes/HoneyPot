const axios = require('axios');
const countryFlagEmoji = require("country-flag-emoji");
const Fs = require('fs')
const Path = require('path')
const config = require('../../config/config').config
const pages = require('../../config/config').pages;

const getFileUrl = (url) => {
    const file = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    let result = url.match(file)
    if (result) return result[0]
    return ''
}

const writeInfos = (txt, output) => {
    Fs.writeFile(output, txt, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
}

const getFile = (url, output) => {

    const writer = Fs.createWriteStream(output)
    if (url) {
        axios({
            method: 'GET',
            url : url,
            responseType: 'stream'
        }).then(res => {
            res.data.pipe(writer)
            return new Promise((resolve, reject) => {
                writer.on('finish', resolve)
                writer.on('error', reject)
              })
        }).catch(err => {
            console.log(err)
        })
    }    
}

const getInfosIp = async (ip) => {
    //ip = '203.10.99.76'
    let location = {}
    let data = ['country', 'countryCode', 'region', 'regionName', 'city', 'zip', 'lat', 'lon', 'timezone', 'isp', 'org', 'as']
    try{
        const res = await axios.get('http://ip-api.com/json/'+ip)

        location['countryFlag'] = countryFlagEmoji.get(res.data.countryCode).emoji
        data.forEach(element => {
            location[element] = res.data[element]
        });
        return location
    } catch(err) {
        console.log(err)
    }
    return location
}



exports.getInfos = async(req, res) => {

    const pageUrl = pages.find((e) => req.url.includes(e.url))

    if (pageUrl){
        const {protocol, originalUrl, hostname, ip} = req;
        console.log(protocol, originalUrl, hostname, ip)    
        let infosIp = await getInfosIp(ip.split(':').slice(-1))
        const date = Date.now().toString()
        const fileUrl =  getFileUrl(originalUrl)
    
        if (infosIp) {
            const data = {date: date, data: infosIp, file: fileUrl}
            writeInfos(JSON.stringify(data, null, 2), config.ips_dir + date)
        }
    
        let file = getFile(fileUrl, config.files_dir + date)
        res.send(pageUrl.page)
    } else {
        res.send('Page not found')
    }
    
}


