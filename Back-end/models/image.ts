import { Sequelize, 
    DataTypes, 
    Model, 
    Optional, 
    Association} from "sequelize";
import {sequelize} from './index';	

interface imageAttribute {
    title: string;
    path: string;
    imageName: string;
} 


export class Image extends Model<imageAttribute>{
    

    public readonly createdAt!: Date;  
    public readonly updatedAt!: Date
    
    public static associations: { 
            
    };
}
Image.init({
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    path: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    imageName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    

}, {modelName : 'Image',
    tableName : 'Image',
    sequelize,
    freezeTableName : true,
    })