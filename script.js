const form = document.querySelector(".form");
const inputText = document.querySelector(".text");
const inputTime = document.querySelector(".time");
const addBtn = document.querySelector(".btn");
const menu = document.querySelector(".menu");
const template = document.querySelector(".list-template").content;
const list = template.querySelector(".list");
const URL = "https://shoh-4b5ed-default-rtdb.firebaseio.com/";
const loader = document.querySelector(".loader");

// const info = [
//     {
//         id: 1,
//         title: "Choy ichaman",
//         time: "07:00",
//     },
//     {
//         id: 2,
//         title: "Ishga ketaman",
//         time: "08:00",
//     },
//     {
//         id: 2,
//         title: "Abet qilaman",
//         time: "13:00",
//     },
// ];


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = inputText.value.trim();
    const time = inputTime.value;
    if (title && time) {
        try {
            loader.classList.add("block")
            await fetch(URL + "todo.json", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body:JSON.stringify({
                    title: title,
                    time: time,
                }),
            }); 
            GET_INFO(URL + "todo.json")
            loader.classList.remove("block");
            inputText.value = "";
            inputTime.value = ""; 
        } catch (error) {
            loader.classList.remove("block");
            console.log(error);
        } finally {
            console.log("har doim ishlidi bu FINALLY");
        }
    };
});


const GET_INFO = async function (link) {
    try {
        loader.classList.add("block");
    const response = await fetch(link);
    const data = await response.json();
    menu.innerHTML = "";
    console.log("get method");

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            const listClone = list.cloneNode(true);
        const textList = listClone.querySelector(".text-list");
        const timeList = listClone.querySelector(".time-list");
        
        textList.textContent = element.title;
        timeList.textContent = element.time;
        menu.appendChild(listClone);
        } 
    }
        
        loader.classList.remove("block");
    } catch (error) {
        loader.classList.remove("block");
        console.log(error);
    }
};

window.addEventListener("load",  GET_INFO(URL + "todo.json"));

// Object.keys(data).forEach((elem) => {
//     console.log(elem);
//     const listClone = list.cloneNode(true);
//     const textList = listClone.querySelector(".text-list");
//     const timeList = listClone.querySelector(".time-list");
        
//     textList.textContent = data[elem].title
//     timeList.textContent = data[elem].time
        
//     menu.appendChild(listClone);
// });


// const renderInfo = function () {
//     info.forEach((elem) => {
//         const listClone = list.cloneNode(true);
//         const textList = listClone.querySelector(".text-list");
//         const timeList = listClone.querySelector(".time-list");

//         textList.textContent = elem.title
//         timeList.textContent = elem.time

//         menu.appendChild(listClone);
//     });
// }

// renderInfo();