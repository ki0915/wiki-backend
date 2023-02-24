import { Sequelize, 
    DataTypes, 
    Model, 
    Optional, 
    Association} from "sequelize";
import {sequelize} from './index';	

interface UsertAttribute {
    id: string,
    password: string;
    authority: number;
} 


export class User extends Model<UsertAttribute>{
    
    public static associations: { 
        
    };
}

    User.init({
    id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    authority: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }

}, {modelName : 'User',
    tableName : 'User',
    sequelize,
    freezeTableName : true,
    })