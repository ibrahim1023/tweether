const TweetStorage = artifacts.require("TweetStorage");
const TweetController = artifacts.require("TweetController");

const { assertVMException } = require('../utils')

contract('tweets', () => {

    let controller, tweetStorage;

    before(async () => {
        tweetStorage = await TweetStorage.deployed();
        controller = await TweetController.deployed();
    })

    describe('Testing Tweets...', () => {
        describe('success', function() {
            it('can create tweet with controller', async () => {

                const tx = await controller.createTweet(1, "Hello world!");
                assert.isOk(tx);
            });


            it('can get tweet', async () => {
                const tweet = await tweetStorage.tweets.call(1);
                const { id, text, userId } = tweet;

                assert.equal(parseInt(id), 1);
                assert.equal(text, 'Hello world!');
                assert.equal(parseInt(userId), 1);
            });
        });

        describe('failure', function() {
            it("can't create tweet without controller", async () => {
                const storage = await TweetStorage.deployed();

                try {
                    const tx = await storage.createTweet(1, 'ibrahim');
                    assert.fail();
                } catch (err) {
                    assertVMException(err)
                }
            })
        });
    })
})