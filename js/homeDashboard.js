var user_data = {
    url: "https://dotobjyajpegd.cloudfront.net/photo/5d5150b0df04120cc46c5e23",
    name: "Do Hoang Minh",
    info: [{
        icon: "fa-briefcase",
        title: "name"
    }, {
        icon: "fa-home",
        title: "nguoi lam "
    }, {
        icon: "fa-envelope",
        title: "nguoi lam "
    }, {
        icon: "fa-phone",
        title: "nguoi lam "
    }]
}

function createInfo(data) {
    return `
    <p><i  class="fa ${data.icon} w3-margin-right w3-large w3-text-teal"></i>${data.title}</p>
    `
}

function loadHomeDashboard() {
    showIndicator("")
    var data = `
    <div class="w3-animate-zoom center-no-border w3-round-large" style="max-width: 500px;">
        <div class="w3-text-grey w3-card-4">
            <div class=" w3-display-container">
                <img id="cover_image_id" src="${user_data.url}" style="width:100%"
                    alt="Avatar">
                <div class="w3-display-bottomleft w3-container w3-text-black">
                    <h2>${user_data.name}</h2>
                </div>
            </div>
            <div class="w3-container">

            ${user_data.info.map(createInfo).join("")}

            </div>
        </div>
    </div>
    `
    document.getElementById("app").innerHTML = data
    getImageFirebase(function (url) {
        document.querySelector('#cover_image_id').src = url;
        console.log(url)
        setTimeout(function () {
            hideIndicator()
        }, 1000);
    })
}