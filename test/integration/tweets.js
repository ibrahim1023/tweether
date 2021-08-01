const TweetStorage = artifacts.require("TweetStorage");
const TweetController = artifacts.require("TweetController");
const UserController = artifacts.require("UserController");

const { assertVMException } = require('../utils')

contract('tweets', () => {

    let tweetController, userController, tweetStorage;

    before(async () => {
        userController = await UserController.deployed();
        tweetStorage = await TweetStorage.deployed();
        tweetController = await TweetController.deployed();

        const username = web3.utils.fromAscii('ibrahim');
        const firstName = web3.utils.fromAscii('Ibrahim');
        const lastName = web3.utils.fromAscii('Arshad');

        await userController.createUser(username, firstName, lastName, 'I love blockchain', 'example@example.com');
    })

    describe('Testing Tweets...', () => {
        describe('success', function() {
            it('can create tweet with controller', async () => {

                const tx = await tweetController.createTweet("Hello world!");
                assert.isOk(tx);
            });

            it('can get tweet', async () => {
                const tweet = await tweetStorage.tweets.call(1);
                const { id, text, userId } = tweet;

                assert.equal(parseInt(id), 1);
                assert.equal(text, 'Hello world!');
                assert.equal(parseInt(userId), 1);
            });

            it('can get all tweets IDs from user', async () => {
                const userId = 1;
                
                const ids = await tweetStorage.getTweetIdsFromUser.call(userId);
                const expectedTweetId = 1;

                assert.isOk(Array.isArray(ids));
                assert.equal(ids[0], expectedTweetId);
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