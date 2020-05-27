'use strict';

const { MongoClient } = require('mongodb')
const assert = require('assert')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

const saltRounds = 10

require('dotenv').config();

const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
})

const signinHandler = async (req, res) => {
    const { email, password } = req.body
    console.log('pang')
    await client.connect();
    const db = client.db('pang');
    await db.collection('users')
        .findOne({email: email}, (err, result1) => {
            if(result1) {
                bcrypt.compare(password, result1.password, (err, result2) => {
                    if (result2 == true) {
                        res.status(200).json({status: 200, data: result1})
                    } else {
                        res.status(400).json({status: 400, message: 'PASSWORD INCORRECT'}) 
                    }
                })
            } else {
                res.status(400).json({status:400, message: 'INVALID EMAIL'})
            }
        })
}

const addUserToDatabase = async (user) => {
    try {
        await client.connect();
        const db = client.db('pang');
        const r = await db.collection('users').insertOne(user);
        assert.equal(1, r.insertedCount);
        console.log('user added to database')
    } catch (error) {
        console.log(error.stack)
    }
}

const signupHandler = async (req, res) => {
    const { email, password, confirm, name, username } = req.body;
    await client.connect();
    const db = client.db('pang');

    db.collection('users').findOne({email:email}, (err, result) => {
        if (result) {
            res.status(400).json({status: 400, message: 'ERROR: EMAIL ALREADY IN USE'}); 
        }
    })

    if (password !== confirm) {
        res.status(400).json({status: 400, message: 'ERROR: PASSWORDS DO NOT MATCH'});
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            const data = {
                _id: shortid.generate(),
                email: email, 
                password: hash, 
                name: name, 
                username: username,
                posts: [],
                following: [],
                followedBy: [], 
                avatar: null,
                wardrobe: [],
                lookbook: [],
            }
            addUserToDatabase(data)
            res.status(200).json({status: 200, data: data})
        })
    })
}

const postHandler = async (req, res) => { //takes user_id, body, img <optional>, interactedby, comments {_id, link, username, description}
    console.log(req.body,'CONSOLE LOG REQ BODY')
    const {imgURL, description, user_id, username} = req.body;
    const data = {
        user_id: user_id,
        username: username,
        imgURL: imgURL,
        description: description,
        comments: [],
        date: new Date(),
        _id: shortid()
    }
    try {
        await client.connect()
        const db = client.db('pang');
        const r = await db.collection('posts').insertOne(data)
        assert.equal(1, r.insertedCount)
        console.log('post added to database')
        res.status(200).json({status:200, body: data})
    } catch (error) {
        console.log(error.stack)
        res.status(400).json({status:400})
    }
}

const readHandler = async (req, res) => {
    const userId = req.params._id;
    console.log(userId)
    const resData = []
    await client.connect()
    const db = client.db('pang');
    try { 
        await db.collection('users').findOne({_id: userId }, (err, result) => {
            console.log(result.following)
            console.log(result.following == [])
            if(result.following.length) {
                console.log('pangy')
                const following = result.following;
                following.forEach(user => {
                    db.collection('posts').find({user_id: user})
                    .toArray((err, result) => { 
                        result.forEach(post => {
                            resData.push(post)
                        }) 
                    })
                })
            }
            db.collection('posts').find({user_id: userId})
            .toArray((err, result) => {
                console.log(result, 'your posts')
                result.forEach(post => {
                    resData.push(post)
                })
                res.status(200).json({status: 200, data: resData.sort((a, b) => b.date - a.date)})
            })
        })
    } catch (error) {
        console.log(error.stack)
    }
}

const userFetchHandler = async (req, res) => {
    const _id = req.params._id;
    await client.connect();
    const db = client.db('pang');
        await db.collection('users').findOne({_id: _id}, (err, result) => {
        if(result) {
            res.status(200).json({status:200, data: result});
        } else {
            res.status(400).json({status:404, message: 'user does not exist!'})
        }
    })
}

const changeAvatarHandler = async (req, res) => {
    const {imgURL, user_id} = req.body;
    await client.connect();
    const db = client.db('pang');
    await db.collection('users').update({_id: user_id}, {$set : {avatar:imgURL}}, (err, result) => {
        if (result) {
            res.status(200).json({status: 200, data: result})
        } else {
            res.status(400).json({status: 400, message:'ERROR'})
        }
    })
}

const followHandler = async (req, res) => {
    const _id = req.params._id;
    const userId = req.params.userId;

    await client.connect();
    const db = client.db('pang');
    await db.collection('users').update({_id: _id}, {$push : { followedBy : userId}}, (err, result) => {
        if (result) {
            db.collection('users').update({_id: userId}, {$push : { following : _id}}, (err, result) => {
                if (result) {
                    res.status(200).json({status:200, data: result})
                } else {
                    res.status(400).json({status: 400, message: 'User Not Found'})
                }
            })
        } else {
            res.status(400).json({status: 400, message: 'User Not Found'})
        }
    })
}

const unfollowHandler = async (req, res) => {
    const _id = req.params._id;
    const userId = req.params.userId;
    await client.connect();
    const db = client.db('pang');
    await db.collection('users').update({_id: _id}, {$pull : { followedBy : userId}}, (err, result) => {
        if(result) {
            console.log('working')
            db.collection('users').update({_id: userId}, {$pull : { following : _id}}, (err, result) => {
                if (result) {
                    res.status(200).json({status: 200, data: result})
                } else {
                    res.status(400).json({status: 400, message: 'Error user not found'})
                }
            })
        } else {
            res.status(400).json({status: 400, message: 'ERROR USER NOT FOUND'})
        }
    })
}


