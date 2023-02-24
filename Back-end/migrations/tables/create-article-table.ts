import { Article } from '../../models/article';

console.log("======Create users Table======");
const create_table_article = async() => {
    await Article.sync({force : true})
    .then(() => {
        console.log("✅Success Create document Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create document Table : ", err);
    })
}

create_table_article();