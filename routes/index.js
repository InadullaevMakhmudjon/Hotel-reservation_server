import hotel from '../controllers/hotel';

export default app => {
    app.io.on('connection', socket => {
        console.log('A user successfully connected');
        hotel({ io: app.io, socket });
    })
}