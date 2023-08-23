class userDao {

    constructor(db){
        this.db = db;
    }
    async findAll(){
        await req.db.collection('users').find({is_deleted: {$exists:false}}).toArray()
    }
}