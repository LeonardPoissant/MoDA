const router = require('express').Router();

const {viewerHandler ,commentHandler, individualPostHandler, exploreHandler, deleteWardrobeHandler, wardrobeHandler, unfollowHandler, deleteLookbookHandler, lookbookHandler, followHandler, changeAvatarHandler, signinHandler, signupHandler, postHandler, readHandler, userFetchHandler } = require('./handlers')

router.post('/api/signup', signupHandler)

router.post('/api/post', postHandler)

router.post('/api/signin', signinHandler)

router.get('/api/post/:postId', individualPostHandler)

router.get('/api/viewer/:type/:albumId/:userId', viewerHandler)

router.get('/api/explore', exploreHandler)

router.get('/api/read/:_id', readHandler)

router.get('/api/user/:_id', userFetchHandler)

router.put('/api/newcomment', commentHandler)

router.put('/api/newlookbook', lookbookHandler)

router.put('/api/deletelookbook', deleteLookbookHandler)

router.put('/api/user/follow/:_id/:userId/', followHandler)

router.put('/api/user/unfollow/:_id/:userId/', unfollowHandler)

router.put('/api/user/avatar', changeAvatarHandler)

router.put('/api/newwardrobe', wardrobeHandler)

router.put('/api/deletewardrobe', deleteWardrobeHandler)

module.exports = router;

