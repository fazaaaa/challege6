const { User_biodata } = require('../models');

module.exports = {
    createB: async (req, res, next) => {
        try {
            const { user_id, username, rank, negara } = req.body;
            
            const userB = await User_biodata.findOne({ where: { username: username }});
            if (userB){
                return res.status(409).json({
                    status: false,
                    message: 'username already used!'
                });
            }
            const userBi = await User_biodata.create({
                user_id,
                username,
                rank,
                negara
            });

            return res.status(200).json({
                status: true,
                message: 'success',
                data : {
                    username: userBi.username,
                    rank: userBi.rank,
                    negara: userBi.negara
                }
            });
        } catch (err) {
            next(err);
        }
    },
    updateB: async (req, res, next) => {
        try {
            const { id, user_id, username, rank, negara } = req.body

            const userup = await User_biodata.findone({ where : {username: username }});
            if (userup){
                return res.status(400).json({
                    status: false,
                    message: 'already exist'
                });
            }
            const userBi = await User_biodata.create({
                user_id,
                username,
                rank,
                negara
            },
            {
                where: {
                    id
                }
            });
            return res.status(200).json({
                status: true,
                message: 'success',
                data : {
                    username: userBi.username,
                    rank: userBi.rank,
                    negara: userBi.negara
                }
            });
        } catch (err) {
            
        }
    },
    delete: async (res, req, next) => {
        try {
            const { id } = req.body;

            const user = await User_biodata.destroy({
                where: {
                    id
                }
            });

            return re.status(200).json({
                status: true,
                message: 'success',
                data: {
                    username: user.username,
                    rank: user.rank,
                    negara: user.negara
                }
            });
        } catch (err) {
            next(err);
        }
    }
}