import hotels from '../data/hotels.json';

export default ({ io, socket }) => {
    
    socket.on('requestUsers', hotelName => socket.emit('getUsers', hotels));
    // Authontication
    socket.on('Authorize', hotelID => {
        const isExist = hotels.find(hotel => hotel.CustomID == hotelID);
        if(isExist) {
            socket.emit('Authorize', isExist);
        } else {
            socket.emit('senderror', 'Hotel id is not correct');
        }
    });
    // Submiting form
    socket.on('formSubmit', user => {
        hotels.map(hotel => {
            if(hotel.id === user.hotelId){
                hotel.forms.push(user);
            }
            return hotel;
        });
        socket.broadcast.emit('getUsers', hotels);
    });
    // Gets a hotel
    socket.on('requestAHotel', hotelId => {
        socket.emit('getAHotel', hotels.find(({ id }) => id == hotelId));
    });
    // Sends all hotels
    socket.on('requestAllHotels', () => socket.emit('getAllHotels', hotels));
}