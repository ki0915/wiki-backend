import { File } from '../../models/file';

console.log("======Create users Table======");
const create_table_user = async() => {
    await File.sync({force : true})
    .then(() => {
        console.log("✅Success Create document Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create document Table : ", err);
    })
}

create_table_user();