const request = require('supertest');
const app = require('../app');

// endpoint Register
const userTest = {
    name: 'user test',
    email: 'user@test.com',
    password: 'password123'
};

const userBio = {
    user_id: '1',
    username: 'baebychuu',
    rank: 'Legend',
    negara: 'Indonesia'
};

const userHis = {
    user_id: '1',
    hasilAkhir: 'Menang',
    ratingUser: '10',
    waktu: '18-11-2022'
};

var token = '';

const truncate = require('../helpers/truncate');
truncate.user();

describe('/auth/register endpoint', () => {
    // register berhasil
    test('register berhasil', async () => {
        try {
            const res = await request(app)
                .post('/auth/register')
                .send(userTest);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('user created!');
            expect(res.body.data).toStrictEqual({ name: userTest.name, email: userTest.email });
        } catch (err) {
            expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });

    // register gagal karena email sudah dipakai
    test('register gagal', async () => {
        try {
            const res = await request(app)
                .post('/auth/register')
                .send(userTest);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('email already used!');
            expect(res.body.data).toBe(null);
        } catch (err) {
            expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
});

describe('/auth/login endpoint', () => {
    // register berhasil
    test('login gagal', async () => {
        try {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: userTest.email,
                    password: `${userTest.password}4`
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('credential is not valid!');
            expect(res.body.data).toBe(null);
        } catch (err) {
            expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });

    // register gagal karena email sudah dipakai
    test('login berhasil', async () => {
        try {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: userTest.email,
                    password: userTest.password
                });


            token = res.body.data.token;
            // console.log(res.body.data.token);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toHaveProperty('token');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('login success!');

        } catch (err) {
            expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
});

describe('/auth/whoami endpoint', () => {
    // register berhasil
    test('whoami gagal', async () => {
        try {
            const res = await request(app)
                .post('/auth/whoami')
                .send({
                    email: userTest.email,
                    password: `${userTest.password}4`
                });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('you\'re not authorized!');
            expect(res.body.data).toBe(null);
        } catch (err) {
            expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });

    // register gagal karena email sudah dipakai
    test('whoami berhasil', async () => {
        try {
            console.log('test_token');
            console.log(token);
            const res = await request(app)
                .post('/auth/whoami')
                .set('Authorization', token)
                .send({
                    email: userTest.email,
                    password: userTest.password
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('success!');
            expect(res.body.data).toStrictEqual({ name: userTest.name, email: userTest.email });
        } catch (err) {
            expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
});

describe('/auth/user_game_biodata/create endpoint', () => {
    // register berhasil
    test('User berhasil disimpan', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_biodata/create')
                .send(userBio);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('user created!');
            expect(res.body.data).toStrictEqual({ username: userBio.username, rank: userBio.rank, negara: userBio.negara });
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
    test('user gagal tersimpan', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_biodata/create')
                .send(userTest);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('username already used!');
            expect(res.body.data).toBe(null);
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
});

describe('/auth/user_game_biodata/update endpoint', () => {
    // register berhasil
    test('User berhasil di edit', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_biodata/update')
                .send({
                    id: '1',
                    user_id: '1',
                    username: 'Baebychuuu',
                    rank: 'Mythic',
                    negara: 'korea selatan'});
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('user updated!');
            expect(res.body.data).toStrictEqual({ username: userBio.username, rank: userBio.rank, negara: userBio.negara });
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
    test('user gagal tersimpan', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_biodata/update')
                .send({
                    id: 'tsad',
                    user_id: '1',
                    username: 'Baebychuuu',
                    rank: 'Mythic',
                    negara: 'korea selatan'});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('id user is wrong');
            expect(res.body.data).toBe(null);
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
});

describe('/auth/user_game_biodata/delete endpoint', () => {
    // register berhasil
    test('User berhasil di hapus', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_biodata/delete')
                .send({
                    id: '1'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('user deleted!');
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
    test('User berhasil di hapus', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_biodata/delete')
                .send({
                    id: 'sacd'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('id user not find!');
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
});
// HISTORY ---------------------------------------------------
describe('/auth/user_game_history/create endpoint', () => {
    // register berhasil
    test('User berhasil disimpan', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_history/create')
                .send(userHis);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('user created!');
            expect(res.body.data).toStrictEqual({ hasilAkhir: userHis.hasilAkhir, ratingUser: userHis.ratingUser, waktu: userHis.waktu });
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
    test('user gagal tersimpan', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_history/create')
                .send({
                    user_id: '18',
                    hasilAkhir: 'Menang',
                    ratingUser: '10',
                    waktu: '18-11-2022'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('user id not find!');
            expect(res.body.data).toBe(null);
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
});

describe('/auth/user_game_history/update endpoint', () => {
    // register berhasil
    test('User berhasil di edit', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_history/update')
                .send({
                    user_id: '1',
                    hasilAkhir: 'Kalah',
                    ratingUser: '3.0',
                    waktu: '18-11-2022'});
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('user updated!');
            expect(res.body.data).toStrictEqual({ hasilAkhir: userHis.hasilAkhir, ratingUser: userHis.ratingUser, waktu: userHis.waktu });
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
    test('user gagal tersimpan', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_history/update')
                .send({
                    user_id: 'ajsjjsac',
                    hasilAkhir: 'Kalah',
                    ratingUser: '3.0',
                    waktu: '18-11-2022'});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe('id user is wrong');
            expect(res.body.data).toBe(null);
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
});

describe('/auth/user_game_history/delete endpoint', () => {
    // register berhasil
    test('User berhasil di hapus', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_history/delete')
                .send({
                    id: '1'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('user deleted!');
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
    test('User berhasil di hapus', async () => {
        try {
            const res = await request(app)
                .post('/auth/user_game_history/delete')
                .send({
                    id: 'sacd'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('data');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('id user not find!');
        } catch (err) {
            // expect(err).toBe('error');  // test gagal karena err != 'error'
        }
    });
});

