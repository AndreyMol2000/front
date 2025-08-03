console.log("1. Синхронный код"); // Выполняется первым

setTimeout(() => {
    console.log("4. setTimeout"); // Выполняется последним, попадает в очередь макрозадач
}, 0);

Promise.resolve("2. Promise").then((msg) => {
    console.log(`3. ${msg}`); // Выполняется после синхронного, в микрозадаче
});

console.log("2. Снова синхронный код"); // Выполняется вторым


function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/users") {
                resolve([{ id: 1, name: "Андрей" }, { id: 2, name: "Мария" }]);
            } else if (url === "https://api.example.com/users/1") {
                resolve({ id: 1, name: "Андрей", age: 25 });
            } else {
                reject("Некорректный URL");
            }
        }, 2000);
    });
}

fetchData("https://api.example.com/users")
    .then(users => {
        console.log("Пользователи:", users);
        return fetchData(`https://api.example.com/users/${users[0].id}`);
    })
    .then(userInfo => {
        console.log("Информация о первом пользователе:", userInfo);
    })
    .catch(error => {
        console.error("Ошибка:", error);
    });


    function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function fetchData(url) {
    await delay(2000);
    if (url === "https://api.example.com/users") {
        return [{ id: 1, name: "Андрей" }, { id: 2, name: "Мария" }];
    } else if (url === "https://api.example.com/users/1") {
        return { id: 1, name: "Андрей", age: 25 };
    } else {
        throw new Error("Некорректный URL");
    }
}

async function loadData() {
    try {
        const users = await fetchData("https://api.example.com/users");
        console.log("Пользователи:", users);

        const userInfo = await fetchData(`https://api.example.com/users/${users[0].id}`);
        console.log("Информация о первом пользователе:", userInfo);
    } catch (error) {
        console.error("Ошибка:", error.message);
    }
}

loadData();
