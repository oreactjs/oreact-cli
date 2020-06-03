const Purgecss = require('purgecss');
const helpers = require('./helpers');
const fs = require('fs');

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
    static extract(content)
    {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

const purgecss = new Purgecss({
    content   : [helpers.cwdResolve('src/**/*.js')],
    css       : [helpers.cwdResolve('src/app/styles/tailwind.css')],
    whitelist : ["pl-24", "pl-40", "pl-56", "pl-72", "pl-80"],
    extractors: [
        {
            extractor : TailwindExtractor,
            extensions: ["html", "js"]
        }
    ]
});

const result = purgecss.purge();

result.forEach(out => {
    fs.writeFileSync(helpers.cwdResolve(out.file), out.css, 'utf-8');
});

