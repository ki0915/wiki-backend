import { 
    DataTypes, 
    Model} from "sequelize";
import {sequelize} from './index';	

interface FileAttribute {
    title: string;
    path: string;
    fileName: string;
} 


export class File extends Model<FileAttribute>{
    

    public readonly createdAt!: Date;  
    public readonly updatedAt!: Date
    
    public static associations: { 
            
    };
}

File.init({
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    path: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    fileName: {
        type: DataTypes.STRING(300),
        allowNull: false,
    }
    

}, {modelName : 'File',
    tableName : 'File',
    sequelize,
    freezeTableName : true,
    })