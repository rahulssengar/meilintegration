import styles from '../styles/Home.module.css'
import { MeiliSearch } from 'meilisearch'
import movies from '../movie.json'
import meteorites from '../meteorites.json'

export default function Home({feed}) {
    //const image = JSON.stringify(feed)
    return (
        <body>
            <div className={styles.container}>
                <div className={styles.container}>
                    <div className={styles.title}>Hello MeiliSearch!!!</div>
            </div>
            </div>
      </body>
    )
}
  
export const getStaticProps = async () => {
    const client = new MeiliSearch({
        host: 'http://127.0.0.1:7700',
        apiKey: 'masterKey',
        })

        // An index is where the documents are stored.
        // const index = client.index('movies2')

        // If the index 'movies' does not exist, Meilisearch creates it when you first add the documents.
        // let response = await index.addDocuments(movies);
        //console.log(response);

        // let status = client.getTask(5);
        
        // Meilisearch is typo-tolerant:
        // const search = await index.search('Judgment Night')
        // console.log(search)

        // const health = client.health();
        // console.log(health);
        client.index('meteorites').addDocuments(meteorites);
        // console.log(meteorites);

        client.index('meteorites').updateSettings({
            filterableAttributes: ['mass', '_geo'],
            sortableAttributes: ['mass', '_geo']
          })
          
        // Search Meteorites filtering out meteorites greater than equal to 200
        client.index('meteorites').search('', { filter: 'mass < 200' }).then((res) => console.log(res))
            


          
        

    return {
        props: {
        //feed,
        }
    }
}