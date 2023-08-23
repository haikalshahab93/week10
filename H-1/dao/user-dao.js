class userDao {

    constructor(db){
        this.db = db;
    }
    async findAll(){
        return db.collection('users').find({is_deleted: {$exists:false}}).toArray()
    }

    async create ({username,email}){
        return db.collection('users').insertOne({username,email})
    }

    async update ({id,username,email}){
        return db.collection('users').find({is_deleted: {$exists:false}}).toArray()
    }

    async delete ({id}){
        return db.collection('users').findOneAndUpdate({ _id: new ObjectId(id)} , {$set : {is_deleted:true}})
    }
}