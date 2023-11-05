$(document).ready(()=>{
    const table_options = {
        columnDefs: [
                {
                    target: 0,
                    visible: false
                }
            ]
        }
    
    
    loadData(base_url + "api/enrollees.php", $("#table"),table_options);
    onSubmit();
})

async function loadData(url = null, element = null, table_options = null) {
    if(!url) return;
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
        const students = data.data;
        let html = element.html();

        html += "<tbody>";
        for(let student of students){
            html += "<tr>";
            html += `<td>${student['id']}</td>`;
            html += `<td class='text-center' onclick='viewRecord(${student['id']})'><span class='primary text-underline cursor-pointer'>${student['name']}</span></td>`;
            html += `<td>${student['strand']}</td>`;
            html += `<td>${student['gradelevel']}</td>`;
            html += "</tr>";
        }

        html += "</tbody>";

        element.html(html);
        
        new DataTable("#" + element.attr("id"), table_options);
    })
    .catch(error=>{
        console.log(error);
    })
}

function toggle_inputs() {
    $("#btn-edit").toggleClass("hide");
    $("#btn-save").toggleClass("hide");
    $("#btn-cancel").toggleClass("hide");
    $("#form-body input").toggleClass("hide");
    $("#form-body section div div").toggleClass("hide");
    $("#form-body section > div span:nth-child(2)").toggleClass("hide");
}

function onSubmit() {
    document.getElementById("form-container").addEventListener("submit", (e)=>{
        e.preventDefault();

        const form = new FormData(document.getElementById("form-container"));

        fetch(base_url + "api/update_enrollee.php", {
            method : "post",
            body : form
        })
        .then(resp=>resp.json())
        .then(data=>{
            const result = data.result;
            console.log(result);
            alert(result.status)
        })

    });
}

function viewRecord(record_id){
    $("#view-students").addClass("hide");
    const form = new FormData();
    form.append("id", record_id);     
    fetch(base_url + "api/enrollees.php", {
        method : "post",
        body : form
    })
    .then(response=>response.json())
    .then(data=>{
        const student = data.data[0];
        const form_content = `
        <div id="form-header">
            <h1>${student['name']}</h1>
            <section id="form-buttons">
                <button type='button' id="btn-cancel" onclick="toggle_inputs()" class='hide'>Cancel</button>
                <button type='button' id="btn-edit" onclick="toggle_inputs()">Edit</button>
                <input type='submit' value='Save' name='save' id="btn-save" onclick="" class='hide'/>
            </section>
            
        </div>

        <div id="form-body">
            <input type='hidden' name='id' class='hide' value='${student['id']}'>
            <span>Basic Information</span>
            <section>
                <div>
                    <span>LRN</span>
                    <span>${student['lrn']}</span>
                    <input type='text' name='lrn' class='hide' value='${student['lrn']}' placeholder='LRN'>
                </div>
                <div>
                    <span>Grade & Strand</span>
                    <span> ${student['gradelevel']} - ${(student['strand'] || student['track'])}</span>
                    <input type='text' class='hide' name='gradelevel' value='${student['gradelevel']}' placeholder='Grade Level'>
                    <input type='text' class='hide' name='${(student['strand'] ? 'strand' : 'track')}' value='${(student['strand'] || student['track'])}' placeholder='Track / Strand'>
                </div>
            </section>
            
            <span>Personal Data</span>
            <section id="personal-info">
                <div>
                    <span>Sex</span>
                    <span>${student['sex']}</span>
                    <div class=' flex justify-center items-center gap-md hide'>
                        <label for="male">
                            Male
                        </label>
                        <input type='radio' id="male" class='hide' name='sex' value='M' ${(student['sex'] == "Male" ? "checked" : "")}>
                    </div>
                    <div class=' flex justify-center items-center gap-md hide'>
                        <label for="female">
                            Female
                        </label>
                        <input type='radio' id="female" class='hide' name='sex' value='F' ${(student['sex'] == "Female" ? "checked" : "")}>
                    </div>
                    
                </div>
                <div>
                    <span>Nationality</span>
                    <span>Filipino</span>
                    <input type='text' class='hide' value='${student['addr']}'>
                </div>
                <div>
                    <span>Religion</span>
                    <span>Catholic</span>
                    <input type='text' class='hide' value='${student['addr']}'>
                </div>
                <div>
                    <span>Date of Birth</span>
                    <span>June 28, 2003</span>
                    <input type='text' class='hide' value='${student['addr']}'>
                </div>
                <div>
                    <span>Address</span>
                    <span>${student['addr']}</span>
                    <input type='text' class='hide' name='addr' value='${student['addr']}'>
                </div>
            </section>
        </div>`;
        $("#form-container").html(form_content);
        $("#form-container").removeClass("hide");
    })
    .catch(err=>{
        console.log(err);
    })
}




