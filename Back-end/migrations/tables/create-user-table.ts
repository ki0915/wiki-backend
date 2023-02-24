import { User } from '../../models/user';

console.log("======Create users Table======");
const create_table_user = async() => {
    await User.sync({force : true})
    .then(() => {
        console.log("✅Success Create document Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create document Table : ", err);
    })
}

create_table_user();