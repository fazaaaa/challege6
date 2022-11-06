const { User_history } = require('../models');

module.exports = {
    createUH: async ( req, res, next) => {
        try {
            const { user_id, hasilAkhir, ratinguser,waktu } = req.body;

            const userH = await User_history.findOne({ where : {hasilAkhir : hasilAkhir}});
            if(userH){
                return res.status(200).json({
                    status: false,
                    message: 'Result already used!'
                });
            }    
                const userHi = await User_history.create({
                    user_id,
                    hasilAkhir,
                    ratinguser,
                    waktu
                });
                return res.status(200).json({
                    status: true,
                    message: 'success',
                    data : {
                        hasilAkhir: userHi.hasilAkhir,
                        ratinguser: userHi.ratinguser
                    }
                });
        } catch (err) {
            next(err)
        }
    },
    updateH: async(req, res, next) => {
        try {
            const { user_id, hasilAkhir, ratinguser,waktu } = req.body

            const userup = await User_history.findone({ where : {hasilAkhir: hasilAkhir }});
            if (userup){
                return res.status(400).json({
                    status: false,
                    message: 'already exist'
                });
            }
            const userHi = await User_history.create({
                user_id,
                hasilAkhir,
                ratinguser,
                waktu
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
                    hasilAkhir: userHi.hasilAkhir,
                    ratinguser: userHi.ratinguser,
                    waktu: userHi.waktu
                }
            });
        } catch (err) {
            next(err)
        }
    },
    delete: async (res, req, next) => {
        try {
            const { id } = req.body;

            const user = await User_history.destroy({
                where: {
                    id
                }
            });

            return re.status(200).json({
                status: true,
                message: 'success',
                data: {
                    hasilAkhir: user.hasilAkhir,
                    ratinguser: user.ratinguser,
                    waktu: user.waktu
                }
            });
        } catch (err) {
            next(err);
        }
    }
}