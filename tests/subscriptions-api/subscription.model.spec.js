var app = require('./../../server.js'), 
    SubscriptionModel = require('./../../app/models/subscription.model'),
    subscription,
    id,
    deleteID,
    updateID,
    edit,
    posts,
    tags;

describe('SubscriptionModel Unit Test:', function () {
  // body...
  beforeEach(function (done) {
    // body...
    subscription = new SubscriptionModel({
      author: 'aTamsSokari',
      post: {
        title: "trial post"
      }
    });
    id = '5536248ccd3ec28814ed988b';
    updateID = '553623057674b86a142965b4';
    edit = {
      post: {
        title: 'how about a change',
        comments: true,
        edits: false
      }
    };
    deleteID = '553623ddea4e0f7d148ff36e';
    done();
    posts = {post: {$ne: {
      edits: false,
      comments: false,
      title: 'Not a Post Subscription'
    } } };
    tags = {post: {$ne: {
      title: 'Not a Tag Subscription'
    } } };
  });
  describe('Save Subscription - ', function () {
    // body...
    
    it('should save without problems', function (done) {
      // body...
      subscription.save(function(error){
        expect(error).toBeNull();
        done();
      });

    });

  });

  describe('Get Subscriptions - ', function () {
    // body...

    it('should get all Subscriptions', function (done) {
      // body...
      SubscriptionModel.find(function (error, Subscriptions) {
        // body...
        expect(error).toBeNull();
        expect(Subscriptions).toBeTruthy();
        done();
      });
    });
  });

  describe('Get One Subscription - ', function () {
    // body...

    it('should get one subscription', function (done) {
      // body...
      SubscriptionModel.findById(id, function (error, subscriptions) {
        // body...
        expect(error).toBeNull();
        expect(subscriptions).toBeTruthy();
        done();
      });
    });
  });

  describe('Edit One Subscription - ', function () {
    // body...

    it('should get one subscription and edit content', function (done) {
      // body...
      SubscriptionModel.findByIdAndUpdate(updateID, edit, function (error, subscriptions) {
        // body...
        expect(error).toBeNull();
        expect(subscriptions).toBeTruthy();
        done();
      });
    });
  });


  describe('Get All Post Subscriptions -', function () {
    // body...
    it('should find all post subscriptions (not default)', function(done){
      SubscriptionModel.find(posts, function(error, posts) {
        expect(error).toBeNull();
        expect(posts).toBeTruthy();
        done();
      });
    });
  });

  describe('Get All Tag Subscriptions -', function () {
    // body...
    it('should find all tag subscriptions (not default)', function(done){
      SubscriptionModel.find(tags, function(error, tags) {
        expect(error).toBeNull();
        expect(tags).toBeTruthy();
        done();
      });
    });
  });

  describe('Find Subscriptions Belonging to a User - ', function() {
    it('it should get all subscriptions with a particular username', function(done) {
      SubscriptionModel.find({author: 'aTamsSokari'}, {_id: 0, __v: 0, tag: 0}, function(error, subscriptions) {
        expect(error).toBeNull();
        expect(subscriptions).toBeDefined();
        console.log(subscriptions);
        done();
      });
    });
  });

  describe('Delete One Subscription - ', function () {
    // body...

    it('should get one subscription and delete it', function (done) {
      // body...
      SubscriptionModel.findByIdAndRemove(deleteID, function (error, subscription) {
        // body...
        expect(error).toBeDefined();
        console.log('Subscription with id: ' + deleteID + ' has been deleted');
        expect(subscriptions).not.toBeTruthy();
        done();
      });
    });
  });


});