import { Document } from '../../models/document';

console.log("======Create users Table======");
const create_table_document = async() => {
    await Document.sync({force : true})
    .then(() => {
        console.log("✅Success Create document Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create document Table : ", err);
    })
}

create_table_document();