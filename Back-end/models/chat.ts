import {
    DataTypes, 
    Model, } from "sequelize";
import {sequelize} from './index';	

interface ChatAttribute {
    roomTitle: string;
    senderId: string;
    message: string;
} 


export class Chat extends Model<ChatAttribute>{
    
    

    public readonly createdAt!: Date;  
    public readonly updatedAt!: Date
    
    public static associations: { 
            
    };
    roomTitle: any;
    senderId: any;
    message: any;
}

Chat.init({
    roomTitle: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    senderId: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, 



    {modelName : 'Chat',
    tableName : 'Chat',
    sequelize,
    freezeTableName : true,
    });



