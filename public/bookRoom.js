async function fillRooms() {
    let select = document.getElementById("room");

    let fetchdata = await fetch("http://localhost:4000/rooms");
    let response = await fetchdata.json();
    let rooms = response.data;

    for (let room of rooms) {
        let option = document.createElement("option");
        option.innerHTML = room.name;
        option.value = room._id;
        select.appendChild(option);
    }
}

fillRooms();

async function bookRoom() {
    let customername = document.getElementById("customername").value;
    let [startdate, starttime] = (document.getElementById("startdate").value).split("T");
    let [enddate, endtime] = (document.getElementById("enddate").value).split("T");
    let roomid = document.getElementById("room").value;

    let body = {
        customername,
        startdate,
        starttime,
        enddate,
        endtime,
        roomid
    }

    let postData = await fetch("http://localhost:4000/bookings", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    let response = await postData.json();
    if (response.status === 200) {
        alert("booking successful");
        window.location.href = "/index.html"
    } else {
        alert("booking failed");
    }

}