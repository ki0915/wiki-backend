import {
    DataTypes, 
    Model, 
} from "sequelize";
import {sequelize} from './index';	

interface ArticleAttribute {
    title: string,
    article1: string;
    article2: string;
    article3: string;
    article4: string;
    article5: string;
    article6: string;
    onetitle: string;
    twotitle: string;
    threetitle: string;
    fourtitle: string;
    fivetitle: string;
    sixtitle: string;
} 


export class Article extends Model<ArticleAttribute>{
    

    public readonly createdAt!: Date;  
    public readonly updatedAt!: Date
    
    public static associations: { 
            
    };
}

Article.init({
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    article1: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    article2: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    article3: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    article4: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    article5: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    article6: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    onetitle: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    twotitle: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    threetitle: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    fourtitle: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },

    fivetitle: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },

    sixtitle: {
        type: DataTypes.STRING(40),
        allowNull: false,
    } 
}, {modelName : 'Aritcle',
    tableName : 'Aritcle',
    sequelize,
    freezeTableName : true,
    })