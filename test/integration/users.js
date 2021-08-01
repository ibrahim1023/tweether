const UserStorage = artifacts.require("UserStorage");
const UserController = artifacts.require("UserController");

const { assertVMException } = require('../utils');

contract('users', () => {

    let controller, userStorage;

    before(async () => {
        controller = await UserController.deployed();
        userStorage = await UserStorage.deployed();
    })

    describe('Testing User...', () => {
        describe('success', () => {
            it('can create user with controller', async () => {

                const username = web3.utils.fromAscii('ibrahim');
                const firstName = web3.utils.fromAscii('Ibrahim');
                const lastName = web3.utils.fromAscii('Arshad');

                const tx = await controller.createUser(username, firstName, lastName, "I love blockchain", "example@example.com");

                assert.isOk(tx);
            });

            it('can get user', async () => {
                const userStorage = await UserStorage.deployed();
                const userId = 1;

                const userInfo = await userStorage.profiles.call(userId);
                const username = web3.utils.toAscii(userInfo[1]).replace(/\u0000/g, '');

                assert.equal(username, "ibrahim")
            });
        })

        describe('failure', () => {
            it("can't create user without controller", async () => {
                try {
                    const username = web3.utils.fromAscii('ibrahim');
                    const firstName = web3.utils.fromAscii('Ibrahim');
                    const lastName = web3.utils.fromAscii('Arshad');

                    await userStorage.createUser(0x0, username, firstName, lastName, "I love blockchain", "example@example.com");

                    assert.fail();
                } catch (err) {
                    assertVMException(err)
                }
            })
        })
    })
})