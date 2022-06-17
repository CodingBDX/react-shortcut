import axios from 'axios';



export default async function getLink(linkURL,link) {
  try {
    // GET/POST: https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html
    const linkFormatter = `${linkURL}?url=${link}`;
    const res = await axios.get(linkFormatter, {
      header: {
        Accept: 'application/json',
      }

    })
    return res;
  } catch (e) {
    console.log(`${e} error during fetch`)
  }
  
  
}
