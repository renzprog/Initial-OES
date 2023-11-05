<?php
require "./template/head.php";
load_header("Student",["base","main","student"], ["student"]);

?>
    <header>
        <div id="logo-holder">
            <img src="logo.png" alt="" style="width:35px;height:35px";>
            ABIS
       </div> 
        <nav>
            <a href="dashboard.html">Dashboard</a>
            <a href="student.html">Students</a>
            <a href="settings.html">Settings</a>
            <a href="login.html">Logout</a>
        </nav>
    </header>
    <main>
        <section>
            <div class="students">
                <h1>
                    STUDENTS
                </h1>   
                <a class="btn btn-account" href="" role="button"><i class="fa-regular fa-file"></i>View Students</a>
                <a class="btn btn-account" href="" role="button"><i class="fa-solid fa-trash-can"></i>Delete Students</a>
                </i>
            </div>

            <div style="flex-grow: 1;" id="view-students">
                <h1>
                    View Students
                </h1>
                <table id="table">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Strand
                            </th>
                            <th>
                                Grade
                            </th>
                        </tr>
                    </thead>
                    
                </table>
            </div>

            <form id="form-container" class="hide" method="post" ></form>
        </section>
        
    </main>

<?php
    require "./template/footer.php";
    load_footer([]);
?>