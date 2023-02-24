import { Sequelize, 
    DataTypes, 
    Model, 
    Optional, 
    Association} from "sequelize";
import {sequelize} from './index';	

interface DocumentAttribute {
    title: string,
    firstWriter: string;
    firstWrite: string;
    lastUpdate: string;
} 


export class Document extends Model<DocumentAttribute>{
    
    public readonly createdAt!: Date;  
    public readonly updatedAt!: Date

    public static associations: { 
        
    };
}

Document.init({
    title: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    firstWriter: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    firstWrite: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastUpdate: {
        type: DataTypes.STRING(30),
        allowNull: false
    },   

}, {modelName : 'Document',
    tableName : 'Document',
    sequelize,
    freezeTableName : true,
    })