import { Chat } from '../../models/chat';

console.log("======Create users Table======");
const create_table_chat = async() => {
    await Chat.sync({force : true})
    .then(() => {
        console.log("✅Success Create document Tables");
    })
    .catch((err) => {
        console.log("❗️Error in Create document Tables : ", err);
    })
} 
//chat make
create_table_chat();
