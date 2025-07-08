import {Schema, model} from 'mongoose'; 

const schemaUser = new Schema ({
    name: {type: String, required: true, trim: true},
    email: { type: String, 
        required: true,
        trim: true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "invalid email"]
    },    
    password: {type: String, required: true},
    username: {type: String, required: true},
    pfPicture: {type: String, required: true},
});
 
export default model ('user', schemaUser);

