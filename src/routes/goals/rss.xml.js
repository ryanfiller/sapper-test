import { default as config } from '../../_config.js'
import fetch from 'node-fetch'


const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

const BASE_URL = config.SITE_URL

export function get(req, res) {
	res.writeHead(200, {
		'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
		// 'Content-Type': 'application/rss+xml'
		'Content-Type': 'text/xml'
  })

	fetch('http://localhost:3000/goals.json')
		.then(r => r.json())
		.then(items => {
			res.end(`<?xml version="1.0" encoding="UTF-8" ?>
      <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
          <title>
            Sapper Test
          </title>
          <link>
            ${BASE_URL}
          </link>
          <description>
            A Test of Sapper
          </description>
          ${items.map(item => `
            <item>
              <title>${entities.encode(item.title)}</title>
              <link>${BASE_URL}/item/${item.id}</link>
              <content:encoded>${entities.encode(item.html)}</content:encoded>
            </item>
          `).join('\n')}
        </channel>
      </rss>`)
		})
		.catch(error => console.log(error))
}