const wardrobeHandler = async (req, res) => {
    const {_id, imgURL, link, brand, itemName} = req.body;
    console.log(_id)
    const itemId = shortid.generate();
    await client.connect();
    const db = client.db('pang')
    await db.collection('users').updateOne({_id: _id}, {$push : {wardrobe : {itemId: itemId, imgURL: imgURL, link : link, brand : brand, itemName : itemName}}}, (err, result) => {
        if (result) {
            db.collection('users').findOne({_id: _id}, (err, result) => {
                res.status(200).json({status: 200, data: result.wardrobe})
            })
        } else {
            res.status(400).json({status: 400, message: 'ERROR USER NOT FOUND'})
        }
    })
}

const viewerHandler = async (req, res) => {
    const type = req.params.type;
    const userId = req.params.userId;
    const albumId = req.params.albumId

    await client.connect();
    const db = client.db('pang');
    await db.collection('users').findOne({_id: userId}, (err, result) => {
        if(result) {
            if(type === 'lookbook') {
                result.lookbook.forEach(book => {
                    if (book.lookbookId === albumId) {
                        res.status(200).json({status: 200, data: book})
                    } else {
                        res.status(400).json({status: 400, message: 'ERROR ALBUM NOT FOUND'})
                    }
                })
            } else if (type === 'wardrobe'){
                if (result.wardrobe) {
                    res.status(200).json({status:200, data: result.wardrobe});
                } else {
                    res.status(400).json({status: 400, message: 'ERROR ALBUM NOT FOUND'})
                }
            }
        }
    })
}

const lookbookHandler = async (req, res) => {
    console.log('pang')
    const {user_id, name, lookbook} = req.body;
    const lookbookId = shortid.generate();
    await client.connect();
    const db = client.db('pang');
    await db.collection('users').updateOne({_id: user_id}, {$push : { lookbook : {name: name, lookbookId: lookbookId, looks: lookbook}}}, (err, result) => {
        if (result) {
            db.collection('users').findOne({_id: user_id}, (err, result) => {
                console.log(result)
                res.status(200).json({status: 200, data: result.lookbook})
            })
        } else {
            res.status(400).json({status: 400, message: 'ERROR USER NOT FOUND'})
        }
    })
}

const commentHandler = async (req, res) => {
    const {link, username, itemName, postId, userId, brand, imgURL, description} = req.body
    const commentBody = {
        username: username,
        link: link,
        itemName: itemName,
        userId: userId,
        brand: brand,
        imgURL: imgURL,
        description: description
    }
    console.log(commentBody)
    console.log(postId)
    await client.connect();
    const db = client.db('pang')
    await db.collection('posts').findOne({_id: postId}, (err, result) => {
        console.log(result)
    })
    await db.collection('posts').updateOne({_id: postId}, {$push : { comments : {username: username, link: link, itemName: itemName, userId: userId, brand: brand, imgURL: imgURL, description: description, link:link}}}, (err, result) => {
        if (result) {
            res.status(200).json({status:200, data: result})
        } else {
            res.status(400).json({status:400, message:'something went wrong'})
        }
    })
}

const deleteWardrobeHandler = async (req, res) => {
    const {itemId, _id} = req.body;
    await client.connect();
    const db = client.db('pang');
    await db.collection('users').findOne({_id: _id}, (err, result) => {
        result.wardrobe.forEach((item, index) => {
            if(item.itemId === itemId) {
                result.wardrobe.splice(index, 1);
                db.collection('users').updateOne({_id: _id}, {$set : {wardrobe: result.wardrobe}}, (err, result2) => {
                    console.log(result2)
                    res.status(200).json({status: 200, data: result.wardrobe})
                })
            }
        })
    })
}

const deleteLookbookHandler = async (req, res) => {
    const {lookbookId, _id} = req.body;
    await client.connect();
    const db = client.db('pang');
    await db.collection('users').findOne({_id : _id}, (err, result) => {
        result.lookbook.forEach((book, index) => {
            if (book.lookbookId === lookbookId) {
                result.lookbook.splice(index, 1);
                db.collection('users').updateOne({_id:_id}, {$set : {lookbook: result.lookbook}}, (err, result2) => {
                    console.log(result2)
                    res.status(200).json({status: 200, data: result.lookbook}) 
                })
            }
        })
    })
}

const exploreHandler = async (req, res) => {
    console.log('pang')
    await client.connect();
    const db = client.db('pang');
    await db.collection('posts')
    .find()
    .toArray((err, result) => {
        const onlyImages = result.filter(item => item.imgURL)
        if(onlyImages) {
            res.status(200).json({status: 200, data: onlyImages})
        } else {
            res.status(400).json({status: 400, message: 'ERROR RETRIEVING POSTS'})
        }
    })
}

const individualPostHandler = async (req, res) => {
    const postId = req.params.postId;
    await client.connect();
    const db = client.db('pang');
    await db.collection('posts')
    .findOne({_id:postId}, (err, result) => {
        if (result) {
            res.status(200).json({status: 200, data: result})
        } else {
            res.status(400).json({status: 400, message: 'ERROR POST NOT FOUND'})
        }
    })
}

module.exports = { viewerHandler, commentHandler, individualPostHandler, exploreHandler, wardrobeHandler, deleteWardrobeHandler, deleteLookbookHandler, lookbookHandler, followHandler, unfollowHandler, signinHandler, signupHandler, postHandler, readHandler, userFetchHandler, changeAvatarHandler};