function setting_save_config() {
    var cover_image_data, name;
    var dataForm = []

    var form = document.getElementById("form_container_id")
    cover_image_data = document.querySelector("#cover_image_id").files;
    name = document.getElementById("setting_name_id").value;


    for (let index = 0; index < form.childElementCount; index++) {
        var element = form.childNodes[index];
        for (var i = 0; i < element.childElementCount; ++i) {
            let item = element.childNodes[i]
            if (item.nodeName == "INPUT") {
                dataForm.push(item.value)

            }
        }
    }

    var jsonData = {
        name: name,
        detail: dataForm
    }

    console.log(jsonData)

    uploadImageFirebase(function (error) {
        if (error != null) {
            setTimeout(() => {
                hideIndicator()
                showToast("update successfull")
            }, 1000);
        } else {
            hideIndicator()
            showToast("update false")
        }
    })


}

function deleteLabel(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    console.log(element)
    id = id - 1
}

id = 0

function addnew() {
    id = id + 1

    var container = document.getElementById("form_container_id")

    let p = document.createElement("p");
    var _id = "parent_" + id
    p.setAttribute("id", _id)

    var button = document.createElement("img");
    button.setAttribute("class", "w3-right w3-round-large w3-animate-left");
    button.setAttribute("id", "butondelete");
    button.setAttribute("onclick", "deleteLabel('" + _id + "')");
    button.setAttribute("type", "button");
    button.setAttribute("src", "https://img.icons8.com/fluent/48/000000/close-window.png");
    button.setAttribute("width", "20px");
    button.setAttribute("height", "20px");

    let label = document.createElement("label")
    label.setAttribute("class", "w3-left w3-animate-left");
    label.innerHTML = "TITLE LINE " + id

    let input = document.createElement("input");
    input.setAttribute("class", "w3-input w3-animate-left w3-hover-text-indigo");
    input.placeholder = "TITLE LINE " + id
    input.setAttribute("required", ""); //turns required on
    // input.required = true;
    // input.value = "hello"

    p.appendChild(label)

    p.appendChild(button)
    p.appendChild(input)

    container.appendChild(p)
    console.log(p)
}

function loadSettingDashboard() {
    var data = `
    <div class="w3-container w3-card-2 w3-round-large w3-animate-zoom center"
            style="max-width: 500px;">
            <div class="w3-container " id="formsettings">

                <div class="w3-container w3-margin">
                    <h3 class="w3-center"> USER INFO CONFIG </h3>
                </div>
                <br>

                <p>
                    <label class="w3-left">COVER IMAGE</label>
                    <br>
                    <input class="w3-animate-left w3-hover-text-indigo" type="file" id="cover_image_id" name="img"
                        accept="image/*" onchange="changeImageOnclick()">
                    <img id="preview_frame" hidden style="object-fit: scale-down;" class="center-no-border"
                        width="100px" height="100px" />
                </p>

                <p>
                    <label class="w3-left">NAME</label>
                    <input class="w3-input w3-animate-left w3-hover-text-indigo" id="setting_name_id"
                        placeholder="display name" type="text"></p>
                <div id="form_container_id"></div>
            </div>

            <div class="w3-containe w3-center">
                <input class="w3-btn w3-red w3-round-large w3-margin" onclick="setting_save_config()" type="button"
                    value="save">
                <input id="addbutton" class="w3-btn w3-gray w3-round-large w3-margin" onclick="addnew()" type="button"
                    value="add new">
            </div>
</form>
        </div>
    `

    document.getElementById('app').innerHTML = data
}

{
    /* <p>
    <label class="w3-left">TITLE LINE 1</label>
    <input class="w3-input w3-animate-left w3-hover-text-indigo" id="setting_title_1_id"
        placeholder="TITLE LINE 1" type="text"></p>
    <p>
    <label class="w3-left">TITLE LINE 2</label>
    <input class="w3-input w3-animate-bottom w3-hover-text-indigo" id="setting_title_2_id"
        placeholder="TITLE LINE 2" type="text">
    </p>
    <p>
    <label class="w3-left">TITLE LINE 3</label>
    <input class="w3-input w3-animate-left w3-hover-text-indigo" id="setting_title_3_id"
        placeholder="TITLE LINE 3" type="text"></p> */
}