async function fillTable() {
    let tbody = document.getElementById("tbody");

    let fetchdata = await fetch("http://localhost:4000/bookings");
    let response = await fetchdata.json();
    let bookings = response.data;

    for (let booking of bookings) {
        let fetchrooms = await fetch("http://localhost:4000/rooms");
        let res = await fetchrooms.json();
        let rooms = res.data;
        let roomname = (rooms.filter(room => room._id === booking.roomid))[0].name;
        let tr = document.createElement('tr');

        let td1 = document.createElement("td");
        td1.innerHTML = booking.customername;
        let td2 = document.createElement("td");
        td2.innerHTML = roomname;
        let td3 = document.createElement("td");
        td3.innerHTML = `${booking.startdate} ${booking.starttime}`;
        let td4 = document.createElement("td");
        td4.innerHTML = `${booking.enddate} ${booking.endtime}`;

        tr.append(td1, td2, td3, td4);
        tbody.appendChild(tr);
    }

}

fillTable();