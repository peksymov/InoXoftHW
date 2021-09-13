const { User, OAuth } = require('./database');
const SUPER_ADMIN = require('./configs/user.role.enum');
const passwordService = require('./services/password.services');
const jwtService = require('./services/jwt.service');

module.exports = {
    createSuperPuperAdmin: async () => {
        const passwordForSuperAdmin = await passwordService.hash('superAdminForever');

        try {
            const tokenPairForSuperAdmin = jwtService.generateTokenPair();

            const superAdmin = await User.create({
                name: SUPER_ADMIN,
                email: 'petro@gmail.com',
                role: 'superAdmin',
            password: passwordForSuperAdmin,
            });
            await OAuth.create({ ...tokenPairForSuperAdmin, user: superAdmin._id });
            return superAdmin;
        } catch (e) {
            console.log('ERROR --- createSuperPuperAdmin');
        }
    }
};
